import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { CTASection } from "@/components/site/CTASection";
import { FAQAccordion } from "@/components/site/FAQAccordion";
import { DollarSign, Users, TrendingUp, Zap, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/affiliates")({
  head: () => ({
    meta: [
      { title: "Affiliates — Earn with Air-Roam" },
      { name: "description", content: "Refer travelers, earn recurring commission. Industry-leading affiliate program for creators and travel businesses." },
    ],
  }),
  component: Affiliates,
});

const faqs = [
  { q: "How much can I earn?", a: "40% of first-order revenue, 15% recurring on renewals for 12 months. Top affiliates earn $5K+/month." },
  { q: "When do I get paid?", a: "Monthly payouts on the 5th, via bank transfer, PayPal, or Wise. $50 minimum." },
  { q: "Do I need an audience?", a: "No minimum. Creators, travel bloggers, hotels, tour operators — anyone with an audience can join." },
  { q: "What's the cookie window?", a: "60-day tracking cookie. Cross-device attribution included." },
];

function Affiliates() {
  return (
    <>
      <PageHero
        eyebrow="Affiliates"
        title={<>Refer travelers.<br /><span className="text-gradient-sunrise">Earn recurring commission.</span></>}
        body="Join 4,000+ creators, travel bloggers, tour operators, and hotels earning 40% commission with Air-Roam."
        primary={{ label: "Apply now", to: "/contact" }}
        secondary={{ label: "How it works", to: "#how-it-works" }}
      />

      <section className="px-6 py-20">
        <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-4">
          {[
            { icon: DollarSign, k: "40%", v: "First order" },
            { icon: TrendingUp, k: "15%", v: "Recurring 12mo" },
            { icon: Users, k: "60d", v: "Cookie window" },
            { icon: Zap, k: "$5K+", v: "Top monthly earn" },
          ].map((s) => (
            <div key={s.v} className="rounded-2xl border border-border bg-card p-6 shadow-card">
              <s.icon className="size-5 text-amber" />
              <div className="mt-4 font-display text-3xl font-bold">{s.k}</div>
              <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{s.v}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="how-it-works" className="bg-surface px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">How it works</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              { n: "01", t: "Apply in 2 minutes", b: "Quick form, no minimums, approval in 48 hours." },
              { n: "02", t: "Share your link", b: "Custom dashboards, banners, deep links to every product page." },
              { n: "03", t: "Get paid monthly", b: "Payouts on the 5th. Track revenue in real-time." },
            ].map((s) => (
              <div key={s.n} className="rounded-2xl border border-border bg-card p-8 shadow-card">
                <div className="font-mono text-xs text-muted-foreground">{s.n}</div>
                <h3 className="mt-4 font-display text-xl font-bold">{s.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">Built for every affiliate</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Content creators", body: "YouTube, Instagram, TikTok travel creators." },
              { title: "Travel bloggers", body: "SEO-first content and gear guides." },
              { title: "Tour operators", body: "Include Air-Roam in itinerary bundles." },
              { title: "Hotels & hostels", body: "Add a card at check-in — earn on every guest." },
            ].map((c) => (
              <div key={c.title} className="rounded-2xl border border-border bg-card p-6 shadow-card">
                <div className="font-display text-lg font-bold">{c.title}</div>
                <div className="mt-2 text-sm text-muted-foreground">{c.body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">Affiliate FAQ</h2>
          <div className="mt-8"><FAQAccordion items={faqs} /></div>
          <div className="mt-8 text-center">
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background">
              Apply to the program <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      <CTASection title="Turn your audience into income." body="Apply to the Air-Roam affiliate program today." primary={{ label: "Apply now", to: "/contact" }} secondary={{ label: "Talk to us", to: "/support" }} />
    </>
  );
}
