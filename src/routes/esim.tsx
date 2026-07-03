import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { PricingCard } from "@/components/site/PricingCard";
import { plans } from "@/data/plans";
import { CTASection } from "@/components/site/CTASection";
import { FAQAccordion } from "@/components/site/FAQAccordion";
import { generalFaqs } from "@/data/content";
import { Zap, Globe2, ShieldCheck, Smartphone, Repeat, Layers, QrCode } from "lucide-react";

export const Route = createFileRoute("/esim")({
  head: () => ({
    meta: [
      { title: "DRET eSIM — Instant global data | Air-Roam" },
      { name: "description", content: "DRET eSIM: install by QR in 60 seconds. 190+ countries, 5G speeds, hotspot enabled." },
    ],
  }),
  component: EsimPage,
});

function EsimPage() {
  const esimPlans = plans.filter((p) => p.product === "esim");

  return (
    <>
      <PageHero
        eyebrow="DRET eSIM"
        title={<>Instant global data.<br /><span className="text-gradient-sunrise">Zero shipping.</span></>}
        body="Scan one QR code and land connected. DRET eSIM covers 190+ countries, hops between carriers automatically, and never touches your main phone number."
        primary={{ label: "See plans", to: "/pricing" }}
        secondary={{ label: "Check compatibility", to: "/what-is-esim" }}
        visual={
          <div className="relative mx-auto aspect-square max-w-md">
            <div className="absolute inset-6 rounded-[3rem] bg-sunrise shadow-glow-amber" />
            <div className="absolute inset-8 rounded-[2.5rem] bg-card shadow-elevated" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="grid size-40 place-items-center rounded-3xl bg-foreground p-6 shadow-elevated">
                <QrCode className="size-full text-background" strokeWidth={1.5} />
              </div>
            </div>
            <div className="absolute -right-4 top-10 rounded-2xl border border-border bg-card p-3 shadow-card animate-float-slow">
              <div className="font-mono text-[10px] uppercase tracking-widest text-teal">Activated</div>
              <div className="mt-0.5 text-xs font-bold">Tokyo · 5G</div>
            </div>
            <div className="absolute -left-4 bottom-12 rounded-2xl border border-border bg-card p-3 shadow-card animate-float-slow" style={{ animationDelay: "1.5s" }}>
              <div className="font-mono text-[10px] uppercase tracking-widest text-teal">Latency</div>
              <div className="mt-0.5 text-xs font-bold">18ms</div>
            </div>
          </div>
        }
      />

      {/* Features */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-amber">Why DRET eSIM</p>
            <h2 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">Built for the way you actually travel.</h2>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Zap, title: "60-second activation", body: "Scan the QR from your email — DRET is live before takeoff." },
              { icon: Globe2, title: "190+ countries", body: "One profile roams across every partner network we operate." },
              { icon: Repeat, title: "Auto carrier switching", body: "Silent failover between carriers keeps you online at the border." },
              { icon: ShieldCheck, title: "Private by default", body: "No data logging, DNS-over-HTTPS, and optional VPN." },
              { icon: Smartphone, title: "Keep your number", body: "Runs alongside your primary line. Calls & iMessage untouched." },
              { icon: Layers, title: "Stacks with SIM & WiFi", body: "Use DRET as a fallback for Pocket WiFi trips." },
            ].map((f) => (
              <div key={f.title} className="rounded-2xl border border-border bg-card p-6 shadow-card">
                <span className="grid size-11 place-items-center rounded-xl bg-amber/10 text-amber"><f.icon className="size-5" /></span>
                <h3 className="mt-5 font-display text-lg font-bold">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-surface px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">Three steps to global data.</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { n: "01", t: "Pick your plan", b: "Choose data by trip length — from a weekend to a year." },
              { n: "02", t: "Scan the QR", b: "Install DRET eSIM as a secondary line, no reboot required." },
              { n: "03", t: "Land & connect", b: "DRET locks onto the fastest local network automatically." },
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

      {/* Plans */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">DRET eSIM plans</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {esimPlans.map((p) => <PricingCard key={p.id} plan={p} />)}
          </div>
        </div>
      </section>

      <section className="bg-surface px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">DRET eSIM FAQ</h2>
          <div className="mt-8"><FAQAccordion items={generalFaqs} /></div>
        </div>
      </section>

      <CTASection title="Land connected. Every trip." body="Add DRET eSIM in under a minute." />
    </>
  );
}
