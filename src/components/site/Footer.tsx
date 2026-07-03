import { Link } from "@tanstack/react-router";

const cols = [
  {
    title: "Products",
    links: [
      { name: "DRET eSIM", to: "/esim" as const },
      { name: "Travel SIM", to: "/travel-sim" as const },
      { name: "Air-Roam Pocket WiFi", to: "/pocket-wifi" as const },
      { name: "Enterprise Solutions", to: "/enterprise" as const },
      { name: "Pricing", to: "/pricing" as const },
    ],
  },
  {
    title: "Explore",
    links: [
      { name: "Destinations", to: "/destinations" as const },
      { name: "Find my plan", to: "/planner" as const },
      { name: "AI Assistant", to: "/assistant" as const },
      { name: "What is eSIM?", to: "/what-is-esim" as const },
    ],
  },
  {
    title: "Support",
    links: [
      { name: "Help center", to: "/support" as const },
      { name: "FAQ", to: "/faq" as const },
      { name: "Contact", to: "/contact" as const },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About", to: "/about" as const },
      { name: "Affiliates", to: "/affiliates" as const },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-surface px-6 pt-20 pb-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-6">
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2">
              <span className="grid size-8 place-items-center rounded-xl bg-sunrise text-white shadow-glow-amber">
                <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden>
                  <path d="M2 12l20-8-8 20-2-9-10-3z" />
                </svg>
              </span>
              <span className="font-display text-lg font-bold tracking-tight">Air-Roam</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              Premium travel connectivity for the modern explorer. 190+ countries, zero roaming fees, one dashboard.
            </p>
            <form className="mt-6 flex max-w-sm items-center gap-2 rounded-full border border-border bg-background p-1 pl-4" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="you@wherever.com"
                aria-label="Newsletter email"
                className="min-w-0 flex-1 bg-transparent text-sm placeholder:text-muted-foreground/60 focus:outline-none"
              />
              <button className="shrink-0 rounded-full bg-foreground px-4 py-2 text-xs font-semibold text-background">Subscribe</button>
            </form>
          </div>

          {cols.map((c) => (
            <div key={c.title}>
              <h4 className="font-mono text-[10px] uppercase tracking-[0.2em] text-amber">{c.title}</h4>
              <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
                {c.links.map((l) => (
                  <li key={l.name}>
                    <Link to={l.to} className="transition-colors hover:text-foreground">{l.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="font-mono text-[11px] text-muted-foreground">© 2026 Air-Roam Connectivity Ltd.</p>
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
