import { Canvas } from "@react-three/fiber";
import { ACESFilmicToneMapping, SRGBColorSpace } from "three";
import { GlobeScene } from "./GlobeScene";
import { detectPerfTier } from "../performance";

export function GlobeCanvas() {
  const tier = detectPerfTier();
  const dprMax = tier === "high" ? 2 : tier === "medium" ? 1.5 : 1;
  return (
    <Canvas
      dpr={[1, dprMax]}
      camera={{ position: [0, 0, 3.2], fov: 42, near: 0.1, far: 100 }}
      gl={{
        antialias: tier !== "low",
        outputColorSpace: SRGBColorSpace,
        toneMapping: ACESFilmicToneMapping,
        toneMappingExposure: 0.95,
        alpha: true,
      }}
      style={{ width: "100%", height: "100%", background: "transparent" }}
    >
      <GlobeScene />
    </Canvas>
  );
}
