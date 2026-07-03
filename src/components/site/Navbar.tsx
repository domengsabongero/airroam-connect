import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

const products = [
  { to: "/esim", name: "DRET eSIM", desc: "Instant global data in 60 seconds" },
  { to: "/travel-sim", name: "Travel SIM", desc: "Physical SIM shipped worldwide" },
  { to: "/pocket-wifi", name: "Air-Roam Pocket WiFi", desc: "5G hotspot for 10 devices" },
  { to: "/enterprise", name: "Enterprise Solutions", desc: "Pooled data for global teams" },
] as const;

const resources = [
  { to: "/what-is-esim", name: "What is eSIM?" },
  { to: "/pricing", name: "Pricing" },
  { to: "/faq", name: "FAQ" },
  { to: "/support", name: "Support" },
  { to: "/affiliates", name: "Affiliates" },
  { to: "/about", name: "About" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? "border-b border-border/70 bg-background/85 backdrop-blur-xl" : "bg-transparent"}`}>
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6" aria-label="Primary">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid size-8 place-items-center rounded-xl bg-sunrise text-white shadow-glow-amber">
            <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden>
              <path d="M2 12l20-8-8 20-2-9-10-3z" />
            </svg>
          </span>
          <span className="font-display text-lg font-bold tracking-tight">Air-Roam</span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          <li className="relative" onMouseEnter={() => setProductsOpen(true)} onMouseLeave={() => setProductsOpen(false)}>
            <button className="inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium text-foreground/80 hover:text-foreground">
              Products <ChevronDown className="size-3.5" />
            </button>
            {productsOpen && (
              <div className="absolute left-1/2 top-full w-[520px] -translate-x-1/2 pt-2">
                <div className="card-soft grid grid-cols-2 gap-1 rounded-2xl p-2">
                  {products.map((p) => (
                    <Link key={p.to} to={p.to} className="group rounded-xl p-3 transition-colors hover:bg-surface">
                      <div className="text-sm font-semibold text-foreground group-hover:text-amber">{p.name}</div>
                      <div className="mt-0.5 text-xs text-muted-foreground">{p.desc}</div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </li>
          <li><Link to="/destinations" className="rounded-full px-3.5 py-2 text-sm font-medium text-foreground/80 hover:text-foreground">Destinations</Link></li>
          <li><Link to="/pricing" className="rounded-full px-3.5 py-2 text-sm font-medium text-foreground/80 hover:text-foreground">Pricing</Link></li>
          <li><Link to="/assistant" className="rounded-full px-3.5 py-2 text-sm font-medium text-foreground/80 hover:text-foreground">AI Assistant</Link></li>
          <li><Link to="/support" className="rounded-full px-3.5 py-2 text-sm font-medium text-foreground/80 hover:text-foreground">Support</Link></li>
        </ul>

        <div className="flex items-center gap-2">
          <Link to="/planner" className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-sm font-semibold text-background transition-transform hover:scale-[1.03]">
            Find my plan
          </Link>
          <button onClick={() => setOpen((v) => !v)} className="grid size-10 place-items-center rounded-full border border-border lg:hidden" aria-label="Toggle menu">
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="fixed inset-x-0 top-16 z-40 h-[calc(100dvh-4rem)] overflow-y-auto bg-background lg:hidden">
          <div className="space-y-6 px-6 py-8">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-amber">Products</p>
              <div className="mt-3 grid gap-2">
                {products.map((p) => (
                  <Link key={p.to} to={p.to} onClick={() => setOpen(false)} className="rounded-xl border border-border p-4">
                    <div className="text-sm font-semibold">{p.name}</div>
                    <div className="mt-0.5 text-xs text-muted-foreground">{p.desc}</div>
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-amber">Explore</p>
              <div className="mt-3 grid gap-1">
                <Link to="/destinations" onClick={() => setOpen(false)} className="rounded-lg px-3 py-2.5 text-sm font-medium">Destinations</Link>
                <Link to="/planner" onClick={() => setOpen(false)} className="rounded-lg px-3 py-2.5 text-sm font-medium">Find my plan</Link>
                <Link to="/assistant" onClick={() => setOpen(false)} className="rounded-lg px-3 py-2.5 text-sm font-medium">AI Assistant</Link>
                {resources.map((r) => (
                  <Link key={r.to} to={r.to} onClick={() => setOpen(false)} className="rounded-lg px-3 py-2.5 text-sm font-medium">{r.name}</Link>
                ))}
                <Link to="/contact" onClick={() => setOpen(false)} className="rounded-lg px-3 py-2.5 text-sm font-medium">Contact</Link>
              </div>
            </div>
            <Link to="/planner" onClick={() => setOpen(false)} className="block rounded-full bg-foreground px-5 py-3 text-center text-sm font-semibold text-background">
              Find my plan
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
