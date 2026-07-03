export type Country = {
  slug: string;
  name: string;
  flag: string;
  region: "Europe" | "Asia Pacific" | "Americas" | "Middle East" | "Africa" | "Oceania";
  capital: string;
  currency: string;
  timezone: string;
  network: "5G" | "4G+" | "4G";
  speed: string;
  fromPrice: number; // USD/day
  popular?: boolean;
  featured?: boolean;
  tagline: string;
  tips: string[];
};

export const countries: Country[] = [
  { slug: "japan", name: "Japan", flag: "🇯🇵", region: "Asia Pacific", capital: "Tokyo", currency: "JPY", timezone: "GMT+9", network: "5G", speed: "840 Mbps", fromPrice: 4.5, popular: true, featured: true, tagline: "From neon Shibuya nights to Kyoto's quiet temples.", tips: ["Pocket WiFi is popular for groups", "IC cards accept mobile wallets", "Free WiFi in most trains"] },
  { slug: "united-states", name: "United States", flag: "🇺🇸", region: "Americas", capital: "Washington D.C.", currency: "USD", timezone: "GMT-5 to -10", network: "5G", speed: "620 Mbps", fromPrice: 3.9, popular: true, featured: true, tagline: "Coast to coast on 5G — one plan covers all 50 states.", tips: ["T-Mobile & AT&T dual failover", "Data-heavy plans recommended", "eSIM works on all iPhones since XS"] },
  { slug: "france", name: "France", flag: "🇫🇷", region: "Europe", capital: "Paris", currency: "EUR", timezone: "GMT+1", network: "5G", speed: "540 Mbps", fromPrice: 3.2, popular: true, featured: true, tagline: "Paris cafés to Provence lavender — seamlessly online.", tips: ["Free WiFi in most museums", "eSIM covers all EU roaming", "Metro tunnels have full coverage"] },
  { slug: "italy", name: "Italy", flag: "🇮🇹", region: "Europe", capital: "Rome", currency: "EUR", timezone: "GMT+1", network: "5G", speed: "480 Mbps", fromPrice: 3.2, popular: true, featured: true, tagline: "Amalfi coast, Tuscan hills, all connected.", tips: ["Rural Tuscany 4G+ only", "TIM & Vodafone failover", "eSIM shares EU regional plan"] },
  { slug: "spain", name: "Spain", flag: "🇪🇸", region: "Europe", capital: "Madrid", currency: "EUR", timezone: "GMT+1", network: "5G", speed: "520 Mbps", fromPrice: 3.2, popular: true, tagline: "Barcelona to the Balearics on premium 5G.", tips: ["Islands covered by same plan", "Movistar primary carrier", "Fast tethering supported"] },
  { slug: "united-kingdom", name: "United Kingdom", flag: "🇬🇧", region: "Europe", capital: "London", currency: "GBP", timezone: "GMT+0", network: "5G", speed: "610 Mbps", fromPrice: 3.5, popular: true, featured: true, tagline: "London to the Highlands with edge-of-network speeds.", tips: ["Underground has patchy service", "EE offers fastest 5G", "Scotland fully covered"] },
  { slug: "germany", name: "Germany", flag: "🇩🇪", region: "Europe", capital: "Berlin", currency: "EUR", timezone: "GMT+1", network: "5G", speed: "560 Mbps", fromPrice: 3.2, tagline: "Autobahn-ready connectivity across every state.", tips: ["Deutsche Telekom priority", "ICE trains have onboard WiFi", "EU roaming included"] },
  { slug: "switzerland", name: "Switzerland", flag: "🇨🇭", region: "Europe", capital: "Bern", currency: "CHF", timezone: "GMT+1", network: "5G", speed: "620 Mbps", fromPrice: 6.2, featured: true, tagline: "Alpine peaks, alpine speeds.", tips: ["Mountain regions fully covered", "Swisscom priority network", "Non-EU pricing"] },
  { slug: "greece", name: "Greece", flag: "🇬🇷", region: "Europe", capital: "Athens", currency: "EUR", timezone: "GMT+2", network: "4G+", speed: "210 Mbps", fromPrice: 3.8, featured: true, tagline: "Santorini sunsets. Signal that keeps up.", tips: ["Islands 4G+ only", "Cosmote primary carrier", "Ferry crossings covered"] },
  { slug: "portugal", name: "Portugal", flag: "🇵🇹", region: "Europe", capital: "Lisbon", currency: "EUR", timezone: "GMT+0", network: "5G", speed: "450 Mbps", fromPrice: 3.2, tagline: "Lisbon trams to Algarve cliffs.", tips: ["Azores & Madeira included", "MEO primary carrier", "Very affordable"] },
  { slug: "netherlands", name: "Netherlands", flag: "🇳🇱", region: "Europe", capital: "Amsterdam", currency: "EUR", timezone: "GMT+1", network: "5G", speed: "590 Mbps", fromPrice: 3.2, tagline: "Amsterdam canals on the fastest EU 5G.", tips: ["KPN priority network", "Trains have onboard WiFi", "EU regional plan applies"] },
  { slug: "turkey", name: "Turkey", flag: "🇹🇷", region: "Europe", capital: "Ankara", currency: "TRY", timezone: "GMT+3", network: "4G+", speed: "220 Mbps", fromPrice: 3.5, tagline: "Istanbul to Cappadocia balloons.", tips: ["Turkcell priority", "Coastal Turkey excellent", "Not on EU regional plan"] },
  { slug: "thailand", name: "Thailand", flag: "🇹🇭", region: "Asia Pacific", capital: "Bangkok", currency: "THB", timezone: "GMT+7", network: "5G", speed: "480 Mbps", fromPrice: 2.9, popular: true, tagline: "Bangkok, Phuket, Chiang Mai — always on.", tips: ["AIS primary carrier", "Islands well covered", "Cheap unlimited plans"] },
  { slug: "vietnam", name: "Vietnam", flag: "🇻🇳", region: "Asia Pacific", capital: "Hanoi", currency: "VND", timezone: "GMT+7", network: "4G+", speed: "180 Mbps", fromPrice: 2.5, tagline: "Hanoi to Ho Chi Minh, motorbike-friendly speed.", tips: ["Viettel largest network", "Rural areas 4G", "Affordable per-day plans"] },
  { slug: "indonesia", name: "Indonesia", flag: "🇮🇩", region: "Asia Pacific", capital: "Jakarta", currency: "IDR", timezone: "GMT+7 to +9", network: "4G+", speed: "160 Mbps", fromPrice: 3.2, tagline: "Bali, Java, Lombok — one plan.", tips: ["Telkomsel primary", "Islands well covered", "Remote areas patchy"] },
  { slug: "south-korea", name: "South Korea", flag: "🇰🇷", region: "Asia Pacific", capital: "Seoul", currency: "KRW", timezone: "GMT+9", network: "5G", speed: "920 Mbps", fromPrice: 4.2, popular: true, tagline: "The world's fastest 5G, unrestricted.", tips: ["KT primary carrier", "Subway fully covered", "Fastest mobile speeds globally"] },
  { slug: "singapore", name: "Singapore", flag: "🇸🇬", region: "Asia Pacific", capital: "Singapore", currency: "SGD", timezone: "GMT+8", network: "5G", speed: "780 Mbps", fromPrice: 4, tagline: "Island-wide 5G with sub-15ms latency.", tips: ["Singtel priority", "Airport eSIM ready on arrival", "Excellent for tethering"] },
  { slug: "australia", name: "Australia", flag: "🇦🇺", region: "Oceania", capital: "Canberra", currency: "AUD", timezone: "GMT+8 to +11", network: "5G", speed: "510 Mbps", fromPrice: 4.5, popular: true, tagline: "Sydney to the Outback.", tips: ["Telstra widest coverage", "Outback 4G at best", "eSIM works nationally"] },
  { slug: "new-zealand", name: "New Zealand", flag: "🇳🇿", region: "Oceania", capital: "Wellington", currency: "NZD", timezone: "GMT+12", network: "5G", speed: "460 Mbps", fromPrice: 4.5, tagline: "Fjords and glaciers — never offline.", tips: ["Spark primary network", "Fiordland patchy", "Data plans generous"] },
  { slug: "brazil", name: "Brazil", flag: "🇧🇷", region: "Americas", capital: "Brasília", currency: "BRL", timezone: "GMT-3", network: "5G", speed: "420 Mbps", fromPrice: 3.9, tagline: "Rio, São Paulo, Amazon fringes.", tips: ["Vivo primary carrier", "Amazon interior limited", "Beach cities excellent"] },
  { slug: "mexico", name: "Mexico", flag: "🇲🇽", region: "Americas", capital: "Mexico City", currency: "MXN", timezone: "GMT-6 to -8", network: "5G", speed: "380 Mbps", fromPrice: 3.5, popular: true, tagline: "Cancún to CDMX on one seamless plan.", tips: ["Telcel largest network", "Riviera Maya excellent", "Mountains patchy"] },
  { slug: "canada", name: "Canada", flag: "🇨🇦", region: "Americas", capital: "Ottawa", currency: "CAD", timezone: "GMT-4 to -8", network: "5G", speed: "540 Mbps", fromPrice: 4.2, tagline: "Rockies to Newfoundland, coast to coast.", tips: ["Rogers/Bell dual failover", "Northern territories 4G", "eSIM works on all major devices"] },
  { slug: "uae", name: "United Arab Emirates", flag: "🇦🇪", region: "Middle East", capital: "Abu Dhabi", currency: "AED", timezone: "GMT+4", network: "5G", speed: "710 Mbps", fromPrice: 4.5, popular: true, featured: true, tagline: "Dubai skyline. Desert dunes. Same signal.", tips: ["Etisalat priority", "VoIP restrictions bypassed", "Perfect for stopovers"] },
  { slug: "morocco", name: "Morocco", flag: "🇲🇦", region: "Africa", capital: "Rabat", currency: "MAD", timezone: "GMT+1", network: "4G+", speed: "180 Mbps", fromPrice: 3.5, tagline: "Marrakech medinas to Sahara camps.", tips: ["Maroc Telecom primary", "Sahara has satellite fallback", "Cities fully covered"] },
  { slug: "south-africa", name: "South Africa", flag: "🇿🇦", region: "Africa", capital: "Pretoria", currency: "ZAR", timezone: "GMT+2", network: "5G", speed: "340 Mbps", fromPrice: 3.9, tagline: "Cape Town to Kruger, safari-ready.", tips: ["Vodacom primary", "Game reserves patchy", "Coastal cities excellent"] },
  { slug: "egypt", name: "Egypt", flag: "🇪🇬", region: "Africa", capital: "Cairo", currency: "EGP", timezone: "GMT+2", network: "4G+", speed: "160 Mbps", fromPrice: 3.5, tagline: "Pyramids, Nile cruises, Red Sea reefs.", tips: ["Vodafone Egypt primary", "Nile route fully covered", "Desert requires satellite"] },
  { slug: "iceland", name: "Iceland", flag: "🇮🇸", region: "Europe", capital: "Reykjavík", currency: "ISK", timezone: "GMT+0", network: "5G", speed: "500 Mbps", fromPrice: 4.8, tagline: "Ring Road ready — glaciers to geysers.", tips: ["Siminn primary", "Highlands patchy", "Perfect for road trips"] },
  { slug: "india", name: "India", flag: "🇮🇳", region: "Asia Pacific", capital: "New Delhi", currency: "INR", timezone: "GMT+5:30", network: "5G", speed: "420 Mbps", fromPrice: 2.9, popular: true, tagline: "Delhi, Mumbai, Goa, Himalayas.", tips: ["Jio & Airtel dual", "Rural areas 4G+", "Very generous data caps"] },
  { slug: "argentina", name: "Argentina", flag: "🇦🇷", region: "Americas", capital: "Buenos Aires", currency: "ARS", timezone: "GMT-3", network: "4G+", speed: "220 Mbps", fromPrice: 3.6, tagline: "Buenos Aires tango to Patagonia trails.", tips: ["Claro primary", "Patagonia 4G", "Border coverage seamless"] },
  { slug: "china", name: "China", flag: "🇨🇳", region: "Asia Pacific", capital: "Beijing", currency: "CNY", timezone: "GMT+8", network: "5G", speed: "680 Mbps", fromPrice: 4.5, tagline: "Bypasses the Great Firewall by default.", tips: ["Includes VPN passthrough", "China Mobile primary", "Google/Meta accessible"] },
];

export const regions = ["Europe", "Asia Pacific", "Americas", "Middle East", "Africa", "Oceania"] as const;

export const featuredCountries = countries.filter((c) => c.featured);
export const popularCountries = countries.filter((c) => c.popular);
