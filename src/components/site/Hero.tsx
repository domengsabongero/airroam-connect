import globeEarth from "@/assets/globe-earth.jpg";

export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-[100svh] flex-col items-center justify-center overflow-hidden pt-32 pb-24"
    >
      {/* Sky atmosphere */}
      <div className="absolute inset-0 -z-10 bg-sky-gradient" aria-hidden />

      {/* Drifting cloud blooms */}
      <div
        className="absolute -top-40 left-1/2 -z-10 h-[560px] w-[900px] -translate-x-1/2 rounded-full bg-aurora/10 blur-[140px] animate-drift"
        aria-hidden
      />
      <div
        className="absolute top-1/3 -left-40 -z-10 h-[400px] w-[600px] rounded-full bg-sky-500/10 blur-[120px]"
        aria-hidden
      />

      {/* Star field */}
      <div
        className="absolute inset-0 -z-10 opacity-40"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(1px 1px at 20% 30%, white, transparent), radial-gradient(1px 1px at 60% 20%, white, transparent), radial-gradient(1px 1px at 80% 60%, white, transparent), radial-gradient(1px 1px at 30% 70%, white, transparent), radial-gradient(1px 1px at 90% 10%, white, transparent), radial-gradient(1px 1px at 45% 85%, white, transparent)",
          backgroundSize: "600px 600px",
        }}
      />

      {/* Plane crossing */}
      <div className="pointer-events-none absolute inset-x-0 top-[38%] -z-10" aria-hidden>
        <div className="animate-flight relative">
          <div className="flex items-center gap-2">
            <div
              className="h-px w-[240px] animate-plane-trail"
              style={{
                background:
                  "linear-gradient(90deg, transparent, oklch(0.82 0.19 155 / 0.7), white)",
              }}
            />
            <svg
              className="size-4 -translate-y-px text-white drop-shadow-[0_0_8px_rgba(134,239,172,0.6)]"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden
            >
              <path d="M21 16v-2l-8-5V3.5A1.5 1.5 0 0 0 11.5 2 1.5 1.5 0 0 0 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1L15 22v-1.5L13 19v-5.5l8 2.5z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Curved horizon / globe silhouette */}
      <div
        className="pointer-events-none absolute -bottom-[55%] left-1/2 -z-10 aspect-square w-[140vw] max-w-[1600px] -translate-x-1/2 rounded-full opacity-90"
        aria-hidden
      >
        <div className="absolute inset-0 rounded-full ring-1 ring-white/10" />
        <div className="absolute inset-4 rounded-full ring-1 ring-white/5" />
        <img
          src={globeEarth}
          alt=""
          width={1600}
          height={896}
          className="animate-spin-slow absolute inset-0 h-full w-full rounded-full object-cover opacity-70 mix-blend-screen"
          loading="eager"
        />
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 50% 20%, transparent 45%, oklch(0.15 0.02 260) 62%)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 text-center">
        <div className="glass mb-8 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5">
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-aurora opacity-75" />
            <span className="relative inline-flex size-1.5 rounded-full bg-aurora" />
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            Live in 190+ countries
          </span>
        </div>

        <h1 className="text-gradient font-display text-5xl font-bold leading-[0.98] tracking-tight text-balance sm:text-6xl md:text-7xl lg:text-[5.25rem]">
          Travel without
          <br />
          losing connection.
        </h1>

        <p className="mt-6 max-w-xl text-pretty text-base text-muted-foreground sm:text-lg">
          Instant global data the moment you land. eSIM, travel SIM, and pocket WiFi built for
          modern explorers — no roaming fees, no compromise.
        </p>

        <div className="mt-10 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
          <a
            href="#plan"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-aurora px-6 py-3.5 text-sm font-semibold text-background shadow-glow transition-transform hover:scale-[1.03] active:scale-[0.98]"
          >
            Find my plan
            <svg
              className="size-4 transition-transform group-hover:translate-x-0.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
          <a
            href="#destinations"
            className="glass inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-foreground transition-colors hover:bg-white/10"
          >
            Explore destinations
          </a>
        </div>

        {/* Trust strip */}
        <div className="mt-16 grid grid-cols-3 gap-8 border-t border-white/5 pt-8 sm:gap-16">
          {[
            { k: "190+", v: "Countries" },
            { k: "450+", v: "Partner networks" },
            { k: "24ms", v: "Avg latency" },
          ].map((s) => (
            <div key={s.v} className="text-left">
              <div className="font-display text-2xl font-bold text-foreground sm:text-3xl">
                {s.k}
              </div>
              <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                {s.v}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
