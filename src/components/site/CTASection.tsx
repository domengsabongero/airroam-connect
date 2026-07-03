import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

export function CTASection({
  eyebrow = "Ready when you are",
  title = "Your next trip deserves better signal.",
  body = "Instant activation, 190+ countries, one dashboard. Get connected before takeoff.",
  primary = { label: "Find my plan", to: "/planner" as const },
  secondary = { label: "Explore destinations", to: "/destinations" as const },
}: {
  eyebrow?: string;
  title?: string;
  body?: string;
  primary?: { label: string; to: string };
  secondary?: { label: string; to: string };
}) {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-3xl bg-sunrise p-10 shadow-elevated sm:p-16">
          <div className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full bg-white/20 blur-3xl" aria-hidden />
          <div className="pointer-events-none absolute -left-16 -bottom-16 size-72 rounded-full bg-teal/40 blur-3xl" aria-hidden />
          <div className="relative">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/90">{eyebrow}</p>
            <h2 className="mt-4 max-w-2xl font-display text-3xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
              {title}
            </h2>
            <p className="mt-4 max-w-xl text-white/85">{body}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to={primary.to as never} className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-foreground shadow-elevated transition-transform hover:scale-[1.03]">
                {primary.label}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link to={secondary.to as never} className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm hover:bg-white/20">
                {secondary.label}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
