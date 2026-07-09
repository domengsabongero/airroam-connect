import { useEffect, useMemo, useRef } from "react";
import { BufferGeometry, CatmullRomCurve3, Color, Line, LineBasicMaterial, Mesh, Vector3 } from "three";
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
  const headRef = useRef<Mesh>(null);

  const { path, lineObject } = useMemo(() => {
    if (!arc) return { path: null, lineObject: null };
    const to = countryBySlug(arc.toSlug);
    if (!to) return { path: null, lineObject: null };
    const pts = greatCirclePoints(DEFAULT_ORIGIN.lat, DEFAULT_ORIGIN.lng, to.lat, to.lng, 96, 1, 0.28);
    const curve = new CatmullRomCurve3(pts);
    const mat = new LineBasicMaterial({ color: AMBER, transparent: true, opacity: 0.9, toneMapped: false });
    const line = new Line(new BufferGeometry(), mat);
    return { path: curve, lineObject: line };
  }, [arc?.toSlug]);

  useEffect(() => {
    return () => {
      lineObject?.geometry.dispose();
      (lineObject?.material as LineBasicMaterial | undefined)?.dispose();
    };
  }, [lineObject]);

  useFrame(() => {
    if (!arc || !path || !lineObject) return;
    const elapsed = performance.now() - arc.startedAt;
    const t = reduced ? 1 : clamp01(elapsed / Math.max(1, arc.durationMs));
    const samples = Math.max(2, Math.floor(96 * t));
    const pts: Vector3[] = [];
    for (let i = 0; i <= samples; i++) pts.push(path.getPoint(i / 96));
    lineObject.geometry.dispose();
    lineObject.geometry = new BufferGeometry().setFromPoints(pts);
    if (headRef.current) {
      const head = path.getPoint(t);
      headRef.current.position.copy(head);
      headRef.current.visible = t < 1;
    }
  });

  if (!arc || !path || !lineObject) return null;

  return (
    <group>
      <primitive object={lineObject} />
      <mesh ref={headRef} position={latLngToVec3(DEFAULT_ORIGIN.lat, DEFAULT_ORIGIN.lng, 1).toArray()}>
        <sphereGeometry args={[0.018, 12, 12]} />
        <meshBasicMaterial color={AMBER} toneMapped={false} />
      </mesh>
    </group>
  );
}
