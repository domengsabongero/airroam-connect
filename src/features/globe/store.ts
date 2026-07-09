import type { CameraTarget, GlobeMode, GlobeSnapshot, LayerId, SlotConfig } from "./types";
import { countryBySlug, DEFAULT_ORIGIN } from "@/data/countries";

const listeners = new Set<() => void>();

let state: GlobeSnapshot = {
  selectedSlug: null,
  hoveredSlug: null,
  cameraTarget: null,
  mode: "auto-rotate",
  arc: null,
  layers: {
    earth: true,
    atmosphere: true,
    clouds: true,
    markers: true,
    arc: true,
    origin: true,
  },
  interactionAt: 0,
  activeSlot: null,
  reducedMotion: false,
};

function emit() {
  for (const l of listeners) l();
}

export function subscribe(fn: () => void) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function getSnapshot(): GlobeSnapshot {
  return state;
}

export function getServerSnapshot(): GlobeSnapshot {
  return state;
}

function set(patch: Partial<GlobeSnapshot>) {
  state = { ...state, ...patch };
  emit();
}

export const globeActions = {
  select(slug: string | null) {
    if (state.selectedSlug === slug) return;
    set({ selectedSlug: slug });
    if (slug) globeActions.flyTo(slug);
  },
  hover(slug: string | null) {
    if (state.hoveredSlug === slug) return;
    set({ hoveredSlug: slug });
  },
  flyTo(slug: string) {
    const c = countryBySlug(slug);
    if (!c) return;
    const target: CameraTarget = { lat: c.lat, lng: c.lng, distance: 2.6 };
    set({
      selectedSlug: slug,
      cameraTarget: target,
      mode: "focus",
      arc: {
        fromSlug: DEFAULT_ORIGIN.slug,
        toSlug: slug,
        startedAt: performance.now(),
        durationMs: state.reducedMotion ? 0 : 1400,
      },
      interactionAt: performance.now(),
    });
  },
  resetView() {
    set({
      selectedSlug: null,
      hoveredSlug: null,
      cameraTarget: null,
      mode: "auto-rotate",
      arc: null,
    });
  },
  setMode(mode: GlobeMode) {
    if (state.mode === mode) return;
    set({ mode });
  },
  noteInteraction() {
    set({ interactionAt: performance.now(), mode: "interacting" });
  },
  toggleLayer(id: LayerId, on?: boolean) {
    const next = on ?? !state.layers[id];
    set({ layers: { ...state.layers, [id]: next } });
  },
  setActiveSlot(slot: SlotConfig | null) {
    set({ activeSlot: slot });
  },
  setReducedMotion(v: boolean) {
    if (state.reducedMotion === v) return;
    set({ reducedMotion: v });
  },
};
