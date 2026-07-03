import { createFileRoute } from "@tanstack/react-router";
import { PlannerWizard } from "@/components/planner/PlannerWizard";

export const Route = createFileRoute("/planner")({
  head: () => ({
    meta: [
      { title: "Find my plan — Trip planner | Air-Roam" },
      { name: "description", content: "Answer five quick questions and get matched to the perfect Air-Roam plan for your trip." },
    ],
  }),
  component: PlannerPage,
});

function PlannerPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-32 pb-8 sm:pt-40">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-sky-soft" aria-hidden />
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-amber">Trip planner</p>
          <h1 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-6xl">
            Five questions. <span className="text-gradient-sunrise">One perfect plan.</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Tell us about your trip and we'll match you to the right hardware, plan, and backup — in under a minute.
          </p>
        </div>
      </section>

      <section className="px-6 pb-24">
        <PlannerWizard />
      </section>
    </>
  );
}
