
# Air-Roam Globe Engine + Production-Grade Architecture

Replaces only the Globe module of the Air-Roam 4.0 roadmap. Everything previously approved stays. This revision folds in: R3F/Drei primary (react-globe.gl only if it clearly helps a specific feature), simplest viable state (Context + `useSyncExternalStore`, upgrade to Zustand only if store grows past a couple layers), and a pricing system built for real business growth.

---

## 1. Globe engine — R3F/Drei, modular, layer-based

Built as a reusable engine. `react-globe.gl` is not a dependency of the engine. If a single feature (e.g. arc rendering) is materially simpler with it, we may adopt it inside one layer file behind the same layer interface — engine core stays independent and replaceable.

```
src/features/globe/
  engine/
    GlobeCanvas.tsx         <Canvas>, camera rig, OrbitControls, perf tier
    GlobeScene.tsx          Renders enabled layers from registry, in order
    layerRegistry.ts        LayerDef[]: { id, order, minTier, component }
    cameraController.ts     Quaternion slerp + distance easing (maath)
    coords.ts               latLngToVec3, greatCircle, bearing, centroid
    perf.ts                 WebGL + tier (high/mid/low) + reduced-motion
    fallback/SVGGlobe.tsx   Non-WebGL / SSR fallback, same store subscription
  state/
    globeStore.ts           useSyncExternalStore snapshot store (see §2)
    GlobeProvider.tsx       Context wrapper, one instance per app
    useGlobe.ts             Selector hook: useGlobe(s => s.selected)
  layers/
    EarthLayer.tsx          Day/night textures, spec, bump, subtle terrain
    AtmosphereLayer.tsx     Fresnel rim glow
    CloudsLayer.tsx         Slow-drift transparent sphere (high tier only)
    CountryMarkersLayer.tsx Data-driven from countries dataset
    FlightArcLayer.tsx      Animated great-circle arc, gradient trail
    OriginPinLayer.tsx      Manila (or user origin) beacon
    // Interface-locked stubs, disabled by default:
    CoverageHeatmapLayer.tsx
    SatellitesLayer.tsx
    AirportsLayer.tsx
    WeatherLayer.tsx
    LiveActivityLayer.tsx
    CarrierOverlayLayer.tsx
  ui/
    GlobeSearch.tsx         Fuzzy country search → camera fly
    GlobeTooltip.tsx        Drei <Html> hover card
    GlobeLegend.tsx         Marker style legend
    GlobeControls.tsx       Reset · autorotate · dev layer toggles
  GlobeHost.tsx             Portal host (see §3)
  GlobeSlot.tsx             Per-page sized placeholder
  types.ts                  All engine types (LayerDef, GlobeMode, CameraTarget)
```

Each layer is a self-contained R3F component reading from the store and rendering into the shared scene. Adding a layer = one file + one registry entry, no engine edits. The five future-layer stubs ship with correct props/interfaces so file locations, imports, and types are locked in.

## 2. State: simplest viable — Context + `useSyncExternalStore`

No new dependency. Snapshot store with selector hook = same DX as Zustand for the read paths we need, without adding a runtime dep. If the store grows past ~6 slices or we need middleware, we swap the internals to Zustand behind the same `useGlobe(selector)` API without touching consumers.

```ts
// src/features/globe/state/globeStore.ts
type GlobeState = {
  selectedSlug: string | null;
  origin: { slug: string; lat: number; lng: number };
  hoveredSlug: string | null;
  cameraTarget: CameraTarget | null;
  mode: 'hero' | 'destination' | 'region' | 'explore';
  layers: Record<LayerId, boolean>;
};
type GlobeActions = {
  setSelected(slug: string | null): void;
  setHovered(slug: string | null): void;
  setOrigin(o: GlobeState['origin']): void;
  setMode(m: GlobeState['mode']): void;
  toggleLayer(id: LayerId, on?: boolean): void;
};
// Snapshot store implemented with a Set<Listener> + getSnapshot; exposes:
export const globeStore: { subscribe; getSnapshot; actions: GlobeActions };
export function useGlobe<T>(selector: (s: GlobeState) => T): T; // uSES + Object.is equality
```

`GlobeProvider` mounts once in `__root.tsx`. There is exactly one store instance for the whole app.

## 3. Persistent globe across routes

The globe is mounted **once**, above the route tree, and rehomed into per-page slots via React Portal so React state, WebGL context, and camera continuity survive route changes.

- `GlobeHost` in `__root.tsx` renders `<Canvas>` once (fixed-positioned, initially hidden).
- Each consuming page renders `<GlobeSlot variant="hero" | "destination" | "region" | "explore" activeSlug?>` — a sized placeholder with a `ResizeObserver`; the host absolute-positions the canvas to the slot's rect on each frame the slot moves.
- Route change → `globeStore.actions.setSelected(slug)` → `cameraController.flyTo(...)` → arc updates. No teardown, no re-init.
- Reduced motion / low tier: cross-fade or jump-cut instead of camera flight.
- WebGL absent or context lost → host renders `SVGGlobe` fallback, same store subscription. Consumers don't branch.

Signature interaction:

```text
Search "Japan" (GlobeSearch or ⌘K palette)
  → setSelected('japan')
  → camera slerps to Japan (~600ms easeInOutCubic)
  → FlightArcLayer animates Manila → Tokyo (~900ms)
  → Japan marker begins continuous pulse
  → Tooltip: networks, from ₱, activation, coverage
  → After arc + 250ms: router.navigate('/destinations/japan')
  → Destination page mounts; GlobeSlot claims same canvas; camera stays
```

Traditional search, main nav, and destination grid all remain fully supported; the globe is one of several first-class discovery paths.

## 4. Pricing system — production-grade, PHP-primary, growth-ready

USD is removed. Prices originate from one canonical dataset and are computed at read time. Designed for the exact list of future needs: country plans, regional plans, promos, seasonal campaigns, discount codes, reseller pricing, B2B/enterprise pricing, multi-currency.

### Data shapes (Supabase-schema-compatible)

```ts
// src/domain/pricing/types.ts
export type Product = 'esim' | 'travel-sim' | 'pocket-wifi' | 'enterprise';
export type CurrencyCode = 'PHP' | 'USD' | 'EUR' | 'JPY' | 'SGD'; // extensible
export type Money = { amountMinor: number; currency: CurrencyCode }; // integer minor units

export type PlanScope =
  | { kind: 'country'; slug: string }
  | { kind: 'region'; slug: string };            // e.g. 'europe', 'southeast-asia'

export type CustomerTier = 'retail' | 'reseller' | 'b2b' | 'enterprise';

export type Plan = {
  id: string;
  product: Product;
  scope: PlanScope;
  name: string;
  dataMB: number | 'unlimited';
  validityDays: number;
  basePrice: Money;                              // canonical price (PHP by default)
  tierPrices?: Partial<Record<CustomerTier, Money>>; // reseller / B2B / enterprise
  features: string[];
  active: boolean;
  visibility: 'public' | 'unlisted' | 'internal';
};

export type Promotion = {
  id: string;
  name: string;
  kind: 'percent' | 'amount' | 'override';
  value: number;                                 // 15 = 15% or 15 minor units for 'amount'
  overridePrice?: Money;                         // required when kind === 'override'
  appliesTo:                                     // any subset; ANDed together
    { productIds?: Product[]; planIds?: string[];
      countrySlugs?: string[]; regionSlugs?: string[];
      tiers?: CustomerTier[] };
  window: { startsAt: string; endsAt: string };  // ISO; seasonal campaigns
  stackable: boolean;
  priority: number;                              // higher wins when non-stackable
  active: boolean;
};

export type DiscountCode = {
  code: string;
  promotionId: string;                           // resolves to a Promotion
  maxRedemptions?: number;
  perCustomerLimit?: number;
  requiresAuth?: boolean;
  active: boolean;
};

export type FxRate = { from: CurrencyCode; to: CurrencyCode; rate: number; asOf: string };
```

### Canonical read layer

```ts
// src/domain/pricing/repository.ts   (data-source seam — swaps to Supabase later)
export interface PricingRepository {
  listPlans(): Promise<Plan[]>;
  listPromotions(now?: Date): Promise<Promotion[]>;
  getDiscountCode(code: string): Promise<DiscountCode | null>;
  listFxRates(): Promise<FxRate[]>;
}
// Ship with StaticPricingRepository backed by src/data/plans.ts + promotions.ts.

// src/domain/pricing/service.ts   (pure, memoized)
plansForCountry(slug)               // country plans ∪ region plans covering slug, active + visible
plansByProduct(slug, product)
applicablePromotions(plan, ctx)     // ctx: { now, countrySlug, tier, code? }
priceFor(plan, ctx)                 // returns { base, final, appliedPromotions[] } in plan.basePrice.currency
startingFrom(slug, ctx)             // min(priceFor(...).final) across plansForCountry(slug)
convert(money, targetCurrency, rates)
formatMoney(money, locale='en-PH')  // Intl.NumberFormat; PHP has 0 fraction digits by convention
```

Every price render (cards, tooltips, info strips, hero, planner, assistant, comparison table) calls `startingFrom`/`priceFor` + `formatMoney`. No hardcoded numbers in components. Grep audit at end: zero `$`, `USD`, `fromPrice`, `.toFixed(2)` remaining in UI code.

### Currency policy

- PHP is the primary currency and the default display currency.
- `Money` is currency-tagged everywhere; formatting is a leaf concern.
- Multi-currency display is a runtime toggle later: add an `FxRate[]` source and a currency preference in a future `useCurrency()` hook; `convert()` is already there. Nothing else changes.

### Promotions & campaigns

- Seasonal campaigns are just `Promotion` rows with a `window`.
- Discount codes resolve to a promotion at redemption time; UI shows the same `priceFor` output with code applied.
- Non-stackable conflicts resolved by `priority`.
- Reseller / B2B / enterprise pricing use either `Plan.tierPrices[tier]` (canonical tier price) or a `Promotion` scoped to `tiers`. Both paths pass through `priceFor` — call sites don't branch on tier.

### Migration path

`StaticPricingRepository` → `SupabasePricingRepository` is a one-file swap; service and UI don't change. Same shapes map 1:1 to future Supabase tables: `plans`, `promotions`, `discount_codes`, `fx_rates`, `plan_tier_prices`. Stripe-side pricing later maps `Plan.id` ↔ `stripe_price_id` via a join table without touching display code.

## 5. Country pages — "Your Coverage Around the World"

Replaces the static SVG map on `destinations.$country.tsx`. Renders `<GlobeSlot variant="destination" activeSlug={c.slug} />` plus an info strip driven entirely by data:

```
Supported Networks · 5G · Starting From ₱XXX · Activation · Coverage
```

All strings and prices sourced from country + plans data via the pricing service. No hardcoded copy.

## 6. Data-driven everything

Nothing about a country, region, product, plan, network, tip, attraction, FAQ, or recommendation is hardcoded in a component.

```
src/data/
  countries.ts        Country[]  (lat, lng, coverage, networks, activation, supportedProducts, tips, attractions, faqs)
  regions.ts          Region[]
  products.ts         Product metadata (icon key, storytelling copy, spec rows)
  plans.ts            Plan[]     (country + region scopes)
  promotions.ts       Promotion[]
  networks.ts         Carrier metadata
  fx-rates.ts         FxRate[]   (empty initially; PHP-only)
  faqs.ts             FAQ[] scoped by (global | country | product)
  recommendations.ts  Assistant rule matrix
```

Every dataset has stable `id`/`slug`. No computed/duplicated fields stored. Country records drop `fromPrice`; "starting from" is always computed.

## 7. Architecture & typing standards

Production-SaaS boundaries. Nothing in components imports from another component's private helpers.

```
src/
  domain/           Business logic, pure, framework-free, unit-testable
    pricing/{types,service,repository,static-repository}.ts
    recommend/{types,rules,service}.ts
    wishlist/{types,service}.ts
    recent/{types,service}.ts
  data/             Static datasets (repository backing)
  features/         Feature-scoped UI + state (globe, planner, assistant, wishlist)
  components/       Cross-feature presentational components (Buttons, Cards, PricingCard)
  routes/           TanStack routes; loaders call domain services only
  lib/              Framework glue (formatMoney, cn, seo helpers)
  integrations/     Future: supabase, stripe (thin adapters implementing repository ports)
```

TypeScript posture:

- `tsconfig` strict on (already). Add `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes` where feasible.
- Public domain types exported via `index.ts` per folder; UI imports types, never internals.
- Money is `Money`, never `number`. IDs are branded strings where they cross module boundaries (`CountrySlug`, `PlanId`) to catch mix-ups at compile time.
- No `any`, no `as` casts against inferred router types (per TanStack type-safety guidance).

## 8. AI Travel Assistant

Unchanged from prior approval. Consumes `pricing/service` and `countries` — no duplicated prices. Recommendation includes: Best Product · Best Plan · Estimated Cost (₱) · Estimated Data · Coverage Quality · Add-ons · Activation Guide · Local Advice · Backup Option. Rules in `domain/recommend/rules.ts`.

## 9. Product pages

Apple-style storytelling preserved. Pricing cards read from `plans` filtered by product, show ₱ price, duration, data, features, primary CTA. `promotions.ts` may decorate cards with campaign badges via `priceFor`.

## 10. Performance

- Dynamic `import()` of `@react-three/fiber` + Drei behind `Suspense`; SSR renders `SVGGlobe`, `build:dev` prerender passes.
- `dpr={[1, Math.min(devicePixelRatio, 2)]}`, `frameloop="demand"`, `invalidate()` on interaction/animation only.
- Perf tiers: high → clouds + shader atmosphere; mid → no clouds, cheap Fresnel; low → static earth.
- `prefers-reduced-motion`: no rotation, jump-cut camera, static arc.
- Route-level code splitting: globe engine chunk isolated; only `GlobeHost` imports it.
- Texture budget ≤ ~2.5 MB (KTX2/Basis when available), `loading="lazy"`.
- Pricing service memoized per (countrySlug, tier, now-bucket) to keep list renders cheap.

## 11. Media

Unsplash/Pexels placeholders only. Image URLs are data fields on `Country`/`Region`/`Product`; branded photography swaps in without touching components.

## 12. Long-term scalability

- 190+ destinations: countries lazy-imported per region for region pages; markers layer virtualizes off-camera markers > ~60.
- i18n: all display strings routed through a stub `t()` from `src/i18n/en.ts`; adding a locale = adding a file.
- Supabase: `StaticPricingRepository` → `SupabasePricingRepository`; same for `countries`, `regions`, `promotions`.
- Stripe: prices stay in our system; Stripe holds `stripe_price_id` per `Plan.id`. Enable Lovable's Stripe integration when we're ready to accept payments — no UI changes needed on that day.
- Live carrier/coverage APIs: repository ports already async; UI already Suspense-based.
- Wishlist / Recently viewed: `domain/wishlist` and `domain/recent` behind repository ports (LocalStorage today, Supabase later).

## 13. Design philosophy

Optimize equally for conversion, trust, performance, a11y, maintainability, scalability, UX. Every globe interaction resolves to a purchase-oriented payoff (starting ₱, activation, coverage → destination page → Buy). Focusable markers, aria-labels, visually-hidden crawlable link list, AA contrast, reduced-motion respected.

---

## Technical notes

- Deps to add: `three`, `@react-three/fiber`, `@react-three/drei`, `three-stdlib`, `maath`. No `react-globe.gl`, no `zustand` (we use `useSyncExternalStore`); reconsider only if state needs grow.
- Single `<Canvas>` in `__root.tsx`; slot rects fed via `ResizeObserver`.
- Camera framing per country from `lat/lng` + fixed altitude; region pages frame by centroid.
- Earth texture rotated on Y so 0° meridian aligns; spot-check Japan/Australia/Brazil/Canada/Philippines/Iceland/NZ.
- `formatMoney({amountMinor,currency:'PHP'})` → `Intl.NumberFormat('en-PH',{style:'currency',currency:'PHP',maximumFractionDigits:0}).format(amountMinor/100)`.

### File map (new / edit)

```text
new  src/features/globe/**                       (engine, state, layers, ui — ~18 files)
new  src/domain/pricing/{types,service,repository,static-repository,index}.ts
new  src/domain/recommend/{types,rules,service,index}.ts
new  src/domain/wishlist/{types,service,index}.ts
new  src/domain/recent/{types,service,index}.ts
new  src/data/regions.ts
new  src/data/products.ts
new  src/data/promotions.ts
new  src/data/networks.ts
new  src/data/fx-rates.ts
new  src/data/recommendations.ts
new  src/lib/format.ts                           (formatMoney, formatDate)
new  src/i18n/en.ts                              (t() stub)
edit src/data/countries.ts                       (lat, lng, coverage, networks, activation, supportedProducts; remove fromPrice)
edit src/data/plans.ts                           (Plan[] with scope + Money; remove USD)
edit src/routes/__root.tsx                       (GlobeProvider + GlobeHost)
edit src/routes/index.tsx                        (<GlobeSlot variant="hero" />)
edit src/routes/destinations.$country.tsx        (<GlobeSlot variant="destination" />; info strip from data)
edit src/routes/destinations.index.tsx           (<GlobeSlot variant="explore" />)
edit src/components/site/CountryCard.tsx         (startingFrom + formatMoney)
edit src/components/site/PricingCard.tsx         (Money; promo badges)
edit src/components/site/GlobeSection.tsx        (thin wrapper → GlobeSlot hero)
edit src/components/site/WorldMap.tsx            (thin wrapper → GlobeSlot; or delete)
edit anywhere `$`, `fromPrice`, `.toFixed(2)`    (audit + replace)
edit tsconfig.json                               (noUncheckedIndexedAccess, exactOptionalPropertyTypes)
```

### Out of scope this pass
Real coverage polygons, satellite ephemerides, live-flight ingestion, weather API, real carrier inventory, auth/checkout/Stripe wiring, additional locales beyond the English stub, non-PHP display currencies at runtime. All architected for; interfaces and stubs are the deliverable.
