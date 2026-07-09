import { useMemo } from "react";
import { Color } from "three";
import { countries } from "@/data/countries";
import { latLngToVec3 } from "../math/latLngToVec3";
import { useGlobe } from "../useGlobe";
import { globeActions } from "../store";

const AMBER = new Color("#f59e0b");
const TEAL = new Color("#14b8a6");

export function CountryMarkersLayer() {
  const selected = useGlobe((s) => s.selectedSlug);
  const hovered = useGlobe((s) => s.hoveredSlug);

  const items = useMemo(
    () =>
      countries.map((c) => ({
        slug: c.slug,
        position: latLngToVec3(c.lat, c.lng, 1.004).toArray() as [number, number, number],
        popular: !!c.popular,
      })),
    [],
  );

  return (
    <group>
      {items.map((m) => {
        const isSelected = selected === m.slug;
        const isHovered = hovered === m.slug;
        const color = m.popular || isSelected ? AMBER : TEAL;
        const size = isSelected ? 0.028 : isHovered ? 0.022 : m.popular ? 0.018 : 0.014;
        return (
          <group key={m.slug} position={m.position}>
            <mesh
              onPointerOver={(e) => {
                e.stopPropagation();
                document.body.style.cursor = "pointer";
                globeActions.hover(m.slug);
              }}
              onPointerOut={(e) => {
                e.stopPropagation();
                document.body.style.cursor = "";
                globeActions.hover(null);
              }}
              onClick={(e) => {
                e.stopPropagation();
                globeActions.select(m.slug);
              }}
            >
              <sphereGeometry args={[size, 12, 12]} />
              <meshBasicMaterial color={color} toneMapped={false} />
            </mesh>
            {(isSelected || isHovered) && (
              <mesh>
                <ringGeometry args={[size * 1.6, size * 2.4, 32]} />
                <meshBasicMaterial color={AMBER} transparent opacity={0.7} toneMapped={false} />
              </mesh>
            )}
          </group>
        );
      })}
    </group>
  );
}
