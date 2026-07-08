export type RegionSlug =
  | "europe"
  | "asia-pacific"
  | "americas"
  | "middle-east"
  | "africa"
  | "oceania";

export type Region = {
  slug: RegionSlug;
  name: string;
  description: string;
  heroImage: string;
};

export const regions: Region[] = [
  {
    slug: "europe",
    name: "Europe",
    description: "One eSIM covers 30+ EU and neighboring countries with unified 5G roaming.",
    heroImage:
      "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "asia-pacific",
    name: "Asia Pacific",
    description: "From Tokyo's fastest 5G to island-hopping in Southeast Asia.",
    heroImage:
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "americas",
    name: "Americas",
    description: "Coast-to-coast coverage across North, Central and South America.",
    heroImage:
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "middle-east",
    name: "Middle East",
    description: "Premium networks across the Gulf and Levant, ready for stopovers or long stays.",
    heroImage:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "africa",
    name: "Africa",
    description: "Safari-ready connectivity from Cape Town to Cairo.",
    heroImage:
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "oceania",
    name: "Oceania",
    description: "Australia and New Zealand with nationwide roaming.",
    heroImage:
      "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&w=1600&q=80",
  },
];

export const regionBySlug = (slug: RegionSlug) => regions.find((r) => r.slug === slug);
