import destTokyo from "@/assets/dest-tokyo.jpg";
import destSwiss from "@/assets/dest-swiss.jpg";
import destGreece from "@/assets/dest-greece.jpg";

const cards = [
  {
    region: "Asia Pacific",
    country: "Japan",
    city: "Tokyo & Kyoto",
    flag: "🇯🇵",
    price: "$4.50",
    speed: "5G • 840 Mbps",
    image: destTokyo,
    prompt: "cinematic aerial night view of Tokyo Shibuya with neon signs",
  },
  {
    region: "Europe",
    country: "Switzerland",
    city: "Zermatt & Lucerne",
    flag: "🇨🇭",
    price: "$6.20",
    speed: "5G • 620 Mbps",
    image: destSwiss,
    prompt: "swiss alps winding mountain road at dusk",
  },
  {
    region: "Mediterranean",
    country: "Greece",
    city: "Santorini & Athens",
    flag: "🇬🇷",
    price: "$3.80",
    speed: "4G+ • 210 Mbps",
    image: destGreece,
    prompt: "santorini white buildings and blue domes at golden hour",
  },
];

export function Destinations() {
  return (
    <section id="destinations" className="relative px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-aurora">
              Destinations
            </p>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-balance sm:text-5xl">
              Every corner of the map,
              <br />
              already connected.
            </h2>
          </div>
          <a
            href="#all"
            className="group inline-flex items-center gap-2 text-sm font-medium text-aurora"
          >
            Browse all 190+ countries
            <span className="inline-block h-px w-8 bg-aurora transition-all group-hover:w-12" />
          </a>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {cards.map((c) => (
            <article
              key={c.country}
              className="group relative cursor-pointer overflow-hidden rounded-3xl border border-white/5 bg-card"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={c.image}
                  alt={`${c.city}, ${c.country}`}
                  width={896}
                  height={1152}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                <div className="absolute left-5 top-5 flex items-center gap-2">
                  <span className="glass rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-foreground">
                    <span className="mr-1.5">{c.flag}</span>
                    {c.region}
                  </span>
                </div>
                <div className="absolute inset-x-5 bottom-5">
                  <div className="flex items-center gap-2 text-[11px] font-medium text-aurora">
                    <span className="size-1.5 rounded-full bg-aurora shadow-glow" />
                    {c.speed}
                  </div>
                  <h3 className="mt-2 font-display text-2xl font-bold tracking-tight text-foreground">
                    {c.city}
                  </h3>
                </div>
              </div>
              <div className="flex items-center justify-between px-5 py-4">
                <span className="text-sm text-muted-foreground">Starting from</span>
                <span className="font-display text-lg font-bold text-foreground">
                  {c.price}
                  <span className="text-xs font-medium text-muted-foreground"> / day</span>
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
