import { AdditiveBlending, BackSide, ShaderMaterial } from "three";
import { useMemo } from "react";

export function AtmosphereLayer() {
  const material = useMemo(
    () =>
      new ShaderMaterial({
        transparent: true,
        blending: AdditiveBlending,
        side: BackSide,
        depthWrite: false,
        uniforms: {
          uInner: { value: [1.0, 0.62, 0.19] }, // amber
          uOuter: { value: [0.22, 0.63, 0.94] }, // sky
        },
        vertexShader: /* glsl */ `
          varying vec3 vNormal;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: /* glsl */ `
          varying vec3 vNormal;
          uniform vec3 uInner;
          uniform vec3 uOuter;
          void main() {
            float intensity = pow(0.72 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 3.0);
            vec3 color = mix(uInner, uOuter, clamp(intensity * 1.8, 0.0, 1.0));
            gl_FragColor = vec4(color, intensity);
          }
        `,
      }),
    [],
  );

  return (
    <mesh scale={1.14}>
      <sphereGeometry args={[1, 64, 64]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
}
