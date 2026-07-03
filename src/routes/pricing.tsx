import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { plans } from "@/data/plans";
import { PricingCard } from "@/components/site/PricingCard";
import { CTASection } from "@/components/site/CTASection";
import { FAQAccordion } from "@/components/site/FAQAccordion";
import { generalFaqs } from "@/data/content";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — Every plan, transparent | Air-Roam" },
      { name: "description", content: "Transparent pricing across DRET eSIM, Travel SIM, Pocket WiFi, and Enterprise Solutions." },
    ],
  }),
  component: PricingPage,
});

const tabs = [
  { id: "esim", label: "DRET eSIM" },
  { id: "sim", label: "Travel SIM" },
  { id: "wifi", label: "Pocket WiFi" },
  { id: "enterprise", label: "Enterprise" },
] as const;

function PricingPage() {
  const [tab, setTab] = useState<(typeof tabs)[number]["id"]>("esim");
  const filtered = plans.filter((p) => p.product === tab);

  return (
    <>
      <section className="relative overflow-hidden pt-32 pb-16 sm:pt-40">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-sky-soft" aria-hidden />
        <div className="mx-auto max-w-5xl px-6 text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-amber">Pricing</p>
          <h1 className="mt-4 font-display text-5xl font-bold tracking-tight sm:text-7xl">
            One transparent price.<br /><span className="text-gradient-sunrise">In every country.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
            No roaming fees, no exit charges, no surprise overages. Pick a plan or ask our AI assistant for a recommendation.
          </p>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto inline-flex rounded-full border border-border bg-card p-1 shadow-card">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${tab === t.id ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {filtered.map((p) => <PricingCard key={p.id} plan={p} />)}
          </div>

          <div className="mt-16 rounded-3xl border border-border bg-surface p-8 sm:p-12">
            <h3 className="font-display text-2xl font-bold">Every plan includes</h3>
            <div className="mt-6 grid gap-4 text-sm text-muted-foreground sm:grid-cols-2 lg:grid-cols-4">
              {["190+ country coverage", "Hotspot enabled", "24/7 chat support", "30-day refunds", "Multi-carrier failover", "No credit checks", "Rollover on Pro tiers", "Free replacement SIMs"].map((f) => (
                <div key={f}>· {f}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">Pricing FAQ</h2>
          <div className="mt-8"><FAQAccordion items={generalFaqs} /></div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
