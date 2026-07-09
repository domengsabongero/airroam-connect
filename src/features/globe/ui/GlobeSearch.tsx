import { useMemo, useRef, useState } from "react";
import { Search } from "lucide-react";
import { countries } from "@/data/countries";
import { globeActions } from "../store";

function score(q: string, s: string) {
  const a = q.toLowerCase();
  const b = s.toLowerCase();
  if (b.startsWith(a)) return 100;
  if (b.includes(a)) return 60;
  // simple fuzzy: all chars in order
  let i = 0;
  for (const ch of b) if (ch === a[i]) i++;
  return i === a.length ? 20 : 0;
}

export function GlobeSearch() {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => {
    if (!q.trim()) return [];
    return countries
      .map((c) => ({ c, s: Math.max(score(q, c.name), score(q, c.capital), score(q, c.region)) }))
      .filter((r) => r.s > 0)
      .sort((a, b) => b.s - a.s)
      .slice(0, 6)
      .map((r) => r.c);
  }, [q]);

  const pick = (slug: string) => {
    globeActions.select(slug);
    setQ("");
    setOpen(false);
    inputRef.current?.blur();
  };

  return (
    <div className="rounded-2xl border border-border bg-card/90 shadow-card backdrop-blur">
      <div className="flex items-center gap-2 px-3 py-2">
        <Search className="size-4 text-muted-foreground" />
        <input
          ref={inputRef}
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setOpen(true);
            setActive(0);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={(e) => {
            if (!results.length) return;
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setActive((a) => Math.min(a + 1, results.length - 1));
            } else if (e.key === "ArrowUp") {
              e.preventDefault();
              setActive((a) => Math.max(a - 1, 0));
            } else if (e.key === "Enter") {
              e.preventDefault();
              pick(results[active]!.slug);
            } else if (e.key === "Escape") {
              setOpen(false);
            }
          }}
          placeholder="Search 190+ countries…"
          aria-label="Search destinations on the globe"
          className="w-full bg-transparent text-sm placeholder:text-muted-foreground/60 focus:outline-none"
        />
      </div>
      {open && results.length > 0 && (
        <ul role="listbox" className="max-h-64 overflow-y-auto border-t border-border py-1">
          {results.map((c, i) => (
            <li key={c.slug}>
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => pick(c.slug)}
                onMouseEnter={() => setActive(i)}
                className={`flex w-full items-center gap-3 px-3 py-2 text-left text-sm transition-colors ${
                  active === i ? "bg-surface" : ""
                }`}
              >
                <span className="text-lg">{c.flag}</span>
                <span className="flex-1">
                  <span className="font-medium">{c.name}</span>
                  <span className="ml-2 text-xs text-muted-foreground">{c.capital}</span>
                </span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  {c.network}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
