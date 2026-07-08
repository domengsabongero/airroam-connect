import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { PricingCard } from "@/components/site/PricingCard";
import { plans } from "@/data/plans";
import { CTASection } from "@/components/site/CTASection";
import { FAQAccordion } from "@/components/site/FAQAccordion";
import { CreditCard, Truck, Phone, Signal, Scissors, Globe2 } from "lucide-react";

export const Route = createFileRoute("/travel-sim")({
  head: () => ({
    meta: [
      { title: "Travel SIM — Physical SIM shipped worldwide | Air-Roam" },
      { name: "description", content: "Travel SIM cards shipped free worldwide. Local number, multi-carrier failover, 5G ready." },
    ],
  }),
  component: SimPage,
});

const simFaqs = [
  { q: "How fast is shipping?", a: "Free worldwide courier, tracked. 2–4 business days to most cities. Rush option available." },
  { q: "Will it fit my phone?", a: "Every Travel SIM is 3-in-1: nano, micro and standard punch-outs in one card." },
  { q: "Do I get a local number?", a: "Yes. Every Travel SIM includes a portable local number you can keep on future trips." },
  { q: "What if I lose my SIM?", a: "We ship a free replacement to your next hotel. Meanwhile, use the backup DRET eSIM." },
];

function SimPage() {
  const simPlans = plans.filter((p) => p.product === "travel-sim");

  return (
    <>
      <PageHero
        eyebrow="Travel SIM"
        title={<>The physical SIM,<br /><span className="text-gradient-sunrise">reimagined for travel.</span></>}
        body="Prefer a real SIM? Ours ships worldwide, includes a local number, and jumps between carriers automatically."
        primary={{ label: "See plans", to: "/pricing" }}
        secondary={{ label: "Talk to us", to: "/contact" }}
        visual={
          <div className="relative mx-auto aspect-square max-w-md">
            <div className="absolute inset-8 rotate-6 rounded-3xl bg-horizon shadow-elevated" />
            <div className="absolute inset-8 -rotate-3 rounded-3xl bg-card shadow-card" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-64 rounded-2xl bg-sunrise p-6 shadow-glow-amber">
                <div className="flex items-center justify-between">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-white/80">Air-Roam</div>
                  <div className="grid size-6 place-items-center rounded-md bg-white/20"><Signal className="size-3 text-white" /></div>
                </div>
                <div className="mt-6 h-10 w-14 rounded-md bg-yellow-200/80 shadow-inner" />
                <div className="mt-6 font-mono text-[11px] uppercase tracking-widest text-white/85">Travel SIM · 3-in-1</div>
                <div className="mt-1 font-display text-lg font-bold text-white">+44 7700 900123</div>
              </div>
            </div>
          </div>
        }
      />

      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-amber">Why Travel SIM</p>
            <h2 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">A better physical SIM for globetrotters.</h2>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              { icon: Truck, title: "Free worldwide shipping", body: "Tracked courier to any address in 2–4 days." },
              { icon: Scissors, title: "3-in-1 punch-out", body: "Fits nano, micro and standard SIM trays." },
              { icon: Phone, title: "Local number included", body: "Portable — keep it across trips." },
              { icon: Signal, title: "Multi-carrier failover", body: "Two carriers per country, silent switching." },
              { icon: Globe2, title: "180+ country coverage", body: "One SIM works from London to Lima." },
              { icon: CreditCard, title: "Top up from anywhere", body: "Recharge in-app with any card." },
            ].map((f) => (
              <div key={f.title} className="rounded-2xl border border-border bg-card p-6 shadow-card">
                <span className="grid size-11 place-items-center rounded-xl bg-teal/10 text-teal"><f.icon className="size-5" /></span>
                <h3 className="mt-5 font-display text-lg font-bold">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">Travel SIM plans</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {simPlans.map((p) => <PricingCard key={p.id} plan={p} />)}
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">Travel SIM FAQ</h2>
          <div className="mt-8"><FAQAccordion items={simFaqs} /></div>
        </div>
      </section>

      <CTASection title="Order your Travel SIM today." body="Free shipping, local number, zero fuss." />
    </>
  );
}
