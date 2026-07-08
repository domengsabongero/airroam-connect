import type { Plan } from "@/domain/pricing";
import { formatMoney } from "@/lib/format";
import { formatData } from "@/data/plans";
import { Check } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function PricingCard({ plan }: { plan: Plan }) {
  const isCustom = plan.basePrice.amountMinor === 0;
  return (
    <div className={`relative flex flex-col rounded-3xl border p-8 shadow-card transition-all hover:-translate-y-1 ${plan.popular ? "border-amber bg-card shadow-glow-amber" : "border-border bg-card"}`}>
      {plan.popular && (
        <span className="absolute -top-3 left-6 rounded-full bg-sunrise px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-white shadow-glow-amber">
          Most popular
        </span>
      )}
      <div className="text-sm font-mono uppercase tracking-widest text-teal">{plan.name}</div>
      <div className="mt-4 flex items-baseline gap-1.5">
        {isCustom ? (
          <span className="font-display text-3xl font-bold">Custom</span>
        ) : (
          <>
            <span className="font-display text-5xl font-bold">{formatMoney(plan.basePrice)}</span>
            <span className="text-sm text-muted-foreground">/ {plan.validityDays}d</span>
          </>
        )}
      </div>
      <div className="mt-2 text-sm text-muted-foreground">{formatData(plan.dataMB)} data</div>

      <ul className="mt-6 flex-1 space-y-3 border-t border-border pt-6 text-sm">
        {plan.features.map((f: string) => (
          <li key={f} className="flex items-start gap-2.5">
            <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-teal/15 text-teal">
              <Check className="size-3" />
            </span>
            <span className="text-foreground/80">{f}</span>
          </li>
        ))}
      </ul>

      <Link
        to="/planner"
        className={`mt-8 inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition-transform hover:scale-[1.02] ${plan.popular ? "bg-foreground text-background" : "border border-border bg-background text-foreground hover:bg-surface"}`}
      >
        {isCustom ? "Talk to sales" : "Choose plan"}
      </Link>
    </div>
  );
}
