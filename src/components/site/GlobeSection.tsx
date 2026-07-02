import globeEarth from "@/assets/globe-earth.jpg";

const pins = [
  { top: "28%", left: "22%", label: "New York", ping: true },
  { top: "34%", left: "48%", label: "London", ping: false },
  { top: "40%", left: "56%", label: "Dubai", ping: true },
  { top: "38%", left: "72%", label: "Tokyo", ping: false },
  { top: "62%", left: "78%", label: "Sydney", ping: true },
  { top: "58%", left: "36%", label: "São Paulo", ping: false },
];

export function GlobeSection() {
  return (
    <section id="network" className="relative px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-aurora">
            The network
          </p>
          <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-balance sm:text-5xl">
            One tap to the world's fastest local carrier.
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground">
            Direct peering with 450+ tier-one carriers means you're always on the strongest 5G
            band available — automatically.
          </p>
        </div>

        <div className="relative mt-16 overflow-hidden rounded-[36px] border border-white/10 bg-black/40">
          <div className="relative aspect-[16/9]">
            <img
              src={globeEarth}
              alt="Air-Roam global connectivity map showing partner network coverage"
              width={1600}
              height={896}
              className="h-full w-full object-cover opacity-70"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

            {/* Connection lines (SVG arcs) */}
            <svg
              className="absolute inset-0 h-full w-full"
              viewBox="0 0 100 56"
              preserveAspectRatio="none"
              aria-hidden
            >
              <defs>
                <linearGradient id="arc" x1="0" x2="1" y1="0" y2="0">
                  <stop offset="0%" stopColor="oklch(0.82 0.19 155)" stopOpacity="0" />
                  <stop offset="50%" stopColor="oklch(0.82 0.19 155)" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="oklch(0.82 0.19 155)" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M22 15 Q40 3 56 22"
                fill="none"
                stroke="url(#arc)"
                strokeWidth="0.25"
                strokeLinecap="round"
              />
              <path
                d="M48 19 Q60 6 72 21"
                fill="none"
                stroke="url(#arc)"
                strokeWidth="0.25"
                strokeLinecap="round"
              />
              <path
                d="M56 22 Q68 40 78 34"
                fill="none"
                stroke="url(#arc)"
                strokeWidth="0.25"
                strokeLinecap="round"
              />
              <path
                d="M36 32 Q50 46 72 21"
                fill="none"
                stroke="url(#arc)"
                strokeWidth="0.25"
                strokeLinecap="round"
              />
            </svg>

            {/* Pins */}
            {pins.map((p) => (
              <div
                key={p.label}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ top: p.top, left: p.left }}
              >
                <div className="relative">
                  {p.ping && (
                    <span className="absolute inset-0 -m-1 animate-pulse-ring rounded-full bg-aurora/60" />
                  )}
                  <span className="relative block size-2 rounded-full bg-aurora shadow-glow ring-2 ring-background" />
                  <span className="absolute left-1/2 top-4 -translate-x-1/2 whitespace-nowrap rounded-md bg-background/80 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-foreground backdrop-blur-sm">
                    {p.label}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Floating stat cards */}
          <div className="pointer-events-none absolute inset-0 hidden md:block">
            <div className="glass animate-float-slow absolute left-6 bottom-6 rounded-2xl p-5">
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-aurora">
                Live coverage
              </div>
              <div className="mt-1 font-display text-xl font-bold">Tokyo, JP</div>
              <div className="mt-3 flex items-center gap-5 text-xs text-muted-foreground">
                <div>
                  <div className="text-[10px] uppercase tracking-widest">Speed</div>
                  <div className="text-sm font-semibold text-foreground">840 Mbps</div>
                </div>
                <div className="h-8 w-px bg-white/10" />
                <div>
                  <div className="text-[10px] uppercase tracking-widest">Latency</div>
                  <div className="text-sm font-semibold text-foreground">12 ms</div>
                </div>
              </div>
            </div>

            <div
              className="glass animate-float-slow absolute right-6 top-6 rounded-2xl p-5"
              style={{ animationDelay: "1.5s" }}
            >
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-aurora">
                Uptime
              </div>
              <div className="mt-1 font-display text-xl font-bold">99.99%</div>
              <div className="mt-2 text-xs text-muted-foreground">Last 90 days</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
