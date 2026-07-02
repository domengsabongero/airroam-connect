export function Assistant() {
  return (
    <section id="assistant" className="relative px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="glass shadow-elevated relative grid grid-cols-1 gap-10 overflow-hidden rounded-[36px] p-8 md:grid-cols-2 md:p-14">
          {/* Ambient */}
          <div
            className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-aurora/20 blur-3xl"
            aria-hidden
          />

          <div className="relative">
            <div className="mb-8 flex size-12 items-center justify-center rounded-2xl bg-aurora/10 ring-1 ring-aurora/30">
              <div className="size-4 rounded-full bg-aurora shadow-glow" />
            </div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-aurora">
              AI travel assistant
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Not sure what you need?
              <br />
              Ask, and we'll match you.
            </h2>
            <p className="mt-4 max-w-md text-pretty text-muted-foreground">
              Tell us where you're going, how long, and what you'll do. We'll recommend the exact
              plan and hardware — no upsells.
            </p>
            <button className="mt-8 inline-flex items-center gap-3 text-sm font-semibold text-foreground">
              Start consultation
              <span className="flex size-9 items-center justify-center rounded-full bg-aurora text-background transition-transform group-hover:scale-105">
                <svg
                  className="size-4"
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
              </span>
            </button>
          </div>

          <div className="relative space-y-4">
            <div className="flex items-start gap-3">
              <div className="size-8 shrink-0 rounded-full bg-white/10" aria-hidden />
              <div className="glass max-w-sm rounded-2xl rounded-tl-sm px-4 py-3 text-sm text-foreground/90">
                Iceland for 10 days. I'll drive and tether my laptop for work.
              </div>
            </div>
            <div className="flex items-start justify-end gap-3">
              <div className="max-w-sm rounded-2xl rounded-tr-sm bg-aurora/15 px-4 py-3 text-sm text-foreground ring-1 ring-aurora/30">
                Go with <span className="font-semibold text-aurora">Nomad Pocket WiFi</span> —
                unlimited 5G, drives with you, tethers your laptop and phone at once. Est. $6/day.
              </div>
              <div className="size-8 shrink-0 rounded-full bg-aurora shadow-glow" aria-hidden />
            </div>
            <div className="flex items-start gap-3">
              <div className="size-8 shrink-0 rounded-full bg-white/10" aria-hidden />
              <div className="glass max-w-sm rounded-2xl rounded-tl-sm px-4 py-3 text-sm text-foreground/90">
                Backup if I lose it?
              </div>
            </div>
            <div className="flex items-start justify-end gap-3">
              <div className="max-w-sm rounded-2xl rounded-tr-sm bg-aurora/15 px-4 py-3 text-sm text-foreground ring-1 ring-aurora/30">
                Add a free eSIM to your phone. If the hotspot fails, it fails over instantly.
              </div>
              <div className="size-8 shrink-0 rounded-full bg-aurora shadow-glow" aria-hidden />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
