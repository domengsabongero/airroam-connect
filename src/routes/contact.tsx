import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, MessageCircle, MapPin, Send } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Talk to Air-Roam" },
      { name: "description", content: "Get in touch with sales, support, press, or partnerships." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <section className="relative overflow-hidden pt-32 pb-16 sm:pt-40">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-sky-soft" aria-hidden />
        <div className="mx-auto max-w-5xl px-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-amber">Contact</p>
          <h1 className="mt-4 font-display text-5xl font-bold tracking-tight sm:text-7xl">Let's talk.</h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">Sales, support, partnerships, press — we read every message.</p>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.2fr_1fr]">
          {/* Form */}
          <div className="rounded-3xl border border-border bg-card p-8 shadow-card sm:p-10">
            {submitted ? (
              <div className="py-16 text-center">
                <div className="mx-auto grid size-14 place-items-center rounded-full bg-teal/10 text-teal">
                  <Send className="size-6" />
                </div>
                <h2 className="mt-6 font-display text-2xl font-bold">Message received.</h2>
                <p className="mt-2 text-sm text-muted-foreground">We'll reply within a few hours.</p>
                <button onClick={() => setSubmitted(false)} className="mt-6 text-sm font-semibold text-amber">Send another</button>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Name" name="name" required />
                  <Field label="Email" name="email" type="email" required />
                </div>
                <div>
                  <label className="mb-2 block text-xs font-mono uppercase tracking-widest text-muted-foreground">Reason</label>
                  <select className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm focus:border-amber focus:outline-none">
                    <option>Sales inquiry</option>
                    <option>Support</option>
                    <option>Enterprise Solutions</option>
                    <option>Partnerships</option>
                    <option>Press</option>
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-xs font-mono uppercase tracking-widest text-muted-foreground">Message</label>
                  <textarea rows={5} required className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm focus:border-amber focus:outline-none" />
                </div>
                <button className="inline-flex items-center gap-2 rounded-full bg-sunrise px-6 py-3 text-sm font-semibold text-white shadow-glow-amber">
                  Send message <Send className="size-4" />
                </button>
              </form>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {[
              { icon: MessageCircle, title: "Live chat", body: "24/7 in-app support", cta: "Open chat" },
              { icon: Mail, title: "Email", body: "hello@air-roam.com", cta: "mailto:hello@air-roam.com" },
              { icon: MapPin, title: "HQ", body: "Rua da Prata 80, Lisbon" },
            ].map((c) => (
              <div key={c.title} className="rounded-2xl border border-border bg-card p-6 shadow-card">
                <c.icon className="size-5 text-amber" />
                <div className="mt-4 font-display font-bold">{c.title}</div>
                <div className="mt-1 text-sm text-muted-foreground">{c.body}</div>
              </div>
            ))}
            <div className="rounded-2xl border border-border bg-surface p-6 text-sm">
              <div className="font-mono text-[10px] uppercase tracking-widest text-teal">Global offices</div>
              <ul className="mt-3 space-y-1.5 text-muted-foreground">
                <li>Lisbon · London · Singapore · Austin</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Field({ label, name, type = "text", required }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-xs font-mono uppercase tracking-widest text-muted-foreground">{label}</label>
      <input id={name} name={name} type={type} required={required} className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm focus:border-amber focus:outline-none" />
    </div>
  );
}
