import { useState } from "react";
import { Plus, Minus } from "lucide-react";

export function FAQAccordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="divide-y divide-border rounded-2xl border border-border bg-card">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={it.q}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              aria-expanded={isOpen}
            >
              <span className="font-display text-base font-semibold text-foreground sm:text-lg">{it.q}</span>
              <span className="grid size-8 shrink-0 place-items-center rounded-full border border-border text-muted-foreground">
                {isOpen ? <Minus className="size-4" /> : <Plus className="size-4" />}
              </span>
            </button>
            {isOpen && (
              <div className="px-6 pb-6 text-sm text-muted-foreground animate-fade-up">{it.a}</div>
            )}
          </div>
        );
      })}
    </div>
  );
}
