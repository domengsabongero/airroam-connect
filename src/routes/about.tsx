import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { CTASection } from "@/components/site/CTASection";
import { Compass, Heart, Leaf, Shield } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Why Air-Roam exists" },
      { name: "description", content: "The team, the mission, and the story behind Air-Roam." },
    ],
  }),
  component: About,
});

const values = [
  { icon: Compass, title: "Curiosity first", body: "We build for people who want to see more of the world, not less." },
  { icon: Heart, title: "Traveler-obsessed", body: "Every roadmap decision is ranked against 'does this make a trip better?'" },
  { icon: Shield, title: "Radical transparency", body: "No hidden fees, no locked-in contracts, refunds without arguments." },
  { icon: Leaf, title: "Lightweight footprint", body: "Digital-first eSIMs eliminate plastic and shipping for millions of travellers." },
];

function About() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title={<>Built by travelers,<br /><span className="text-gradient-sunrise">for travelers.</span></>}
        body="Air-Roam started in a Lisbon co-working space in 2022, when three friends spent €400 on roaming fees in a single week. We shipped the first DRET eSIM six months later. Today we serve travelers in every UN-recognized country on earth."
      />

      {/* Story */}
      <section className="px-6 py-20">
        <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-2">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-amber">Our story</p>
            <h2 className="mt-3 font-display text-4xl font-bold tracking-tight">From frustration to a network of 450 carriers.</h2>
            <div className="mt-6 space-y-4 text-foreground/80">
              <p>Travel used to mean airport SIM kiosks, printed activation codes, and $10 megabytes on your home carrier's roaming plan.</p>
              <p>We knew there was a better way. So we spent two years wiring together direct agreements with the world's best mobile networks — then built software that hides all of it behind a QR code.</p>
              <p>Air-Roam is now the connectivity layer for over 900,000 travelers, from weekend explorers to full-time nomads and Fortune 500 fleets.</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { k: "900K+", v: "Travelers connected" },
              { k: "190+", v: "Countries" },
              { k: "450", v: "Carrier agreements" },
              { k: "4.9★", v: "Average review" },
            ].map((s) => (
              <div key={s.v} className="rounded-2xl border border-border bg-card p-6 shadow-card">
                <div className="font-display text-3xl font-bold text-amber">{s.k}</div>
                <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-surface px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">What we believe.</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div key={v.title} className="rounded-2xl border border-border bg-card p-6 shadow-card">
                <v.icon className="size-5 text-amber" />
                <h3 className="mt-4 font-display text-lg font-bold">{v.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team teaser */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">The people behind the signal.</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              { name: "Ines Fontes", role: "Co-founder & CEO", city: "Lisbon" },
              { name: "Kenji Aoki", role: "Co-founder & CTO", city: "Tokyo" },
              { name: "Nour El-Sayed", role: "Head of Network", city: "Dubai" },
            ].map((p) => (
              <div key={p.name} className="rounded-2xl border border-border bg-card p-6 shadow-card">
                <div className="grid size-14 place-items-center rounded-2xl bg-sunrise font-mono text-sm font-bold text-white">
                  {p.name.split(" ").map((w) => w[0]).join("")}
                </div>
                <div className="mt-5 font-display text-lg font-bold">{p.name}</div>
                <div className="text-sm text-muted-foreground">{p.role} · {p.city}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection title="Come build with us." body="We're hiring across engineering, ops, and support." primary={{ label: "Open roles", to: "/contact" }} secondary={{ label: "Read the FAQ", to: "/faq" }} />
    </>
  );
}
