import { useState } from "react";

const fields = [
  { key: "destination", label: "Destination", placeholder: "Where to?" },
  { key: "dates", label: "Travel dates", placeholder: "Oct 12 — Oct 26" },
  { key: "travelers", label: "Travelers", placeholder: "2 adults" },
];

const devices = ["iPhone 15 Pro", "Pixel 8", "Samsung S24", "Other"];

export function TripPlanner() {
  const [hotspot, setHotspot] = useState(false);

  return (
    <section id="plan" className="relative px-6 pb-24 sm:pb-32">
      <div className="mx-auto max-w-6xl">
        <div className="glass shadow-elevated relative rounded-3xl p-3 md:p-4">
          <div className="grid grid-cols-1 gap-2 md:grid-cols-6 md:gap-3">
            {fields.map((f) => (
              <label
                key={f.key}
                className="group flex flex-col rounded-2xl px-4 py-3 transition-colors hover:bg-white/[0.03] md:col-span-1"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-aurora">
                  {f.label}
                </span>
                <input
                  type="text"
                  placeholder={f.placeholder}
                  className="mt-1 w-full bg-transparent text-sm font-medium text-foreground placeholder:text-muted-foreground/60 focus:outline-none"
                />
              </label>
            ))}

            <label className="flex flex-col rounded-2xl px-4 py-3 transition-colors hover:bg-white/[0.03]">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-aurora">
                Device
              </span>
              <select
                className="mt-1 w-full appearance-none bg-transparent text-sm font-medium text-foreground focus:outline-none"
                defaultValue={devices[0]}
              >
                {devices.map((d) => (
                  <option key={d} className="bg-background">
                    {d}
                  </option>
                ))}
              </select>
            </label>

            <button
              type="button"
              onClick={() => setHotspot((v) => !v)}
              className={`flex items-center justify-between rounded-2xl px-4 py-3 text-left transition-colors ${
                hotspot ? "bg-aurora/10 ring-1 ring-aurora/40" : "hover:bg-white/[0.03]"
              }`}
              aria-pressed={hotspot}
            >
              <span className="flex flex-col">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-aurora">
                  Hotspot
                </span>
                <span className="mt-1 text-sm font-medium text-foreground">
                  {hotspot ? "Yes, add one" : "Not needed"}
                </span>
              </span>
              <span
                className={`ml-2 inline-flex h-6 w-10 shrink-0 items-center rounded-full transition-colors ${
                  hotspot ? "bg-aurora" : "bg-white/10"
                }`}
                aria-hidden
              >
                <span
                  className={`inline-block size-5 transform rounded-full bg-background transition-transform ${
                    hotspot ? "translate-x-4" : "translate-x-0.5"
                  }`}
                />
              </span>
            </button>

            <button
              type="submit"
              className="col-span-full mt-1 inline-flex items-center justify-center gap-2 rounded-2xl bg-aurora px-6 py-4 text-sm font-semibold text-background transition-transform hover:scale-[1.01] active:scale-[0.99] md:col-span-6"
            >
              Find my perfect plan
              <svg
                className="size-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
