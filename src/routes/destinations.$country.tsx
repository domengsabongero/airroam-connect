import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { countries } from "@/data/countries";
import { plans } from "@/data/plans";
import { PricingCard } from "@/components/site/PricingCard";
import { CTASection } from "@/components/site/CTASection";
import { FAQAccordion } from "@/components/site/FAQAccordion";
import { generalFaqs } from "@/data/content";
import { ArrowLeft, Signal, Clock, Coins, MapPin, Wifi, Smartphone, CreditCard } from "lucide-react";

export const Route = createFileRoute("/destinations/$country")({
  loader: ({ params }) => {
    const c = countries.find((x) => x.slug === params.country);
    if (!c) throw notFound();
    return { country: c };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.country.name} eSIM & data plans | Air-Roam` },
      { name: "description", content: `Stay connected in ${loaderData?.country.name}. ${loaderData?.country.tagline}` },
    ],
  }),
  component: CountryPage,
});

function CountryPage() {
  const { country: c } = Route.useLoaderData();
  const featuredPlans = plans.filter((p) => ["esim-standard", "esim-pro", "sim-explorer", "wifi-tour"].includes(p.id));
  const related = countries.filter((x) => x.region === c.region && x.slug !== c.slug).slice(0, 4);

  return (
    <>
      <section className="relative overflow-hidden pt-32 pb-16 sm:pt-40">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-sky-soft" aria-hidden />
        <div className="mx-auto max-w-6xl px-6">
          <Link to="/destinations" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="size-4" /> All destinations
          </Link>
          <div className="mt-6 flex flex-col items-start gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="flex items-center gap-4">
                <span className="text-6xl">{c.flag}</span>
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-teal">{c.region}</p>
                  <h1 className="mt-1 font-display text-5xl font-bold tracking-tight sm:text-6xl">{c.name}</h1>
                </div>
              </div>
              <p className="mt-6 max-w-2xl text-lg text-muted-foreground">{c.tagline}</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
              <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Starting at</div>
              <div className="mt-1 font-display text-4xl font-bold text-amber">${c.fromPrice}</div>
              <div className="text-xs text-muted-foreground">per day, all-in</div>
            </div>
          </div>
        </div>
      </section>

      {/* Facts */}
      <section className="px-6 pb-8">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { icon: MapPin, label: "Capital", value: c.capital },
            { icon: Coins, label: "Currency", value: c.currency },
            { icon: Clock, label: "Timezone", value: c.timezone },
            { icon: Signal, label: "Network", value: `${c.network} · ${c.speed}` },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl border border-border bg-card p-5 shadow-card">
              <s.icon className="size-4 text-amber" />
              <div className="mt-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{s.label}</div>
              <div className="mt-1 font-display text-lg font-bold">{s.value}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Available products */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">Available in {c.name}</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              { icon: Smartphone, name: "DRET eSIM", to: "/esim", desc: "Instant install, no shipping." },
              { icon: CreditCard, name: "Travel SIM", to: "/travel-sim", desc: "Physical SIM shipped ahead." },
              { icon: Wifi, name: "Pocket WiFi", to: "/pocket-wifi", desc: "5G hotspot for the whole crew." },
            ].map((p) => (
              <Link key={p.to} to={p.to} className="group rounded-2xl border border-border bg-card p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-elevated">
                <p.icon className="size-6 text-amber" />
                <div className="mt-4 font-display text-lg font-bold group-hover:text-amber">{p.name}</div>
                <div className="mt-1 text-sm text-muted-foreground">{p.desc}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular plans */}
      <section className="bg-surface px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">Popular plans</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {featuredPlans.map((p) => <PricingCard key={p.id} plan={p} />)}
          </div>
        </div>
      </section>

      {/* Tips */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">Travel tips for {c.name}</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {c.tips.map((t, i) => (
              <div key={t} className="rounded-2xl border border-border bg-card p-6 shadow-card">
                <div className="font-mono text-[10px] uppercase tracking-widest text-teal">Tip {i + 1}</div>
                <p className="mt-3 text-sm text-foreground/85">{t}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-surface px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">Frequently asked</h2>
          <div className="mt-8"><FAQAccordion items={generalFaqs.slice(0, 4)} /></div>
        </div>
      </section>

      {/* Related */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">More in {c.region}</h2>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {related.map((r) => (
              <Link key={r.slug} to="/destinations/$country" params={{ country: r.slug }} className="group rounded-2xl border border-border bg-card p-5 text-center shadow-card transition-all hover:-translate-y-1 hover:shadow-elevated">
                <div className="text-3xl">{r.flag}</div>
                <div className="mt-3 text-sm font-semibold group-hover:text-amber">{r.name}</div>
                <div className="mt-1 font-mono text-[10px] text-muted-foreground">from ${r.fromPrice}/day</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
