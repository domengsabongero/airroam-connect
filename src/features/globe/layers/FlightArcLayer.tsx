import { useMemo, useRef } from "react";
import { BufferGeometry, CatmullRomCurve3, Color, Line, Vector3 } from "three";
import { useFrame } from "@react-three/fiber";
import { countryBySlug, DEFAULT_ORIGIN } from "@/data/countries";
import { greatCirclePoints } from "../math/greatCircle";
import { latLngToVec3 } from "../math/latLngToVec3";
import { clamp01 } from "../math/easing";
import { useGlobe } from "../useGlobe";

const AMBER = new Color("#f59e0b");

export function FlightArcLayer() {
  const arc = useGlobe((s) => s.arc);
  const reduced = useGlobe((s) => s.reducedMotion);
  const lineRef = useRef<Line>(null);
  const headRef = useRef<import("three").Mesh>(null);

  const path = useMemo(() => {
    if (!arc) return null;
    const to = countryBySlug(arc.toSlug);
    if (!to) return null;
    const pts = greatCirclePoints(
      DEFAULT_ORIGIN.lat,
      DEFAULT_ORIGIN.lng,
      to.lat,
      to.lng,
      96,
      1,
      0.28,
    );
    return new CatmullRomCurve3(pts);
  }, [arc?.toSlug]);

  useFrame(() => {
    if (!arc || !path || !lineRef.current) return;
    const elapsed = performance.now() - arc.startedAt;
    const t = reduced ? 1 : clamp01(elapsed / Math.max(1, arc.durationMs));
    const samples = Math.max(2, Math.floor(96 * t));
    const pts: Vector3[] = [];
    for (let i = 0; i <= samples; i++) {
      pts.push(path.getPoint(i / 96));
    }
    const geo = new BufferGeometry().setFromPoints(pts);
    lineRef.current.geometry.dispose();
    lineRef.current.geometry = geo;
    if (headRef.current) {
      const head = path.getPoint(t);
      headRef.current.position.copy(head);
      headRef.current.visible = t < 1;
    }
  });

  if (!arc || !path) return null;

  return (
    <group>
      <line ref={lineRef as unknown as React.Ref<Line>}>
        <bufferGeometry />
        <lineBasicMaterial color={AMBER} linewidth={2} transparent opacity={0.9} toneMapped={false} />
      </line>
      <mesh ref={headRef} position={latLngToVec3(DEFAULT_ORIGIN.lat, DEFAULT_ORIGIN.lng, 1).toArray()}>
        <sphereGeometry args={[0.018, 12, 12]} />
        <meshBasicMaterial color={AMBER} toneMapped={false} />
      </mesh>
    </group>
  );
}
