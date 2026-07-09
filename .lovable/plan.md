## Goal

Ship a production-quality, persistent 3D globe engine as Air-Roam's primary destination-discovery experience. One WebGL canvas mounted in `__root.tsx` renders across routes; homepage and destination pages each open a `<GlobeSlot>` that repositions the same scene. Fully replaces the static `WorldMap`/`GlobeSection` visuals with real lat/lng, PHP pricing derived from the pricing service, and a Sunrise-palette look.

## Architecture

```text
src/features/globe/
  index.ts                     # public API barrel
  store.ts                     # useSyncExternalStore snapshot store
  useGlobe.ts                  # useGlobe(selector) hook + actions
  types.ts                     # LayerId, Mode, CameraTarget, Marker, GlobeStore
  layer-registry.ts            # registerLayer/getLayers — extensible
  performance.ts               # tiers (low/med/high) from GPU + prefers-reduced-motion
  math/
    latLngToVec3.ts            # (lat,lng,radius) -> Vector3, verified with test cases
    greatCircle.ts             # slerp points along great-circle arc
    easing.ts                  # cubic/expo easings for camera + arc
  host/
    GlobeHost.tsx              # persistent single <Canvas> in __root
    GlobeSlot.tsx              # ResizeObserver-fed rect, variant, mode
    GlobeCanvas.tsx            # <Canvas> wrapper (dpr cap, tone mapping, ACES)
    GlobeScene.tsx             # lights, camera, controls, layer host
    CameraController.tsx       # slerp target, easing, idle auto-rotate mgmt
  layers/
    EarthLayer.tsx             # sphere, day texture, normal/bump, specular
    AtmosphereLayer.tsx        # Fresnel shader shell
    CloudsLayer.tsx            # slow-drifting transparent cloud sphere
    CountryMarkersLayer.tsx    # glowing pins from countries dataset
    FlightArcLayer.tsx         # Manila → target, animated dashOffset
    OriginPinLayer.tsx         # Manila anchor
  ui/
    GlobeSearch.tsx            # fuzzy country search, keyboard nav
    GlobeTooltip.tsx           # hover/selected card, HTML overlay
    GlobeControls.tsx          # Reset View, zoom hint, a11y buttons
  fallback/
    SVGGlobe.tsx               # orthographic SVG (no WebGL) fallback
  textures/
    (loaded via drei useTexture from /public/globe/*)
```

Layer components read from the store; the layer registry lets future overlays (satellites, weather, coverage heatmap) drop in without touching `GlobeScene`.

## State (single source of truth)

`useSyncExternalStore`-backed snapshot store (no new deps). Slices:

- `selectedSlug`, `hoveredSlug`
- `origin` (Manila, `14.5995, 120.9842`)
- `cameraTarget: { lat, lng, distance }`
- `mode: "auto-rotate" | "idle" | "interacting" | "focus"`
- `arc: { fromSlug, toSlug, progress } | null`
- `layers: Record<LayerId, boolean>`
- `interactionAt: number` (ms) — for idle-resume auto-rotate

Actions: `select(slug)`, `hover(slug)`, `flyTo(slug)`, `resetView()`, `setMode(...)`, `noteInteraction()`, `toggleLayer(id)`. When `flyTo` runs it sets `cameraTarget`, starts the arc, sets `mode="focus"`, calls navigate on the destination route (destination page reads `selectedSlug` from URL param on mount so state survives reload).

If the store grows past ~6 slices we swap internals to Zustand behind the same `useGlobe(selector)` API — no callers change.

## Persistent host in `__root.tsx`

- Mount `<GlobeHost />` once, absolutely positioned, `pointer-events: none` by default. It computes a target rect from the currently active `<GlobeSlot>` via `ResizeObserver` and translates/scales its canvas to that rect. Pointer events flip on only when a slot is mounted and visible.
- Slots declare `variant: "hero" | "destination" | "explore"`, `interactive: boolean`, `showControls`, `showSearch`. Homepage variant hides controls + search and locks to slow auto-rotate.
- On route change the canvas doesn't unmount — camera state, textures, and materials persist. Destination page mount triggers `flyTo(params.country)` which slerps camera + animates arc.

## Cinematic Earth (visual quality)

- Sphere at radius 1. PBR-style material using Earth textures at `public/globe/`:
  - `earth-day-2k.jpg` (albedo)
  - `earth-normal-2k.jpg` (subtle terrain relief)
  - `earth-specular-2k.jpg` (ocean-only specular mask)
  - `earth-clouds-2k.png` (alpha)
  Textures are lazy-loaded via `drei` `useTexture` + Suspense; boundary shows a soft skeleton disk while loading. Sizes chosen so total globe payload is <500KB gzipped.
- Atmosphere: additive Fresnel shader shell at 1.03× radius using amber→sky gradient from Sunrise tokens.
- Clouds: 1.005× radius sphere with alpha map, rotates at 0.02 rad/s independent of Earth.
- Lighting: 1 hemisphere + 1 directional key (warm amber) + rim light (cool sky). Tone mapping ACES, exposure ~0.9. dpr capped at `[1, 2]`.
- Markers: instanced glow discs on the surface. Selected marker uses `EffectComposer`-free bloom via additive sprite (keeps bundle small). Colors: default `--teal`, popular `--amber`, selected `--amber` with pulsing ring.
- Flight arc: sampled great-circle points, `LineDashedMaterial` with animated `dashOffset`, plus a leading glow sprite. Origin/destination markers pulse when arc completes.

## Marker accuracy

`latLngToVec3(lat, lng, r=1)` uses the standard conversion (longitude offset 0° = prime meridian on +Z, east positive). Verify with the required set: Philippines (Manila 14.5995, 120.9842), Japan (Tokyo 35.68, 139.65), South Korea (Seoul 37.57, 126.98), Singapore (1.35, 103.82), Australia (Canberra −35.28, 149.13), Canada (Ottawa 45.42, −75.70), Brazil (Brasília −15.80, −47.89), Iceland (Reykjavík 64.15, −21.94 — add to `countries.ts` if missing), New Zealand (Wellington −41.29, 174.78). All coords come from `countries.ts`; no offsets embedded in the layer.

## Interaction

- `OrbitControls` (drei) with damping 0.08, `enablePan=false`, min/max distance clamped to `[1.6, 4]`, `enableZoom=true` on interactive slots.
- Auto-rotate at 0.15 rad/s when `mode==="auto-rotate"`. Any pointer/wheel/key event calls `noteInteraction()`, sets `mode="interacting"`; after 4s of idle the controller returns to auto-rotate (or `focus` if a destination is selected).
- Fuzzy country search (lightweight scorer over `name + capital + region`) with keyboard nav; `Enter` triggers `flyTo`.
- Hover raycast on markers → `GlobeTooltip` HTML overlay (fixed to marker screen-projection) shows `{ flag, name, network, coverage, startingFrom }`.
- Click marker → `flyTo(slug)`, animate arc Manila → target, then `navigate({ to: "/destinations/$country", params: { country: slug } })` after arc peak.
- `GlobeControls` provides a "Reset View" button that clears selection, returns camera to a wide neutral pose, and re-enables auto-rotate.
- Respect `prefers-reduced-motion`: disable auto-rotate, drop arc animation to a static line, use instant camera cuts, disable cloud drift.

## Performance & fallback

- `performance.ts` classifies device tier from `navigator.hardwareConcurrency`, `devicePixelRatio`, and a WebGL2 feature probe. Tiers gate cloud layer, normal map, and dpr cap.
- `<GlobeHost>` uses `<Suspense>` + code-split via dynamic import (`React.lazy`) inside a client-only guard; SSR renders nothing for the WebGL canvas and instead reserves layout with a CSS-only placeholder (`bg-sky-soft`) so LCP isn't blocked.
- Frameloop: `demand` on non-interactive homepage slot when no animation is running; `always` while auto-rotating, dragging, or arc animating.
- WebGL absent, context-lost, or low-tier → render `<SVGGlobe />` fallback (equirectangular projection with the same markers, hover tooltip, and click-to-navigate).
- Textures: 2K max, `THREE.SRGBColorSpace`, `anisotropy=4`, disposed on `<GlobeHost>` unmount (never happens in practice — one-shot).
- Bundle: three/drei live only in the lazy chunk; the initial route payload is unaffected.

## Integration

- Homepage: replace `GlobeSection.tsx` body (keep section shell + copy) with `<GlobeSlot variant="hero" interactive={false} showControls={false} showSearch={false} />`. Homepage uses auto-rotate + hero copy; traditional destination cards, region search, and menus remain unchanged below.
- Destination page: replace `WorldMap` usage on `destinations.$country.tsx` (there isn't a direct one there, but the current "World Coverage" strip is implicit — we add the new section) with a new section titled **"Your Coverage Around the World"** containing `<GlobeSlot variant="destination" interactive showControls showSearch />`. Below the globe, a facts strip driven entirely by the pricing service and `countries.ts`:
  - Supported Networks: `c.partnerNetworks.join(" · ")`
  - Coverage: `c.coverage` humanized
  - 5G: `c.fiveG ? "Available" : "4G+ only"`
  - Activation: `c.activation`
  - Starting From: `formatMoney(startingFrom(c.slug))` — never hardcoded.
- `destinations.index.tsx`: replace the `WorldMap` block with `<GlobeSlot variant="explore" interactive showControls showSearch />` sized 16:9.
- Delete `src/components/site/WorldMap.tsx` after all callers migrate. Keep `GlobeSection.tsx` as a thin wrapper around `<GlobeSlot variant="hero" …>` for now, so its section copy stays intact.
- No changes to pricing domain, plans data, or MCP tools.

## Accessibility

- Every marker has an off-screen `aria-label` in an `<ul>` companion list (search results). Keyboard users can Tab to a marker button, press Enter to fly.
- `GlobeSearch` implements listbox pattern (roving `aria-activedescendant`).
- Reduced motion honored globally (media query + store flag).
- Text alternatives: destination facts strip is fully semantic HTML — the globe is decorative-plus-interactive, not the only path.

## Out of scope

- Real coverage polygons, satellite overlays, live-flight, weather, and multi-currency runtime toggle (stubs are in the layer registry only).
- Auth, checkout, MCP additions.
- New pricing rules — the service is unchanged.

## Files

**New (~24):** `src/features/globe/**` per the tree above; `public/globe/earth-day-2k.jpg`, `earth-normal-2k.jpg`, `earth-specular-2k.jpg`, `earth-clouds-2k.png` (sourced from public-domain NASA Blue Marble / equivalent, downsampled to 2K).

**Edited:** `src/routes/__root.tsx` (mount `<GlobeHost />`), `src/routes/index.tsx` (Hero slot), `src/routes/destinations.index.tsx` (Explore slot), `src/routes/destinations.$country.tsx` (Destination slot + facts strip), `src/components/site/GlobeSection.tsx` (thin wrapper), `src/data/countries.ts` (add Iceland row if missing so verification set is complete).

**Removed:** `src/components/site/WorldMap.tsx` (once no route imports it).

## Acceptance checks

1. Navigate `/` → `/destinations/japan`: single WebGL context in DevTools Memory tab; camera slerps from world view to Tokyo; Manila→Tokyo arc animates once; destination page mounts with Japan marker highlighted.
2. Verification set of 9 countries all sit visually over their real capitals when the globe is rotated to face them.
3. `prefers-reduced-motion: reduce` disables auto-rotate, cloud drift, and arc animation.
4. Disabling WebGL in DevTools → `<SVGGlobe />` renders on both homepage and destination pages, click still navigates.
5. Lighthouse mobile performance on `/` ≥ 90 (globe deferred, not blocking LCP).
