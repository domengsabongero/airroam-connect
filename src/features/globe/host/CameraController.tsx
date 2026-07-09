import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { Vector3 } from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { latLngToCameraPos } from "../math/latLngToVec3";
import { easeInOutCubic, clamp01 } from "../math/easing";
import { useGlobe } from "../useGlobe";
import { globeActions } from "../store";

type Props = { controls: React.RefObject<OrbitControlsImpl | null> };

export function CameraController({ controls }: Props) {
  const { camera } = useThree();
  const target = useGlobe((s) => s.cameraTarget);
  const mode = useGlobe((s) => s.mode);
  const interactionAt = useGlobe((s) => s.interactionAt);
  const reduced = useGlobe((s) => s.reducedMotion);

  const anim = useRef<{
    from: Vector3;
    to: Vector3;
    startedAt: number;
    duration: number;
  } | null>(null);

  useEffect(() => {
    if (!target) return;
    const to = latLngToCameraPos(target.lat, target.lng, target.distance);
    anim.current = {
      from: camera.position.clone(),
      to,
      startedAt: performance.now(),
      duration: reduced ? 0 : 1200,
    };
  }, [target, camera, reduced]);

  useFrame(() => {
    // Resume auto-rotate after 4s idle
    if (mode === "interacting" && performance.now() - interactionAt > 4000) {
      const nextMode = useGlobe.length; // no-op, silence lint
      void nextMode;
      // if a destination is focused, keep focus mode; otherwise auto-rotate
      const snap = useGlobeSnapshot();
      globeActions.setMode(snap.selectedSlug ? "focus" : "auto-rotate");
    }

    const a = anim.current;
    if (!a) return;
    const elapsed = performance.now() - a.startedAt;
    const t = a.duration === 0 ? 1 : clamp01(elapsed / a.duration);
    const eased = easeInOutCubic(t);
    camera.position.lerpVectors(a.from, a.to, eased);
    camera.lookAt(0, 0, 0);
    controls.current?.update();
    if (t >= 1) anim.current = null;
  });

  return null;
}

// small helper to grab a fresh snapshot inside useFrame without a re-render
import { getSnapshot } from "../store";
function useGlobeSnapshot() {
  return getSnapshot();
}
