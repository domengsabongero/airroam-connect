import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { CTASection } from "@/components/site/CTASection";
import { FAQAccordion } from "@/components/site/FAQAccordion";
import { Smartphone, Check, X, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/what-is-esim")({
  head: () => ({
    meta: [
      { title: "What is eSIM? — A traveler's guide | Air-Roam" },
      { name: "description", content: "Learn what eSIM is, how it works, and which devices support it. Everything a traveler needs to know." },
    ],
  }),
  component: WhatIsEsim,
});

const compatible = [
  { brand: "Apple", models: "iPhone XS and newer, iPad Pro (2018+), Watch S3+" },
  { brand: "Google", models: "Pixel 3 and newer" },
  { brand: "Samsung", models: "Galaxy S20 series and newer, Fold, Flip, Note20" },
  { brand: "Motorola", models: "Razr 2019+, Edge+ (2020+)" },
  { brand: "Huawei", models: "P40 Pro, Mate 40 Pro" },
  { brand: "Others", models: "Xiaomi 12T Pro, Oppo Find X3 Pro, Sony Xperia 10 IV+" },
];

const faqs = [
  { q: "Is eSIM better than a physical SIM?", a: "For most travelers, yes — no shipping, instant activation, and no risk of losing the card. Physical SIMs still shine for group phones or older devices." },
  { q: "Can I use eSIM and my regular SIM together?", a: "Yes. Modern phones support Dual SIM. Keep your home line for calls and use DRET eSIM for data." },
  { q: "Will installing eSIM affect my main line?", a: "No. It creates a second data-only line. Your main number keeps working exactly as before." },
  { q: "Is eSIM locked to one carrier?", a: "DRET eSIM roams across all our partner networks. You don't need to change providers when you cross a border." },
];

function WhatIsEsim() {
  return (
    <>
      <PageHero
        eyebrow="Learn"
        title={<>What is an eSIM,<br /><span className="text-gradient-sunrise">and why should you care?</span></>}
        body="An eSIM is a digital SIM that lives inside your phone. There's nothing to insert, nothing to lose, and it activates in under a minute — perfect for the way modern travelers move."
        primary={{ label: "Check my device", to: "#compatibility" }}
        secondary={{ label: "Get DRET eSIM", to: "/esim" }}
      />

      <section className="px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="prose prose-lg max-w-none">
            <div className="rounded-3xl border border-border bg-card p-10 shadow-card sm:p-14">
              <h2 className="font-display text-3xl font-bold tracking-tight">The two-minute explainer</h2>
              <div className="mt-6 space-y-4 text-base text-foreground/80">
                <p>An <strong>eSIM</strong> (embedded SIM) is a chip that ships inside your phone. Instead of swapping a plastic card, you install a digital profile — usually by scanning a QR code from your carrier.</p>
                <p>The profile stores your phone number, plan and network credentials, so it works exactly like a traditional SIM. But because it lives in software, you can hold multiple profiles at once and switch between them instantly.</p>
                <p>For travelers, that means one thing: you can land in Rome, tap install, and be online before Border Control — without shipping, roaming, or hunting for a kiosk.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="bg-surface px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center font-display text-4xl font-bold tracking-tight sm:text-5xl">eSIM vs. physical SIM vs. roaming</h2>
          <div className="mt-12 overflow-hidden rounded-2xl border border-border bg-card shadow-card">
            <table className="w-full text-sm">
              <thead className="bg-surface">
                <tr>
                  <th className="p-5 text-left font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Feature</th>
                  <th className="p-5 text-left font-semibold">DRET eSIM</th>
                  <th className="p-5 text-left font-semibold">Travel SIM</th>
                  <th className="p-5 text-left font-semibold text-muted-foreground">Carrier roaming</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  ["Instant activation", true, false, false],
                  ["No shipping", true, false, true],
                  ["190+ countries", true, true, "Limited"],
                  ["Keep home number", true, true, true],
                  ["Predictable pricing", true, true, false],
                  ["No physical card", true, false, true],
                ].map(([label, a, b, c]) => (
                  <tr key={String(label)}>
                    <td className="p-5 font-medium text-foreground">{label as string}</td>
                    <td className="p-5">{cell(a)}</td>
                    <td className="p-5">{cell(b)}</td>
                    <td className="p-5 text-muted-foreground">{cell(c)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Compatibility */}
      <section id="compatibility" className="px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center gap-3">
            <Smartphone className="size-6 text-amber" />
            <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">Is my device compatible?</h2>
          </div>
          <p className="mt-4 max-w-2xl text-muted-foreground">Most flagships from 2019 onward support eSIM. Here's the shortlist:</p>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {compatible.map((c) => (
              <div key={c.brand} className="rounded-2xl border border-border bg-card p-6 shadow-card">
                <div className="font-mono text-[10px] uppercase tracking-widest text-teal">{c.brand}</div>
                <div className="mt-2 text-sm text-foreground/85">{c.models}</div>
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-2xl border border-amber/40 bg-amber/5 p-6 text-sm">
            Not sure? Dial <span className="font-mono font-semibold">*#06#</span> — if you see an EID, you have eSIM.
          </div>
        </div>
      </section>

      <section className="bg-surface px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">Common questions</h2>
          <div className="mt-8"><FAQAccordion items={faqs} /></div>
          <div className="mt-8 text-center">
            <Link to="/esim" className="inline-flex items-center gap-2 rounded-full bg-sunrise px-6 py-3 text-sm font-semibold text-white shadow-glow-amber">
              Try DRET eSIM <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}

function cell(v: boolean | string) {
  if (typeof v === "string") return <span>{v}</span>;
  return v ? <Check className="size-4 text-teal" /> : <X className="size-4 text-muted-foreground/50" />;
}
