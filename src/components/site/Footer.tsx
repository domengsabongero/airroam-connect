const columns = [
  {
    title: "Product",
    links: ["eSIM Global", "Travel SIM", "Pocket WiFi", "Business fleet"],
  },
  {
    title: "Support",
    links: ["Help center", "Device checker", "Coverage map", "Network status"],
  },
  {
    title: "Company",
    links: ["About", "Press", "Partners", "Careers"],
  },
];

export function Footer() {
  return (
    <footer className="relative border-t border-white/5 px-6 pt-24 pb-10">
      <div className="mx-auto max-w-7xl">
        {/* CTA banner */}
        <div className="glass relative mb-24 overflow-hidden rounded-3xl px-8 py-14 text-center sm:px-14">
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            aria-hidden
            style={{
              background:
                "radial-gradient(circle at 50% 0%, oklch(0.82 0.19 155 / 0.35), transparent 60%)",
            }}
          />
          <p className="relative font-mono text-[11px] uppercase tracking-[0.2em] text-aurora">
            Take off with confidence
          </p>
          <h3 className="relative mt-3 font-display text-3xl font-bold tracking-tight sm:text-5xl">
            Your next trip deserves better signal.
          </h3>
          <div className="relative mt-8 flex flex-wrap justify-center gap-3">
            <a
              href="#plan"
              className="inline-flex items-center gap-2 rounded-full bg-aurora px-6 py-3 text-sm font-semibold text-background shadow-glow transition-transform hover:scale-[1.03]"
            >
              Find my plan
            </a>
            <a
              href="#assistant"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-white/10"
            >
              Talk to assistant
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-12 md:grid-cols-5">
          <div className="col-span-2">
            <div className="flex items-center gap-2">
              <span className="size-2.5 rounded-full bg-aurora shadow-glow" />
              <span className="font-display text-lg font-bold tracking-tight">Air-Roam</span>
            </div>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              Premium travel connectivity for the modern explorer. Serving over 190 countries with
              zero roaming fees.
            </p>
            <form className="mt-8 flex max-w-sm items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] p-1 pl-4">
              <input
                type="email"
                placeholder="you@wherever.com"
                aria-label="Email for travel tips"
                className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none"
              />
              <button className="rounded-full bg-foreground px-4 py-2 text-xs font-semibold text-background">
                Subscribe
              </button>
            </form>
          </div>

          {columns.map((c) => (
            <div key={c.title}>
              <h4 className="font-mono text-[10px] uppercase tracking-[0.2em] text-aurora">
                {c.title}
              </h4>
              <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
                {c.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="transition-colors hover:text-foreground">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 md:flex-row">
          <p className="font-mono text-[11px] text-muted-foreground">
            © 2026 Air-Roam Connectivity Ltd. All signals rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-muted-foreground">
            <a href="#" className="hover:text-foreground">Privacy</a>
            <a href="#" className="hover:text-foreground">Terms</a>
            <a href="#" className="hover:text-foreground">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
