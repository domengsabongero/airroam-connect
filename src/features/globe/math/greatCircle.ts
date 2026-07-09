import { Vector3 } from "three";
import { latLngToVec3 } from "./latLngToVec3";

/**
 * Return an array of Vector3 points along the great-circle arc from (aLat,aLng)
 * to (bLat,bLng), lifted above the surface for a nice curved flight path.
 */
export function greatCirclePoints(
  aLat: number,
  aLng: number,
  bLat: number,
  bLng: number,
  segments = 64,
  radius = 1,
  arcHeight = 0.25,
): Vector3[] {
  const a = latLngToVec3(aLat, aLng, radius);
  const b = latLngToVec3(bLat, bLng, radius);
  const omega = a.angleTo(b);
  const sinOmega = Math.sin(omega);
  const out: Vector3[] = [];
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const p = new Vector3();
    if (sinOmega < 1e-6) {
      p.copy(a);
    } else {
      const s1 = Math.sin((1 - t) * omega) / sinOmega;
      const s2 = Math.sin(t * omega) / sinOmega;
      p.copy(a).multiplyScalar(s1).addScaledVector(b, s2);
    }
    // Lift the middle of the arc off the surface.
    const lift = 1 + Math.sin(Math.PI * t) * arcHeight;
    p.setLength(radius * lift);
    out.push(p);
  }
  return out;
}
