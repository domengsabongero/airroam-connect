import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Mesh } from "three";
import { TEX } from "../textures";
import { useGlobe } from "../useGlobe";

export function CloudsLayer() {
  const ref = useRef<Mesh>(null);
  const alphaMap = useTexture(TEX.clouds);
  const reduced = useGlobe((s) => s.reducedMotion);

  useFrame((_, delta) => {
    if (!ref.current || reduced) return;
    ref.current.rotation.y += delta * 0.015;
  });

  return (
    <mesh ref={ref} scale={1.012}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshPhongMaterial
        alphaMap={alphaMap}
        transparent
        opacity={0.35}
        depthWrite={false}
      />
    </mesh>
  );
}
