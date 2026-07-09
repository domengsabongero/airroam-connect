export type PerfTier = "low" | "medium" | "high";

let cached: PerfTier | null = null;

export function detectPerfTier(): PerfTier {
  if (cached) return cached;
  if (typeof window === "undefined") return (cached = "medium");
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
    if (!gl) return (cached = "low");
    const cores = navigator.hardwareConcurrency ?? 4;
    const dpr = window.devicePixelRatio ?? 1;
    if (cores <= 2 || dpr < 1) return (cached = "low");
    if (cores >= 6 && dpr >= 2) return (cached = "high");
    return (cached = "medium");
  } catch {
    return (cached = "low");
  }
}

export function hasWebGL(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
}
