import { Color } from "three";
import { DEFAULT_ORIGIN } from "@/data/countries";
import { latLngToVec3 } from "../math/latLngToVec3";

const SUNRISE = new Color("#fb923c");

export function OriginPinLayer() {
  const p = latLngToVec3(DEFAULT_ORIGIN.lat, DEFAULT_ORIGIN.lng, 1.005).toArray() as [
    number,
    number,
    number,
  ];
  return (
    <group position={p}>
      <mesh>
        <sphereGeometry args={[0.022, 16, 16]} />
        <meshBasicMaterial color={SUNRISE} toneMapped={false} />
      </mesh>
      <mesh>
        <ringGeometry args={[0.03, 0.05, 32]} />
        <meshBasicMaterial color={SUNRISE} transparent opacity={0.55} toneMapped={false} />
      </mesh>
    </group>
  );
}
