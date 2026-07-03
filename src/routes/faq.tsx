import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FAQAccordion } from "@/components/site/FAQAccordion";
import { CTASection } from "@/components/site/CTASection";
import { generalFaqs } from "@/data/content";
import { Search } from "lucide-react";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Answers for travelers | Air-Roam" },
      { name: "description", content: "Answers to the most common questions about DRET eSIM, Travel SIM, and Air-Roam Pocket WiFi." },
    ],
  }),
  component: FaqPage,
});

const categories = [
  {
    title: "Getting started",
    items: generalFaqs.slice(0, 3),
  },
  {
    title: "Billing & refunds",
    items: [
      { q: "How am I billed?", a: "Once per plan. No auto-renewals unless you subscribe. Cards, Apple Pay, Google Pay, and PayPal accepted." },
      { q: "Are there any hidden fees?", a: "None. Price includes taxes and delivery for physical products." },
      { q: "How do refunds work?", a: "Any unused plan is refundable within 30 days — even if activated and your trip was cancelled." },
    ],
  },
  {
    title: "Devices & compatibility",
    items: [
      { q: "Which devices support eSIM?", a: "Every iPhone since XS, Pixel 3+, Galaxy S20+, and most modern flagships. See our compatibility checker for details." },
      { q: "Can I use two eSIMs at once?", a: "Yes — modern iPhones and Pixels store multiple profiles and can run two simultaneously." },
      { q: "Do you support smartwatches?", a: "Apple Watch cellular plans coming Q2. Contact us if you need a workaround today." },
    ],
  },
  {
    title: "Coverage & networks",
    items: [
      { q: "Which network will I connect to?", a: "Air-Roam picks the strongest local partner network automatically. In most countries we have 2–3 partners for failover." },
      { q: "Is 5G supported everywhere?", a: "5G is available in 100+ countries. Where 5G isn't deployed we default to LTE-A / 4G+." },
      { q: "What happens at borders?", a: "DRET eSIM re-registers in seconds when you cross a border. No manual switching required." },
    ],
  },
];

function FaqPage() {
  const [q, setQ] = useState("");

  const filtered = categories.map((c) => ({
    ...c,
    items: c.items.filter((i) => !q || (i.q + i.a).toLowerCase().includes(q.toLowerCase())),
  })).filter((c) => c.items.length > 0);

  return (
    <>
      <section className="relative overflow-hidden pt-32 pb-16 sm:pt-40">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-sky-soft" aria-hidden />
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-amber">FAQ</p>
          <h1 className="mt-4 font-display text-5xl font-bold tracking-tight sm:text-7xl">How can we help?</h1>
          <div className="mx-auto mt-10 flex max-w-xl items-center gap-2 rounded-full border border-border bg-card px-5 py-3 shadow-card">
            <Search className="size-4 text-muted-foreground" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search FAQs…" className="flex-1 bg-transparent text-sm focus:outline-none" />
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-3xl space-y-14">
          {filtered.map((c) => (
            <div key={c.title}>
              <h2 className="font-display text-2xl font-bold tracking-tight">{c.title}</h2>
              <div className="mt-6"><FAQAccordion items={c.items} /></div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="text-center text-sm text-muted-foreground">No results. Try a different keyword.</div>
          )}
        </div>
      </section>

      <CTASection title="Still stuck?" body="Our support team replies in under 10 minutes." primary={{ label: "Contact support", to: "/support" }} secondary={{ label: "Ask the AI", to: "/assistant" }} />
    </>
  );
}
