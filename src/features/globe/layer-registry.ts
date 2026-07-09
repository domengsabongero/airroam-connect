import type { ComponentType } from "react";
import type { LayerId } from "./types";

export type LayerComponent = ComponentType<Record<string, never>>;

const registry = new Map<LayerId, LayerComponent>();

export function registerLayer(id: LayerId, component: LayerComponent) {
  registry.set(id, component);
}

export function getRegisteredLayers(): Array<[LayerId, LayerComponent]> {
  return Array.from(registry.entries());
}
