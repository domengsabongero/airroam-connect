import { useState } from "react";
import { countries } from "@/data/countries";
import { plans, formatData } from "@/data/plans";
import { formatMoney } from "@/lib/format";
import { ArrowRight, ArrowLeft, Check, Sparkles } from "lucide-react";
import { Link } from "@tanstack/react-router";

type Step = 0 | 1 | 2 | 3 | 4 | 5;

type Answers = {
  country: string;
  days: number;
  travelers: number;
  productPref: "any" | "esim" | "travel-sim" | "pocket-wifi";
  usage: "light" | "standard" | "heavy";
};

const initial: Answers = { country: "", days: 7, travelers: 1, productPref: "any", usage: "standard" };

export function PlannerWizard() {
  const [step, setStep] = useState<Step>(0);
  const [a, setA] = useState<Answers>(initial);

  const totalSteps = 5;

  function recommend() {
    let candidates = plans.filter((p) => p.product !== "enterprise");
    if (a.productPref !== "any") candidates = candidates.filter((p) => p.product === a.productPref);
    if (a.travelers >= 3 && a.productPref === "any") candidates = plans.filter((p) => p.product === "pocket-wifi");
    const dataScoreGB = a.usage === "light" ? 3 : a.usage === "standard" ? 10 : 30;
    const scored = candidates.map((p) => {
      const dataGB = p.dataMB === "unlimited" ? 100 : p.dataMB / 1024;
      return { p, score: Math.abs(p.validityDays - a.days) + Math.abs(dataGB - dataScoreGB) };
    });
    scored.sort((x, y) => x.score - y.score);
    return scored.slice(0, 3).map((s) => s.p);
  }

  return (
    <div className="mx-auto max-w-3xl">
      {/* Progress */}
      <div className="mb-8 flex items-center gap-2">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-colors ${i < step ? "bg-amber" : i === step ? "bg-sunrise" : "bg-border"}`}
          />
        ))}
      </div>

      <div className="rounded-3xl border border-border bg-card p-8 shadow-elevated sm:p-12">
        {step === 0 && (
          <div className="animate-fade-up">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-teal">Step 1 of 5</p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">Where are you going?</h2>
            <input
              autoFocus
              list="countries"
              value={a.country}
              onChange={(e) => setA({ ...a, country: e.target.value })}
              placeholder="Start typing a country..."
              className="mt-6 w-full rounded-2xl border border-border bg-surface px-5 py-4 text-base font-medium focus:border-amber focus:outline-none"
            />
            <datalist id="countries">
              {countries.map((c) => <option key={c.slug} value={c.name} />)}
            </datalist>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Japan", "Italy", "United States", "Thailand", "United Kingdom", "UAE"].map((s) => (
                <button key={s} onClick={() => setA({ ...a, country: s })} className="rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground hover:border-amber hover:text-foreground">{s}</button>
              ))}
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="animate-fade-up">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-teal">Step 2 of 5</p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">How many days?</h2>
            <div className="mt-8">
              <input
                type="range"
                min="1"
                max="60"
                value={a.days}
                onChange={(e) => setA({ ...a, days: Number(e.target.value) })}
                className="w-full accent-amber"
              />
              <div className="mt-3 flex items-baseline gap-2">
                <span className="font-display text-5xl font-bold text-amber">{a.days}</span>
                <span className="text-muted-foreground">day{a.days === 1 ? "" : "s"}</span>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="animate-fade-up">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-teal">Step 3 of 5</p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">How many travelers?</h2>
            <div className="mt-8 flex flex-wrap gap-3">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <button key={n} onClick={() => setA({ ...a, travelers: n })} className={`grid size-16 place-items-center rounded-2xl border-2 font-display text-xl font-bold transition-all ${a.travelers === n ? "border-amber bg-amber/10 text-amber" : "border-border hover:border-amber/50"}`}>
                  {n}{n === 6 ? "+" : ""}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="animate-fade-up">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-teal">Step 4 of 5</p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">Product preference?</h2>
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {[
                { id: "any" as const, name: "Let us recommend", desc: "We'll pick what fits" },
                { id: "esim" as const, name: "DRET eSIM", desc: "Instant, no shipping" },
                { id: "travel-sim" as const, name: "Travel SIM", desc: "Physical card" },
                { id: "pocket-wifi" as const, name: "Air-Roam Pocket WiFi", desc: "Best for groups" },
              ].map((o) => (
                <button key={o.id} onClick={() => setA({ ...a, productPref: o.id })} className={`rounded-2xl border-2 p-5 text-left transition-all ${a.productPref === o.id ? "border-amber bg-amber/5" : "border-border hover:border-amber/50"}`}>
                  <div className="font-semibold">{o.name}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{o.desc}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="animate-fade-up">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-teal">Step 5 of 5</p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">How much data will you use?</h2>
            <div className="mt-6 grid gap-3">
              {[
                { id: "light" as const, name: "Light", desc: "Maps, chat, occasional browsing (~1 GB/week)" },
                { id: "standard" as const, name: "Standard", desc: "Social, video calls, streaming (~10 GB/week)" },
                { id: "heavy" as const, name: "Heavy", desc: "Tethering, video, remote work (~30 GB/week)" },
              ].map((o) => (
                <button key={o.id} onClick={() => setA({ ...a, usage: o.id })} className={`rounded-2xl border-2 p-5 text-left transition-all ${a.usage === o.id ? "border-amber bg-amber/5" : "border-border hover:border-amber/50"}`}>
                  <div className="font-semibold">{o.name}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{o.desc}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="animate-fade-up">
            <div className="flex items-center gap-2">
              <Sparkles className="size-5 text-amber" />
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-amber">Your recommendations</p>
            </div>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Perfect matches for {a.country || "your trip"}.
            </h2>
            <p className="mt-2 text-muted-foreground">Based on {a.days} days, {a.travelers} traveler{a.travelers > 1 ? "s" : ""}, {a.usage} usage.</p>

            <div className="mt-8 grid gap-4">
              {recommend().map((p, i) => (
                <div key={p.id} className={`rounded-2xl border p-5 ${i === 0 ? "border-amber bg-amber/5 shadow-glow-amber" : "border-border"}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-mono text-[10px] uppercase tracking-widest text-teal">{p.product === "esim" ? "DRET eSIM" : p.product === "pocket-wifi" ? "Air-Roam Pocket WiFi" : p.product === "travel-sim" ? "Travel SIM" : "Enterprise"}</div>
                      <div className="mt-1 font-display text-xl font-bold">{p.name} — {formatData(p.dataMB)}</div>
                      <div className="mt-1 text-xs text-muted-foreground">{p.validityDays} days validity</div>
                    </div>
                    <div className="text-right">
                      <div className="font-display text-2xl font-bold">{formatMoney(p.basePrice)}</div>
                      {i === 0 && <div className="mt-1 rounded-full bg-amber px-2 py-0.5 text-[10px] font-semibold text-white">Best fit</div>}
                    </div>
                  </div>
                  <ul className="mt-4 grid gap-1.5 text-xs text-muted-foreground sm:grid-cols-2">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-center gap-1.5"><Check className="size-3 text-teal" />{f}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <button onClick={() => { setStep(0); setA(initial); }} className="rounded-full border border-border px-5 py-3 text-sm font-medium hover:bg-surface">Start over</button>
              <Link to="/pricing" className="rounded-full bg-foreground px-5 py-3 text-sm font-semibold text-background">See all plans</Link>
            </div>
          </div>
        )}

        {/* Nav */}
        {step < 5 && (
          <div className="mt-10 flex items-center justify-between">
            <button
              onClick={() => setStep((s) => (s > 0 ? ((s - 1) as Step) : s))}
              disabled={step === 0}
              className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium text-muted-foreground disabled:opacity-40 hover:text-foreground"
            >
              <ArrowLeft className="size-4" /> Back
            </button>
            <button
              onClick={() => setStep((s) => ((s + 1) as Step))}
              disabled={step === 0 && !a.country}
              className="inline-flex items-center gap-1.5 rounded-full bg-sunrise px-6 py-3 text-sm font-semibold text-white shadow-glow-amber disabled:opacity-50"
            >
              {step === 4 ? "See recommendations" : "Continue"} <ArrowRight className="size-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
