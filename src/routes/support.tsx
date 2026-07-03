import { createFileRoute, Link } from "@tanstack/react-router";
import { MessageCircle, Mail, BookOpen, Sparkles, Rocket, LifeBuoy, Wifi } from "lucide-react";
import { CTASection } from "@/components/site/CTASection";

export const Route = createFileRoute("/support")({
  head: () => ({
    meta: [
      { title: "Support — Help when you need it | Air-Roam" },
      { name: "description", content: "Get help fast. 24/7 chat, email, and a full self-serve knowledge base." },
    ],
  }),
  component: SupportPage,
});

const topics = [
  { icon: Rocket, title: "Installation & activation", body: "QR codes, iOS & Android walkthroughs, common install issues." },
  { icon: Wifi, title: "Connectivity issues", body: "No signal? Slow speed? Fixes for every carrier in every region." },
  { icon: LifeBuoy, title: "Refunds & cancellations", body: "How to cancel a plan, request a refund, or return hardware." },
  { icon: BookOpen, title: "Device guides", body: "Setup for iPhone, Pixel, Galaxy, Huawei, and travel routers." },
];

function SupportPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-32 pb-16 sm:pt-40">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-sky-soft" aria-hidden />
        <div className="mx-auto max-w-5xl px-6 text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-amber">Support</p>
          <h1 className="mt-4 font-display text-5xl font-bold tracking-tight sm:text-7xl">
            Help, right when you land.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
            Live agents 24/7. Median first-reply time: under 3 minutes.
          </p>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-3">
          {[
            { icon: MessageCircle, title: "Live chat", body: "Fastest response. Available 24/7 in 12 languages.", cta: "Start chat", to: "/contact" },
            { icon: Sparkles, title: "AI assistant", body: "Instant answers to product, plan and coverage questions.", cta: "Ask the AI", to: "/assistant" },
            { icon: Mail, title: "Email", body: "hello@air-roam.com — average reply time 42 minutes.", cta: "Send email", to: "/contact" },
          ].map((c) => (
            <div key={c.title} className="rounded-2xl border border-border bg-card p-8 shadow-card">
              <span className="grid size-11 place-items-center rounded-xl bg-amber/10 text-amber"><c.icon className="size-5" /></span>
              <h3 className="mt-5 font-display text-xl font-bold">{c.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{c.body}</p>
              <Link to={c.to} className="mt-6 inline-flex text-sm font-semibold text-amber">{c.cta} →</Link>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-surface px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">Browse by topic</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {topics.map((t) => (
              <div key={t.title} className="rounded-2xl border border-border bg-card p-6 shadow-card">
                <t.icon className="size-5 text-teal" />
                <h3 className="mt-5 font-display text-base font-bold">{t.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{t.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-4xl rounded-3xl border border-border bg-card p-10 text-center shadow-card sm:p-14">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-semibold text-emerald-700">
            <span className="size-1.5 rounded-full bg-emerald-500" /> All systems operational
          </div>
          <h2 className="mt-5 font-display text-3xl font-bold tracking-tight sm:text-4xl">System status</h2>
          <div className="mt-8 grid grid-cols-2 gap-4 text-left sm:grid-cols-4">
            {["Global core", "eSIM issuance", "Support chat", "Payments"].map((s) => (
              <div key={s} className="rounded-xl border border-border bg-surface p-4">
                <div className="text-xs text-muted-foreground">{s}</div>
                <div className="mt-2 flex items-center gap-2 text-sm font-semibold text-emerald-600">
                  <span className="size-1.5 rounded-full bg-emerald-500" /> Operational
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection title="Can't find what you need?" body="Our humans are ready around the clock." primary={{ label: "Contact us", to: "/contact" }} secondary={{ label: "Browse FAQ", to: "/faq" }} />
    </>
  );
}
