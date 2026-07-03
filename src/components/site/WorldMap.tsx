import { useState, useMemo } from "react";
import { Link } from "@tanstack/react-router";
import { countries } from "@/data/countries";
import { Search } from "lucide-react";

// Approximate lat/long → SVG coordinates
const pinCoords: Record<string, { x: number; y: number }> = {
  "japan": { x: 830, y: 200 },
  "united-states": { x: 220, y: 200 },
  "france": { x: 500, y: 175 },
  "italy": { x: 520, y: 195 },
  "spain": { x: 480, y: 200 },
  "united-kingdom": { x: 490, y: 155 },
  "germany": { x: 520, y: 165 },
  "switzerland": { x: 515, y: 180 },
  "greece": { x: 550, y: 210 },
  "portugal": { x: 465, y: 205 },
  "netherlands": { x: 510, y: 160 },
  "turkey": { x: 580, y: 210 },
  "thailand": { x: 780, y: 275 },
  "vietnam": { x: 800, y: 265 },
  "indonesia": { x: 810, y: 335 },
  "south-korea": { x: 820, y: 195 },
  "singapore": { x: 790, y: 320 },
  "australia": { x: 860, y: 400 },
  "new-zealand": { x: 940, y: 435 },
  "brazil": { x: 340, y: 355 },
  "mexico": { x: 200, y: 250 },
  "canada": { x: 220, y: 130 },
  "uae": { x: 640, y: 240 },
  "morocco": { x: 480, y: 235 },
  "south-africa": { x: 570, y: 400 },
  "egypt": { x: 570, y: 235 },
  "iceland": { x: 460, y: 115 },
  "india": { x: 700, y: 250 },
  "argentina": { x: 320, y: 425 },
  "china": { x: 780, y: 210 },
};

export function WorldMap() {
  const [query, setQuery] = useState("");
  const [hovered, setHovered] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (!query) return countries;
    const q = query.toLowerCase();
    return countries.filter((c) => c.name.toLowerCase().includes(q));
  }, [query]);

  return (
    <div className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-card">
      <div className="flex items-center gap-2 border-b border-border px-4 py-3">
        <Search className="size-4 text-muted-foreground" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search 190+ countries…"
          className="w-full bg-transparent text-sm placeholder:text-muted-foreground/60 focus:outline-none"
        />
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{filtered.length} results</span>
      </div>

      <div className="relative aspect-[2/1] w-full bg-surface">
        <svg viewBox="0 0 1000 500" className="absolute inset-0 h-full w-full" role="img" aria-label="World coverage map">
          {/* Stylized continents */}
          <g fill="oklch(0.92 0.01 235)" stroke="oklch(0.85 0.02 235)" strokeWidth="0.5">
            <path d="M120 130 Q180 100 260 120 L300 180 Q280 240 220 250 L150 240 Q100 200 120 130Z" />
            <path d="M180 250 Q220 260 260 280 L320 380 Q300 450 260 460 L220 440 Q170 380 180 250Z" />
            <path d="M440 130 Q510 100 590 130 L620 170 Q610 210 560 220 L490 220 Q450 200 440 130Z" />
            <path d="M470 220 Q550 240 620 270 L610 380 Q560 430 500 420 L470 350 Q450 280 470 220Z" />
            <path d="M620 150 Q720 130 830 160 Q890 200 870 260 L780 290 Q690 280 640 240 Q610 200 620 150Z" />
            <path d="M700 290 Q800 300 850 330 L840 380 Q790 370 720 350 Q690 320 700 290Z" />
            <path d="M820 380 Q900 380 940 410 L920 460 Q860 470 810 440 Q800 410 820 380Z" />
          </g>

          {/* Country pins */}
          {countries.map((c) => {
            const p = pinCoords[c.slug];
            if (!p) return null;
            const isHovered = hovered === c.slug;
            const inQuery = !query || c.name.toLowerCase().includes(query.toLowerCase());
            return (
              <g key={c.slug} transform={`translate(${p.x} ${p.y})`}>
                <Link
                  to="/destinations/$country"
                  params={{ country: c.slug }}
                  onMouseEnter={() => setHovered(c.slug)}
                  onMouseLeave={() => setHovered(null)}
                >
                  {inQuery && <circle r="10" fill="oklch(0.76 0.16 65 / 0.15)" className={isHovered ? "animate-pulse-ring" : ""} />}
                  <circle r={isHovered ? 5 : 3.5} fill={inQuery ? "oklch(0.76 0.16 65)" : "oklch(0.7 0.02 245)"} stroke="white" strokeWidth="1.5" className="cursor-pointer transition-all" />
                  {isHovered && (
                    <g transform="translate(0 -12)">
                      <rect x="-40" y="-14" width="80" height="18" rx="4" fill="oklch(0.18 0.02 250)" />
                      <text x="0" y="-2" textAnchor="middle" fontSize="10" fill="white" fontFamily="Inter">{c.flag} {c.name}</text>
                    </g>
                  )}
                </Link>
              </g>
            );
          })}

          {/* Arc lines */}
          <g fill="none" stroke="oklch(0.72 0.13 190)" strokeWidth="1" strokeDasharray="3 3" opacity="0.5">
            <path d="M220 200 Q450 100 830 200" />
            <path d="M500 175 Q650 130 780 275" />
            <path d="M780 275 Q820 350 860 400" />
          </g>
        </svg>
      </div>
    </div>
  );
}
