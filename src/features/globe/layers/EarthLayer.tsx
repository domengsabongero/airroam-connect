import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Mesh, SRGBColorSpace } from "three";
import { TEX } from "../textures";
import { useGlobe } from "../useGlobe";

export function EarthLayer() {
  const ref = useRef<Mesh>(null);
  const [map, bumpMap, specMap] = useTexture([TEX.earthDay, TEX.earthBump, TEX.earthSpec]);
  map.colorSpace = SRGBColorSpace;
  map.anisotropy = 4;

  const mode = useGlobe((s) => s.mode);
  const reduced = useGlobe((s) => s.reducedMotion);

  useFrame((_, delta) => {
    if (!ref.current) return;
    if (mode === "auto-rotate" && !reduced) {
      ref.current.rotation.y += delta * 0.04;
    }
  });

  return (
    <mesh ref={ref} rotation={[0, Math.PI, 0]}>
      <sphereGeometry args={[1, 96, 96]} />
      <meshPhongMaterial
        map={map}
        bumpMap={bumpMap}
        bumpScale={0.03}
        specularMap={specMap}
        shininess={22}
      />
    </mesh>
  );
}
