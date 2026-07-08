import { Link } from "@tanstack/react-router";
import type { Country } from "@/data/countries";
import { startingFrom } from "@/domain/pricing";
import { formatMoney } from "@/lib/format";
import { ArrowUpRight } from "lucide-react";

export function CountryCard({ c }: { c: Country }) {
  const from = startingFrom(c.slug);
  return (
    <Link
      to="/destinations/$country"
      params={{ country: c.slug }}
      className="group relative flex flex-col rounded-2xl border border-border bg-card p-5 shadow-card transition-all hover:-translate-y-1 hover:shadow-elevated"
    >
      <div className="flex items-start justify-between">
        <div className="grid size-12 place-items-center rounded-xl bg-surface text-2xl">{c.flag}</div>
        <ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-amber" />
      </div>
      <div className="mt-4">
        <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-teal">{c.region}</div>
        <div className="mt-1 font-display text-lg font-bold text-foreground">{c.name}</div>
        <div className="mt-1 text-xs text-muted-foreground">{c.network} • {c.speed}</div>
      </div>
      <div className="mt-5 flex items-center justify-between border-t border-border pt-4 text-sm">
        <span className="text-muted-foreground">From</span>
        <span className="font-display font-bold text-foreground">
          {from ? formatMoney(from) : "—"}
        </span>
      </div>
    </Link>
  );
}
