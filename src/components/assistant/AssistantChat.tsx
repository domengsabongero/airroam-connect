import { useState, useRef, useEffect } from "react";
import { Send, Sparkles } from "lucide-react";

type Msg = { role: "user" | "bot"; text: string; suggestions?: string[] };

const suggestions = [
  "10 days in Japan for 2 travelers",
  "Business trip to London, need hotspot",
  "Digital nomad plan for 3 months",
  "Group trip to Thailand — 5 people",
];

function mockResponse(text: string): Msg {
  const t = text.toLowerCase();
  if (t.includes("japan")) {
    return { role: "bot", text: "Japan is a DRET eSIM sweet spot — 5G is dense and cheap. For 10 days I'd go with our Standard plan (10 GB / 15 days) at $22, with hotspot enabled for both travelers. Want me to add a fallback eSIM?", suggestions: ["Yes, add fallback", "See Japan plans", "Show hotspot options"] };
  }
  if (t.includes("hotspot") || t.includes("business")) {
    return { role: "bot", text: "For a business trip, I recommend Air-Roam Pocket WiFi — 5G, 10 devices, 24-hour battery, VPN built-in. Weekend Hotspot ($24) covers 3 days, or Tour ($89) if you're staying longer.", suggestions: ["Weekend plan", "Tour plan", "Compare to eSIM"] };
  }
  if (t.includes("nomad") || t.includes("month")) {
    return { role: "bot", text: "For long-term nomads I recommend the DRET eSIM Unlimited ($79/mo) with a backup Travel SIM. You'll get guaranteed 5G in 190+ countries and 24/7 concierge if a carrier drops.", suggestions: ["See Unlimited details", "Add backup SIM", "Enterprise for teams?"] };
  }
  if (t.includes("group") || t.includes("people") || t.includes("family")) {
    return { role: "bot", text: "For groups, one Air-Roam Pocket WiFi beats five eSIMs on both cost and reliability. Tour Hotspot ($89 / 14 days) supports 10 devices simultaneously.", suggestions: ["Book Tour Hotspot", "Add eSIM as backup", "Thailand coverage?"] };
  }
  return { role: "bot", text: "Got it. Tell me your destination, trip length, and how many travelers, and I'll match you to the exact plan.", suggestions };
}

export function AssistantChat() {
  const [messages, setMessages] = useState<Msg[]>([
    { role: "bot", text: "Hi 👋 I'm your Air-Roam travel assistant. Tell me about your trip and I'll pick the perfect connectivity plan.", suggestions },
  ]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, thinking]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function send(text: string) {
    if (!text.trim()) return;
    setMessages((m) => [...m, { role: "user", text: text.trim() }]);
    setInput("");
    setThinking(true);
    setTimeout(() => {
      setMessages((m) => [...m, mockResponse(text)]);
      setThinking(false);
      setTimeout(() => inputRef.current?.focus(), 50);
    }, 900);
  }

  return (
    <div className="flex h-[70vh] min-h-[540px] flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-elevated">
      <div className="flex items-center gap-3 border-b border-border bg-surface px-5 py-4">
        <span className="grid size-9 place-items-center rounded-xl bg-sunrise text-white shadow-glow-amber">
          <Sparkles className="size-4" />
        </span>
        <div>
          <div className="text-sm font-semibold">Air-Roam Assistant</div>
          <div className="text-xs text-muted-foreground">Powered by trip data from 190+ countries</div>
        </div>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto px-4 py-6 sm:px-6">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"} animate-fade-up`}>
            <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${m.role === "user" ? "bg-foreground text-background" : "bg-surface text-foreground"}`}>
              <div>{m.text}</div>
              {m.role === "bot" && m.suggestions && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {m.suggestions.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground/80 transition-colors hover:border-amber hover:text-amber"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        {thinking && (
          <div className="flex justify-start">
            <div className="rounded-2xl bg-surface px-4 py-3">
              <div className="flex gap-1">
                <span className="size-2 animate-bounce rounded-full bg-amber [animation-delay:0ms]" />
                <span className="size-2 animate-bounce rounded-full bg-amber [animation-delay:120ms]" />
                <span className="size-2 animate-bounce rounded-full bg-amber [animation-delay:240ms]" />
              </div>
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      <form
        onSubmit={(e) => { e.preventDefault(); send(input); }}
        className="border-t border-border bg-background p-3"
      >
        <div className="flex items-end gap-2 rounded-2xl border border-border bg-surface p-2 focus-within:border-amber">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(input); } }}
            rows={1}
            placeholder="Ask about your trip…"
            className="min-h-[36px] max-h-40 flex-1 resize-none bg-transparent px-2 py-1.5 text-sm placeholder:text-muted-foreground/60 focus:outline-none"
          />
          <button type="submit" disabled={!input.trim() || thinking} className="grid size-9 shrink-0 place-items-center rounded-xl bg-sunrise text-white shadow-glow-amber disabled:opacity-50">
            <Send className="size-4" />
          </button>
        </div>
      </form>
    </div>
  );
}
