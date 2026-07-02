import { useEffect, useState } from "react";

const links = [
  { label: "Destinations", href: "#destinations" },
  { label: "eSIM", href: "#products" },
  { label: "Pocket WiFi", href: "#products" },
  { label: "Enterprise", href: "#enterprise" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <nav
        className={`glass flex w-full max-w-5xl items-center justify-between rounded-full px-3 py-2 pl-5 transition-all duration-500 ${
          scrolled ? "shadow-elevated" : ""
        }`}
        aria-label="Primary"
      >
        <a href="#top" className="flex items-center gap-2 pr-4">
          <span className="relative flex size-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-aurora opacity-60" />
            <span className="relative inline-flex size-2.5 rounded-full bg-aurora shadow-glow" />
          </span>
          <span className="font-display text-lg font-bold tracking-tight text-foreground">
            Air-Roam
          </span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                className="rounded-full px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href="#login"
            className="hidden rounded-full px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:inline-block"
          >
            Log in
          </a>
          <a
            href="#plan"
            className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-sm font-semibold text-background transition-transform hover:scale-[1.03] active:scale-[0.98]"
          >
            Find my plan
            <svg
              className="size-3.5"
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
        </div>
      </nav>
    </header>
  );
}
