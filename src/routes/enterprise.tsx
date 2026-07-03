import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { CTASection } from "@/components/site/CTASection";
import { FAQAccordion } from "@/components/site/FAQAccordion";
import { Building2, Users, Lock, BarChart3, Headphones, Cpu, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/enterprise")({
  head: () => ({
    meta: [
      { title: "Enterprise Solutions — Global connectivity for teams | Air-Roam" },
      { name: "description", content: "Pooled data, SSO, dedicated CSM, and custom APNs for global enterprises and IoT fleets." },
    ],
  }),
  component: EnterprisePage,
});

const faqs = [
  { q: "How does pooled data work?", a: "All employees share a monthly data pool. No overages when one traveller uses more than another." },
  { q: "Do you support SSO?", a: "Yes — SAML and SCIM integrations with Okta, Google Workspace, Microsoft Entra, and OneLogin." },
  { q: "Can I get a custom APN?", a: "Global Fleet plans include private APNs, static IPs, and dedicated MPLS routes on request." },
  { q: "What's the SLA?", a: "99.95% availability, 24/7 named support, four-hour incident response globally." },
];

function EnterprisePage() {
  return (
    <>
      <PageHero
        eyebrow="Enterprise Solutions"
        title={<>Global connectivity,<br /><span className="text-gradient-sunrise">team-ready.</span></>}
        body="Pooled data, single sign-on, a dedicated CSM, and custom APNs. Purpose-built for travel-heavy teams and connected fleets."
        primary={{ label: "Talk to sales", to: "/contact" }}
        secondary={{ label: "View pricing", to: "/pricing" }}
        visual={
          <div className="relative mx-auto grid aspect-square max-w-md place-items-center">
            <div className="grid grid-cols-3 gap-3">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="grid size-20 place-items-center rounded-2xl border border-border bg-card shadow-card">
                  <div className="size-2 rounded-full bg-teal shadow-glow-teal" style={{ animation: `pulse-ring 2.4s ${i * 0.2}s infinite ease-out` }} />
                </div>
              ))}
            </div>
          </div>
        }
      />

      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Users, title: "Pooled data plans", body: "Buy data by the team, not the traveler." },
              { icon: Lock, title: "SSO & SCIM", body: "Provision and de-provision instantly." },
              { icon: BarChart3, title: "Usage dashboards", body: "Per-employee, per-country, per-project." },
              { icon: Headphones, title: "Dedicated CSM", body: "Named contact + priority incident channel." },
              { icon: Cpu, title: "IoT & M2M ready", body: "Static IPs, private APNs, custom bearers." },
              { icon: Building2, title: "Global procurement", body: "One MSA covers 190+ countries." },
            ].map((f) => (
              <div key={f.title} className="rounded-2xl border border-border bg-card p-6 shadow-card">
                <span className="grid size-11 place-items-center rounded-xl bg-foreground/5 text-foreground"><f.icon className="size-5" /></span>
                <h3 className="mt-5 font-display text-lg font-bold">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface px-6 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-amber">Trusted by</p>
          <div className="mt-8 grid grid-cols-2 items-center gap-8 opacity-70 sm:grid-cols-4">
            {["Aeronova", "Meridian", "Northstar", "Kestrel Labs"].map((n) => (
              <div key={n} className="font-display text-xl font-bold tracking-tight">{n}</div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-3xl border border-border bg-card p-10 shadow-card sm:p-14">
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">Ready for a scoping call?</h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">Tell us the size of your team, the countries you operate in, and your compliance requirements — we'll build a custom quote within 48 hours.</p>
            <Link to="/contact" className="mt-8 inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background">
              Book scoping call <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-surface px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">Enterprise FAQ</h2>
          <div className="mt-8"><FAQAccordion items={faqs} /></div>
        </div>
      </section>

      <CTASection title="Enterprise-grade global data." body="One contract. Every country. Zero surprises." primary={{ label: "Contact sales", to: "/contact" }} secondary={{ label: "See plans", to: "/pricing" }} />
    </>
  );
}
