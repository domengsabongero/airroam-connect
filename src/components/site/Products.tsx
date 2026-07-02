const products = [
  {
    id: "esim",
    tag: "Instant",
    name: "Air-Roam eSIM",
    tagline: "Activate in 60 seconds. Zero shipping.",
    features: ["QR-code install", "Dual-SIM compatible", "5G in 190+ countries"],
    cta: "Set up eSIM",
    highlight: false,
    icon: (
      <div className="relative flex size-full items-center justify-center">
        <div className="h-16 w-24 rounded-lg bg-gradient-to-br from-aurora/60 to-aurora/10 ring-1 ring-aurora/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="grid grid-cols-3 gap-1">
            {Array.from({ length: 9 }).map((_, i) => (
              <span
                key={i}
                className="size-1.5 rounded-sm bg-background/80"
                style={{ opacity: 0.4 + (i % 3) * 0.2 }}
              />
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "wifi",
    tag: "Group",
    name: "Nomad Pocket WiFi",
    tagline: "10 devices. 24-hour battery. 5G everywhere.",
    features: ["Rent or buy", "Encrypted VPN built-in", "Unlimited data plans"],
    cta: "Rent a hotspot",
    highlight: true,
    icon: (
      <div className="relative flex size-full items-center justify-center">
        <div className="animate-float-slow relative flex h-24 w-16 flex-col items-center justify-between rounded-2xl bg-foreground p-3 text-background shadow-elevated">
          <div className="w-full space-y-1">
            <span className="block h-1 rounded-full bg-aurora" />
            <div className="flex items-end justify-center gap-0.5 py-2">
              {[3, 5, 7, 9, 11].map((h) => (
                <span
                  key={h}
                  className="w-1 rounded-sm bg-aurora"
                  style={{ height: `${h * 2}px` }}
                />
              ))}
            </div>
          </div>
          <span className="font-mono text-[7px] tracking-widest">AIR-ROAM</span>
        </div>
        <span className="absolute -top-2 right-3 size-2 animate-pulse-ring rounded-full bg-aurora" />
      </div>
    ),
  },
  {
    id: "sim",
    tag: "Classic",
    name: "Travel Physical SIM",
    tagline: "Delivered before you fly.",
    features: ["Universal 3-in-1 cut", "Local number included", "Multi-carrier failover"],
    cta: "Order SIM kit",
    highlight: false,
    icon: (
      <div className="relative flex size-full items-center justify-center">
        <div className="relative h-16 w-24 rounded-md bg-gradient-to-br from-white/90 to-white/60 shadow-elevated">
          <div className="absolute inset-2 rounded-sm bg-yellow-100/80" />
          <div className="absolute inset-x-3 inset-y-3 grid grid-cols-3 gap-0.5">
            {Array.from({ length: 6 }).map((_, i) => (
              <span key={i} className="rounded-[1px] bg-yellow-700/50" />
            ))}
          </div>
        </div>
      </div>
    ),
  },
];

export function Products() {
  return (
    <section id="products" className="relative px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-aurora">
            Choose your hardware
          </p>
          <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-balance sm:text-5xl">
            Three ways to stay connected.
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground">
            One account, one dashboard. Switch between them the moment your trip changes.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {products.map((p) => (
            <article
              key={p.id}
              className={`group relative flex flex-col overflow-hidden rounded-3xl border p-8 transition-all hover:-translate-y-1 ${
                p.highlight
                  ? "border-aurora/30 bg-card shadow-glow"
                  : "border-white/5 bg-card/50"
              }`}
            >
              {p.highlight && (
                <span className="absolute right-6 top-6 rounded-full bg-aurora px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-background">
                  Most popular
                </span>
              )}

              <div className="relative h-32 w-full">{p.icon}</div>

              <div className="mt-6 flex items-center gap-2">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-aurora">
                  {p.tag}
                </span>
              </div>
              <h3 className="mt-2 font-display text-2xl font-bold tracking-tight text-foreground">
                {p.name}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.tagline}</p>

              <ul className="mt-6 flex-1 space-y-3 border-t border-white/5 pt-6">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-foreground/90">
                    <svg
                      className="mt-0.5 size-4 shrink-0 text-aurora"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>

              <button
                type="button"
                className={`mt-8 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-transform hover:scale-[1.02] ${
                  p.highlight
                    ? "bg-aurora text-background"
                    : "bg-white/5 text-foreground hover:bg-white/10"
                }`}
              >
                {p.cta}
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
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
