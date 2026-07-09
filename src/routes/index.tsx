import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Zap, Globe2, ShieldCheck, Sparkles, Wifi, Smartphone, CreditCard, Building2 } from "lucide-react";
import { featuredCountries } from "@/data/countries";
import { CountryCard } from "@/components/site/CountryCard";
import { Testimonials } from "@/components/site/Testimonials";
import { CTASection } from "@/components/site/CTASection";
import { blogPosts } from "@/data/content";
import { GlobeSection } from "@/components/site/GlobeSection";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Air-Roam — Travel confidently. Stay connected anywhere." },
      { name: "description", content: "Premium eSIM, Travel SIM, and Pocket WiFi in 190+ countries. Instant activation, 5G speeds, zero roaming fees." },
      { property: "og:title", content: "Air-Roam — Travel confidently. Stay connected anywhere." },
      { property: "og:description", content: "Premium travel connectivity for the modern explorer." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

const productCards = [
  { to: "/esim", icon: Smartphone, tag: "Instant", name: "DRET eSIM", desc: "Activate in 60 seconds. Zero shipping. 190+ countries.", accent: "bg-amber/10 text-amber" },
  { to: "/travel-sim", icon: CreditCard, tag: "Classic", name: "Travel SIM", desc: "Physical SIM shipped worldwide. Local number included.", accent: "bg-teal/10 text-teal" },
  { to: "/pocket-wifi", icon: Wifi, tag: "Group", name: "Air-Roam Pocket WiFi", desc: "10 devices. 24-hour battery. 5G everywhere.", accent: "bg-sky/15 text-sky" },
  { to: "/enterprise", icon: Building2, tag: "Business", name: "Enterprise Solutions", desc: "Pooled data, SSO, dedicated CSM for global teams.", accent: "bg-foreground/5 text-foreground" },
] as const;

function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden pt-32 pb-24 sm:pt-40">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-sky-soft" aria-hidden />
        <div className="pointer-events-none absolute inset-x-0 top-[35%] -z-10" aria-hidden>
          <div className="animate-flight relative">
            <div className="flex items-center gap-2">
              <div className="h-px w-[240px] animate-plane-trail" style={{ background: "linear-gradient(90deg, transparent, oklch(0.76 0.16 65 / 0.7), oklch(0.79 0.13 235))" }} />
              <svg className="size-5 -translate-y-px text-amber drop-shadow-[0_0_10px_rgba(245,158,11,0.5)]" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M21 16v-2l-8-5V3.5A1.5 1.5 0 0 0 11.5 2 1.5 1.5 0 0 0 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1L15 22v-1.5L13 19v-5.5l8 2.5z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-5xl px-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 shadow-card">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber opacity-75" />
              <span className="relative inline-flex size-1.5 rounded-full bg-amber" />
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Live in 190+ countries</span>
          </div>

          <h1 className="mt-6 font-display text-5xl font-bold leading-[0.98] tracking-tight text-balance sm:text-7xl lg:text-[5.5rem]">
            Travel confidently.
            <br />
            <span className="text-gradient-sunrise">Stay connected anywhere.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-pretty text-lg text-muted-foreground">
            Instant global data the moment you land. DRET eSIM, Travel SIM, and Air-Roam Pocket WiFi built for the modern explorer — no roaming fees, no compromise.
          </p>

          <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <Link to="/planner" className="group inline-flex items-center justify-center gap-2 rounded-full bg-sunrise px-7 py-4 text-sm font-semibold text-white shadow-glow-amber transition-transform hover:scale-[1.03]">
              Find my plan <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link to="/destinations" className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card px-7 py-4 text-sm font-semibold hover:bg-surface">
              Explore destinations
            </Link>
          </div>

          <div className="mx-auto mt-16 grid max-w-3xl grid-cols-3 gap-8 border-t border-border pt-8">
            {[
              { k: "190+", v: "Countries" },
              { k: "450+", v: "Partner networks" },
              { k: "24ms", v: "Avg latency" },
            ].map((s) => (
              <div key={s.v}>
                <div className="font-display text-3xl font-bold sm:text-4xl">{s.k}</div>
                <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="px-6 py-24 sm:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-amber">Choose your setup</p>
            <h2 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">Four ways to stay connected.</h2>
            <p className="mt-4 text-muted-foreground">One account, one dashboard. Switch between them the moment your trip changes.</p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
            {productCards.map((p) => (
              <Link key={p.to} to={p.to} className="group relative flex flex-col rounded-3xl border border-border bg-card p-7 shadow-card transition-all hover:-translate-y-1.5 hover:shadow-elevated">
                <div className={`grid size-12 place-items-center rounded-2xl ${p.accent}`}>
                  <p.icon className="size-5" />
                </div>
                <div className="mt-6 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{p.tag}</div>
                <div className="mt-1 font-display text-xl font-bold">{p.name}</div>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">{p.desc}</p>
                <div className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-amber">
                  Learn more <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-surface px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-amber">How it works</p>
            <h2 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">From plan to landing, in three steps.</h2>
          </div>
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {[
              { n: "01", icon: Globe2, title: "Pick your destination", body: "Tell us where and how long. Our AI matches you to the right plan and hardware." },
              { n: "02", icon: Zap, title: "Activate instantly", body: "Scan a QR to install DRET eSIM, or receive your Travel SIM / Pocket WiFi before you fly." },
              { n: "03", icon: ShieldCheck, title: "Land, tap, connect", body: "Air-Roam locks onto the strongest local carrier and stays with you across borders." },
            ].map((s) => (
              <div key={s.n} className="rounded-2xl border border-border bg-card p-8 shadow-card">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-muted-foreground">{s.n}</span>
                  <span className="h-px flex-1 bg-border" />
                  <s.icon className="size-5 text-amber" />
                </div>
                <h3 className="mt-6 font-display text-xl font-bold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED DESTINATIONS */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-xl">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-amber">Destinations</p>
              <h2 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">Every corner of the map, already connected.</h2>
            </div>
            <Link to="/destinations" className="group inline-flex items-center gap-2 text-sm font-semibold text-amber">
              Browse all 190+ countries
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {featuredCountries.slice(0, 8).map((c) => <CountryCard key={c.slug} c={c} />)}
          </div>
        </div>
      </section>

      <GlobeSection />

      {/* AI ASSISTANT TEASER */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl border border-border bg-card shadow-elevated">
          <div className="grid gap-0 md:grid-cols-2">
            <div className="p-10 sm:p-14">
              <div className="inline-flex items-center gap-2 rounded-full bg-amber/10 px-3 py-1.5">
                <Sparkles className="size-3.5 text-amber" />
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-amber">AI travel assistant</span>
              </div>
              <h2 className="mt-5 font-display text-3xl font-bold tracking-tight sm:text-4xl">Not sure what you need? Just ask.</h2>
              <p className="mt-3 text-muted-foreground">Describe your trip and our assistant recommends the exact plan, hardware, and backup — no upsells.</p>
              <Link to="/assistant" className="mt-8 inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background">
                Chat with assistant <ArrowRight className="size-4" />
              </Link>
            </div>
            <div className="space-y-3 bg-surface p-8 sm:p-10">
              <div className="rounded-2xl rounded-tl-sm bg-card px-4 py-3 text-sm shadow-card">Iceland for 10 days. I'll drive and tether my laptop.</div>
              <div className="ml-auto max-w-[85%] rounded-2xl rounded-tr-sm bg-sunrise px-4 py-3 text-sm text-white shadow-glow-amber">
                Go with <span className="font-semibold">Air-Roam Pocket WiFi</span> — unlimited 5G, drives with you, tethers laptop and phone at once. Est. $6/day.
              </div>
              <div className="rounded-2xl rounded-tl-sm bg-card px-4 py-3 text-sm shadow-card">Backup if I lose it?</div>
              <div className="ml-auto max-w-[85%] rounded-2xl rounded-tr-sm bg-sunrise px-4 py-3 text-sm text-white shadow-glow-amber">
                Add a free DRET eSIM. If the hotspot fails, it fails over instantly.
              </div>
            </div>
          </div>
        </div>
      </section>

      <Testimonials />

      {/* BLOG */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-amber">Travel tips</p>
              <h2 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">Latest from the flight deck.</h2>
            </div>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {blogPosts.map((p) => (
              <article key={p.slug} className="group rounded-2xl border border-border bg-card p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-elevated">
                <div className="flex items-center gap-3 text-xs">
                  <span className="rounded-full bg-teal/10 px-2.5 py-1 font-mono uppercase tracking-widest text-teal">{p.tag}</span>
                  <span className="text-muted-foreground">{p.readTime}</span>
                </div>
                <h3 className="mt-5 font-display text-xl font-bold group-hover:text-amber">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.excerpt}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
