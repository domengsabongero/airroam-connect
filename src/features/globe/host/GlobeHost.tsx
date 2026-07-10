import { lazy, Suspense, useEffect, useState } from "react";
import { useGlobe } from "../useGlobe";
import { hasWebGL, prefersReducedMotion } from "../performance";
import { globeActions } from "../store";
import { GlobeErrorBoundary } from "./GlobeErrorBoundary";

const GlobeCanvas = lazy(() =>
  import("./GlobeCanvas").then((m) => ({ default: m.GlobeCanvas })),
);

export function GlobeHost() {
  const slot = useGlobe((s) => s.activeSlot);
  const [mounted, setMounted] = useState(false);
  const [webgl, setWebgl] = useState(true);

  useEffect(() => {
    setMounted(true);
    setWebgl(hasWebGL());
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => globeActions.setReducedMotion(mq.matches);
    apply();
    mq.addEventListener?.("change", apply);
    globeActions.setReducedMotion(prefersReducedMotion());
    return () => mq.removeEventListener?.("change", apply);
  }, []);

  if (!mounted || !webgl || !slot) return null;

  const { rect } = slot;
  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        left: rect.x,
        top: rect.y,
        width: rect.width,
        height: rect.height,
        pointerEvents: slot.interactive ? "auto" : "none",
        zIndex: 1,
        transition: "left 240ms ease, top 240ms ease, width 240ms ease, height 240ms ease",
      }}
    >
      <Suspense fallback={null}>
        <GlobeCanvas />
      </Suspense>
    </div>
  );
}
