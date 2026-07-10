import { OrbitControls } from "@react-three/drei";
import { Suspense, useEffect, useRef } from "react";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { EarthLayer } from "../layers/EarthLayer";
import { AtmosphereLayer } from "../layers/AtmosphereLayer";
import { CloudsLayer } from "../layers/CloudsLayer";
import { CountryMarkersLayer } from "../layers/CountryMarkersLayer";
import { FlightArcLayer } from "../layers/FlightArcLayer";
import { OriginPinLayer } from "../layers/OriginPinLayer";
import { CameraController } from "./CameraController";
import { useGlobe } from "../useGlobe";
import { globeActions } from "../store";
import { GlobeErrorBoundary } from "./GlobeErrorBoundary";
import { detectPerfTier } from "../performance";

export function GlobeScene() {
  const slot = useGlobe((s) => s.activeSlot);
  const layers = useGlobe((s) => s.layers);
  const reduced = useGlobe((s) => s.reducedMotion);
  const controlsRef = useRef<OrbitControlsImpl | null>(null);
  const tier = detectPerfTier();
  const showClouds = layers.clouds && tier !== "low";

  const interactive = !!slot?.interactive;
  const autoRotate = !!slot?.autoRotate && !reduced;

  useEffect(() => {
    const el = controlsRef.current?.domElement;
    if (!el) return;
    const onDown = () => globeActions.noteInteraction();
    el.addEventListener("pointerdown", onDown);
    el.addEventListener("wheel", onDown, { passive: true });
    return () => {
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("wheel", onDown);
    };
  }, [interactive]);

  return (
    <>
      <ambientLight intensity={0.5} />
      <hemisphereLight args={["#fff2d6", "#0a1024", 0.35]} />
      <directionalLight position={[5, 3, 5]} intensity={1.15} color="#fff4d6" />
      <directionalLight position={[-4, -2, -3]} intensity={0.35} color="#8ec5ff" />

      <Suspense fallback={null}>
        {layers.earth && <EarthLayer />}
        {showClouds && <CloudsLayer />}
      </Suspense>
      {layers.atmosphere && <AtmosphereLayer />}
      {layers.origin && <OriginPinLayer />}
      {layers.markers && <CountryMarkersLayer />}
      {layers.arc && <FlightArcLayer />}

      <OrbitControls
        ref={controlsRef}
        enablePan={false}
        enableZoom={interactive}
        enableRotate={interactive}
        minDistance={1.6}
        maxDistance={4}
        enableDamping
        dampingFactor={0.08}
        autoRotate={autoRotate}
        autoRotateSpeed={0.35}
      />
      <CameraController controls={controlsRef} />
    </>
  );
}
