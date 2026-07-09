import { Link } from "@tanstack/react-router";
import { countryBySlug } from "@/data/countries";
import { startingFrom } from "@/domain/pricing/service";
import { formatMoney } from "@/lib/format";
import { useGlobe } from "../useGlobe";

export function GlobeTooltip() {
  const hovered = useGlobe((s) => s.hoveredSlug);
  const selected = useGlobe((s) => s.selectedSlug);
  const slug = hovered ?? selected;
  const c = slug ? countryBySlug(slug) : null;
  if (!c) return null;
  const from = startingFrom(c.slug);
  return (
    <div className="pointer-events-auto absolute bottom-4 left-1/2 z-10 w-[min(92%,22rem)] -translate-x-1/2 rounded-2xl border border-border bg-card/95 p-4 shadow-elevated backdrop-blur">
      <div className="flex items-center gap-3">
        <span className="text-3xl">{c.flag}</span>
        <div className="flex-1">
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-teal">
            {c.region}
          </div>
          <div className="font-display text-lg font-bold leading-tight">{c.name}</div>
        </div>
        <Link
          to="/destinations/$country"
          params={{ country: c.slug }}
          className="inline-flex items-center gap-1 rounded-full bg-sunrise px-3 py-1.5 text-xs font-semibold text-white shadow-glow-amber"
        >
          Open →
        </Link>
      </div>
      <dl className="mt-3 grid grid-cols-3 gap-3 text-[11px]">
        <div>
          <dt className="text-muted-foreground">Network</dt>
          <dd className="font-semibold">{c.network}</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Coverage</dt>
          <dd className="font-semibold capitalize">{c.coverage}</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">From</dt>
          <dd className="font-semibold text-amber">{from ? formatMoney(from) : "—"}</dd>
        </div>
      </dl>
    </div>
  );
}
