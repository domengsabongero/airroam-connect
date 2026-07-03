import { createFileRoute } from "@tanstack/react-router";
import { AssistantChat } from "@/components/assistant/AssistantChat";
import { Sparkles, Zap, Globe2, MessageCircle } from "lucide-react";

export const Route = createFileRoute("/assistant")({
  head: () => ({
    meta: [
      { title: "AI Assistant — Chat with Air-Roam" },
      { name: "description", content: "Chat with our AI travel assistant for instant plan recommendations, coverage answers, and trip tips." },
    ],
  }),
  component: AssistantPage,
});

function AssistantPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-32 pb-10 sm:pt-40">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-sky-soft" aria-hidden />
        <div className="mx-auto max-w-5xl px-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber/10 px-3 py-1.5">
            <Sparkles className="size-3.5 text-amber" />
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-amber">AI Travel Assistant</span>
          </div>
          <h1 className="mt-5 font-display text-4xl font-bold tracking-tight sm:text-6xl">
            Ask anything. <span className="text-gradient-sunrise">Land connected.</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Describe your trip in plain language. Our assistant recommends the exact plan, hardware, and backup.
          </p>
        </div>
      </section>

      <section className="px-6 pb-16">
        <div className="mx-auto max-w-4xl">
          <AssistantChat />
        </div>
      </section>

      <section className="bg-surface px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">How the assistant helps</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {[
              { icon: Zap, title: "Instant answers", body: "Trained on 190+ country plans, device specs and carrier networks." },
              { icon: Globe2, title: "Trip-aware", body: "Ask 'best plan for 10 days in Japan and Korea' and get one bundled answer." },
              { icon: MessageCircle, title: "No pushy upsells", body: "The assistant will tell you when a smaller plan is enough." },
            ].map((c) => (
              <div key={c.title} className="rounded-2xl border border-border bg-card p-6 shadow-card">
                <c.icon className="size-5 text-amber" />
                <h3 className="mt-4 font-display text-lg font-bold">{c.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
