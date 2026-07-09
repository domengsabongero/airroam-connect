import { Vector3 } from "three";

/**
 * Convert latitude/longitude in degrees to a Vector3 on a sphere of given radius.
 * Convention: prime meridian (lng=0) sits on +Z, east is positive.
 * A texture with the prime meridian at u=0.5 (typical equirectangular Earth) then
 * lines up when the sphere's default UV mapping is used, because Three's
 * SphereGeometry places u=0 at +X and u=0.5 at −X; we rotate the sphere by π
 * in EarthLayer to put u=0.5 (the map's prime meridian) at our +Z axis.
 */
export function latLngToVec3(lat: number, lng: number, radius = 1): Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const x = -radius * Math.sin(phi) * Math.cos(theta);
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);
  return new Vector3(x, y, z);
}

/** Convert lat/lng to a camera position sitting `distance` units from the earth center. */
export function latLngToCameraPos(lat: number, lng: number, distance: number): Vector3 {
  return latLngToVec3(lat, lng, distance);
}
