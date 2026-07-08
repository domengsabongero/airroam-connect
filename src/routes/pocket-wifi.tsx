import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { PricingCard } from "@/components/site/PricingCard";
import { plans } from "@/data/plans";
import { CTASection } from "@/components/site/CTASection";
import { FAQAccordion } from "@/components/site/FAQAccordion";
import { Wifi, Battery, Users, ShieldCheck, Truck, Signal } from "lucide-react";

export const Route = createFileRoute("/pocket-wifi")({
  head: () => ({
    meta: [
      { title: "Air-Roam Pocket WiFi — 5G hotspot for 10 devices | Air-Roam" },
      { name: "description", content: "5G pocket WiFi router with 24-hour battery, VPN built-in, shipped worldwide." },
    ],
  }),
  component: WifiPage,
});

const wifiFaqs = [
  { q: "How many devices can connect?", a: "Up to 10 devices simultaneously — enough for a full family or small crew." },
  { q: "How long does the battery last?", a: "Up to 24 hours of active use. A 90-minute charge gets you back to 100%." },
  { q: "How is it delivered?", a: "Free courier both ways. Pick up at your hotel or home, drop into any pre-paid mailer." },
  { q: "Does it work in tunnels or on planes?", a: "It uses the same 5G/4G networks as your phone. On planes, use it on the ground before/after your flight." },
];

function WifiPage() {
  const wifi = plans.filter((p) => p.product === "pocket-wifi");

  return (
    <>
      <PageHero
        eyebrow="Air-Roam Pocket WiFi"
        title={<>One device.<br /><span className="text-gradient-sunrise">Ten travelers online.</span></>}
        body="A palm-sized 5G router with 24-hour battery and a global data plan built in. Perfect for families, film crews, and remote work weeks."
        primary={{ label: "See plans", to: "/pricing" }}
        secondary={{ label: "Read specs", to: "/what-is-esim" }}
        visual={
          <div className="relative mx-auto aspect-square max-w-md">
            <div className="absolute inset-10 rounded-full bg-teal/15 blur-3xl" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-52 rounded-[2rem] bg-foreground p-6 shadow-elevated">
                <div className="mx-auto grid size-16 place-items-center rounded-2xl bg-sunrise shadow-glow-amber">
                  <Wifi className="size-8 text-white" />
                </div>
                <div className="mt-6 text-center font-display text-lg font-bold text-background">Air-Roam</div>
                <div className="mt-1 text-center font-mono text-[10px] uppercase tracking-widest text-background/60">Pocket WiFi · 5G</div>
                <div className="mt-4 flex justify-between text-[10px] font-mono text-background/70">
                  <span>10 devices</span><span>92%</span>
                </div>
              </div>
              <div className="absolute -inset-6 animate-spin-slow rounded-full border border-dashed border-teal/40" />
            </div>
          </div>
        }
      />

      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-5 md:grid-cols-3">
            {[
              { icon: Users, title: "10 devices at once", body: "Phones, laptops, cameras — everyone stays online." },
              { icon: Battery, title: "24-hour battery", body: "Full day of streaming, tethering, and shooting." },
              { icon: Signal, title: "5G worldwide", body: "Priority networks in 100+ countries with 4G+ fallback." },
              { icon: ShieldCheck, title: "VPN built-in", body: "Traffic encrypted end-to-end. Ideal for work trips." },
              { icon: Truck, title: "Free two-way courier", body: "Hotel pickup, prepaid return, tracked both ways." },
              { icon: Wifi, title: "Unlimited hotspot", body: "No tethering limits on Tour and Nomad plans." },
            ].map((f) => (
              <div key={f.title} className="rounded-2xl border border-border bg-card p-6 shadow-card">
                <span className="grid size-11 place-items-center rounded-xl bg-sky/15 text-sky"><f.icon className="size-5" /></span>
                <h3 className="mt-5 font-display text-lg font-bold">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">Pocket WiFi plans</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {wifi.map((p) => <PricingCard key={p.id} plan={p} />)}
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">Pocket WiFi FAQ</h2>
          <div className="mt-8"><FAQAccordion items={wifiFaqs} /></div>
        </div>
      </section>

      <CTASection title="Bring the whole team online." body="Book Air-Roam Pocket WiFi for your next trip." />
    </>
  );
}
