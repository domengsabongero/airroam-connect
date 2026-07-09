export type GlobeMode = "auto-rotate" | "idle" | "interacting" | "focus";

export type GlobeVariant = "hero" | "destination" | "explore";

export type LayerId =
  | "earth"
  | "atmosphere"
  | "clouds"
  | "markers"
  | "arc"
  | "origin";

export type SlotRect = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type SlotConfig = {
  id: string;
  variant: GlobeVariant;
  rect: SlotRect;
  interactive: boolean;
  showControls: boolean;
  showSearch: boolean;
  autoRotate: boolean;
};

export type ArcState = {
  fromSlug: string;
  toSlug: string;
  startedAt: number;
  durationMs: number;
} | null;

export type CameraTarget = {
  lat: number;
  lng: number;
  distance: number;
} | null;

export type GlobeSnapshot = {
  selectedSlug: string | null;
  hoveredSlug: string | null;
  cameraTarget: CameraTarget;
  mode: GlobeMode;
  arc: ArcState;
  layers: Record<LayerId, boolean>;
  interactionAt: number;
  activeSlot: SlotConfig | null;
  reducedMotion: boolean;
};
