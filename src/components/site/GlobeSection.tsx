import { GlobeSlot } from "@/features/globe";

export function GlobeSection() {
  return (
    <section id="network" className="relative px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-teal">
            The network
          </p>
          <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-balance sm:text-5xl">
            One tap to the world's fastest local carrier.
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground">
            Direct peering with 450+ tier-one carriers means you're always on the strongest 5G
            band available — automatically.
          </p>
        </div>

        <div className="relative mt-14 overflow-hidden rounded-[36px] border border-border bg-surface">
          <div className="relative aspect-[16/10]">
            <GlobeSlot
              variant="hero"
              interactive={false}
              showControls={false}
              showSearch={false}
              autoRotate
            />
          </div>
        </div>
      </div>
    </section>
  );
}
