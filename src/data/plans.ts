export type Plan = {
  id: string;
  product: "esim" | "sim" | "wifi" | "enterprise";
  name: string;
  data: string;
  days: number;
  price: number;
  features: string[];
  popular?: boolean;
};

export const plans: Plan[] = [
  { id: "esim-lite", product: "esim", name: "Lite", data: "3 GB", days: 7, price: 9, features: ["Instant QR install", "190+ countries", "Hotspot enabled"] },
  { id: "esim-standard", product: "esim", name: "Standard", data: "10 GB", days: 15, price: 22, popular: true, features: ["Instant QR install", "Auto-carrier switching", "Hotspot up to 5 devices"] },
  { id: "esim-pro", product: "esim", name: "Pro", data: "30 GB", days: 30, price: 49, features: ["Priority 5G", "Unlimited hotspot", "Fallback eSIM included"] },
  { id: "esim-unlimited", product: "esim", name: "Unlimited", data: "Unlimited", days: 30, price: 79, features: ["No fair-use cap", "Guaranteed 5G", "24/7 concierge"] },

  { id: "sim-travel", product: "sim", name: "Travel SIM", data: "10 GB", days: 30, price: 25, features: ["Ships free worldwide", "Local number included", "3-in-1 cut"] },
  { id: "sim-explorer", product: "sim", name: "Explorer SIM", data: "25 GB", days: 30, price: 45, popular: true, features: ["Multi-carrier failover", "Free international minutes", "Priority 5G"] },
  { id: "sim-longstay", product: "sim", name: "Long Stay SIM", data: "60 GB", days: 90, price: 89, features: ["3-month validity", "Rollover data", "Portable number"] },

  { id: "wifi-weekend", product: "wifi", name: "Weekend Hotspot", data: "20 GB", days: 3, price: 24, features: ["5G pocket router", "10 devices", "24h battery"] },
  { id: "wifi-tour", product: "wifi", name: "Tour Hotspot", data: "100 GB", days: 14, price: 89, popular: true, features: ["Unlimited streaming", "10 devices", "VPN built-in"] },
  { id: "wifi-nomad", product: "wifi", name: "Nomad Hotspot", data: "Unlimited", days: 30, price: 159, features: ["No fair-use cap", "Backup eSIM included", "Free courier both ways"] },

  { id: "ent-team-10", product: "enterprise", name: "Team 10", data: "Pooled 200 GB", days: 30, price: 249, features: ["10 employees", "Central dashboard", "IT support"] },
  { id: "ent-team-50", product: "enterprise", name: "Team 50", data: "Pooled 1 TB", days: 30, price: 899, popular: true, features: ["50 employees", "SSO integration", "Dedicated CSM"] },
  { id: "ent-global", product: "enterprise", name: "Global Fleet", data: "Custom", days: 30, price: 0, features: ["100+ employees", "SLA guaranteed", "Custom APN & IoT"] },
];
