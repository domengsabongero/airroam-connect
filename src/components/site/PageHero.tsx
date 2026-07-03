import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

export function PageHero({
  eyebrow,
  title,
  body,
  primary,
  secondary,
  visual,
}: {
  eyebrow: string;
  title: ReactNode;
  body: ReactNode;
  primary?: { label: string; to: string };
  secondary?: { label: string; to: string };
  visual?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-24">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-sky-soft" aria-hidden />
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-amber">{eyebrow}</p>
            <h1 className="mt-4 font-display text-4xl font-bold leading-[1.05] tracking-tight text-balance sm:text-6xl">
              {title}
            </h1>
            <p className="mt-5 max-w-xl text-pretty text-lg text-muted-foreground">{body}</p>
            {(primary || secondary) && (
              <div className="mt-8 flex flex-wrap gap-3">
                {primary && (
                  <Link to={primary.to as never} className="group inline-flex items-center gap-2 rounded-full bg-sunrise px-6 py-3.5 text-sm font-semibold text-white shadow-glow-amber transition-transform hover:scale-[1.03]">
                    {primary.label} <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                )}
                {secondary && (
                  <Link to={secondary.to as never} className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3.5 text-sm font-semibold hover:bg-surface">
                    {secondary.label}
                  </Link>
                )}
              </div>
            )}
          </div>
          {visual && <div className="relative">{visual}</div>}
        </div>
      </div>
    </section>
  );
}
