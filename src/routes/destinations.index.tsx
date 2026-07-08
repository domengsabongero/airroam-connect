import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { countries } from "@/data/countries";
import { CountryCard } from "@/components/site/CountryCard";
import { WorldMap } from "@/components/site/WorldMap";
import { CTASection } from "@/components/site/CTASection";
import { Search, Filter } from "lucide-react";

export const Route = createFileRoute("/destinations/")({
  head: () => ({
    meta: [
      { title: "Destinations — 190+ countries covered | Air-Roam" },
      { name: "description", content: "Explore Air-Roam coverage in 190+ countries. Find pricing, network speeds and travel tips for every destination." },
    ],
  }),
  component: DestinationsIndex,
});

const regions = ["All", "Europe", "Asia Pacific", "Americas", "Middle East", "Africa", "Oceania"] as const;

function DestinationsIndex() {
  const [q, setQ] = useState("");
  const [region, setRegion] = useState<(typeof regions)[number]>("All");

  const filtered = useMemo(() => {
    return countries.filter((c) => {
      const matchQ = !q || c.name.toLowerCase().includes(q.toLowerCase());
      const matchR = region === "All" || c.region === region;
      return matchQ && matchR;
    });
  }, [q, region]);

  const popular = countries.filter((c) => c.popular);

  return (
    <>
      <section className="relative overflow-hidden pt-32 pb-16 sm:pt-40">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-sky-soft" aria-hidden />
        <div className="mx-auto max-w-6xl px-6 text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-amber">Destinations</p>
          <h1 className="mt-4 font-display text-5xl font-bold tracking-tight sm:text-7xl">
            Wherever you're going, <span className="text-gradient-sunrise">we're already there.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
            190+ countries, 450+ partner networks, one plan. Search a destination or browse the map.
          </p>
        </div>
      </section>

      <section className="px-6 pb-16">
        <div className="mx-auto max-w-6xl">
          <WorldMap />
        </div>
      </section>

      {/* Popular */}
      <section className="px-6 pb-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">Popular right now</h2>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {popular.slice(0, 6).map((c) => (
              <Link key={c.slug} to="/destinations/$country" params={{ country: c.slug }} className="group rounded-2xl border border-border bg-card p-5 text-center shadow-card transition-all hover:-translate-y-1 hover:shadow-elevated">
                <div className="text-3xl">{c.flag}</div>
                <div className="mt-3 text-sm font-semibold group-hover:text-amber">{c.name}</div>
                <div className="mt-1 font-mono text-[10px] text-muted-foreground">{(() => { const f = startingFrom(c.slug); return f ? `from ${formatMoney(f)}` : "\u00a0"; })()}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* All */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">All destinations</h2>
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5 shadow-card">
                <Search className="size-4 text-muted-foreground" />
                <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search countries…" className="w-56 bg-transparent text-sm focus:outline-none" />
              </div>
              <div className="flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 shadow-card">
                <Filter className="ml-1 size-3.5 text-muted-foreground" />
                {regions.map((r) => (
                  <button key={r} onClick={() => setRegion(r)} className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${region === r ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`}>{r}</button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {filtered.map((c) => <CountryCard key={c.slug} c={c} />)}
          </div>
          {filtered.length === 0 && (
            <div className="mt-16 text-center text-sm text-muted-foreground">No countries match your search.</div>
          )}
        </div>
      </section>

      <CTASection />
    </>
  );
}
