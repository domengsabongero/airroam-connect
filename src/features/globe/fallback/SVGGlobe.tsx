import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { countries, DEFAULT_ORIGIN } from "@/data/countries";

// Equirectangular projection with a subtle sphere-ish shading.
function project(lat: number, lng: number) {
  const x = ((lng + 180) / 360) * 1000;
  const y = ((90 - lat) / 180) * 500;
  return { x, y };
}

export function SVGGlobe() {
  const [hover, setHover] = useState<string | null>(null);
  const origin = project(DEFAULT_ORIGIN.lat, DEFAULT_ORIGIN.lng);
  return (
    <div className="absolute inset-0 grid place-items-center bg-surface">
      <svg viewBox="0 0 1000 500" className="h-full w-full" role="img" aria-label="World map">
        <defs>
          <radialGradient id="ocean" cx="50%" cy="45%" r="55%">
            <stop offset="0%" stopColor="oklch(0.9 0.03 235)" />
            <stop offset="100%" stopColor="oklch(0.82 0.04 235)" />
          </radialGradient>
        </defs>
        <rect width="1000" height="500" fill="url(#ocean)" />
        {countries.map((c) => {
          const p = project(c.lat, c.lng);
          const active = hover === c.slug;
          return (
            <g key={c.slug} transform={`translate(${p.x} ${p.y})`}>
              <Link to="/destinations/$country" params={{ country: c.slug }}>
                <circle
                  r={active ? 6 : 4}
                  fill={c.popular ? "oklch(0.76 0.16 65)" : "oklch(0.72 0.13 190)"}
                  stroke="white"
                  strokeWidth={1.5}
                  onMouseEnter={() => setHover(c.slug)}
                  onMouseLeave={() => setHover(null)}
                  className="cursor-pointer"
                />
                {active && (
                  <text y={-10} textAnchor="middle" fontSize={11} fill="oklch(0.18 0.02 250)">
                    {c.flag} {c.name}
                  </text>
                )}
              </Link>
            </g>
          );
        })}
        <circle cx={origin.x} cy={origin.y} r={7} fill="oklch(0.76 0.16 65)" stroke="white" strokeWidth={2} />
      </svg>
    </div>
  );
}
