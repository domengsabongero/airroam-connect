import { php, type Plan } from "@/domain/pricing/types";

/**
 * Canonical plan catalog. All prices in PHP. UI reads via the pricing service.
 * Add country-scoped rows for country-specific pricing; add region-scoped rows to
 * cover a regional group with a single plan; add global rows for anything-goes plans.
 */
export const plans: Plan[] = [
  // Global eSIM ladder (works anywhere)
  { id: "esim-lite", product: "esim", scope: { kind: "global" }, name: "eSIM Lite", dataMB: 3072, validityDays: 7, basePrice: php(499), features: ["Instant QR install", "190+ countries", "Hotspot enabled"], active: true, visibility: "public" },
  { id: "esim-standard", product: "esim", scope: { kind: "global" }, name: "eSIM Standard", dataMB: 10240, validityDays: 15, basePrice: php(1199), features: ["Instant QR install", "Auto-carrier switching", "Hotspot up to 5 devices"], active: true, visibility: "public", popular: true },
  { id: "esim-pro", product: "esim", scope: { kind: "global" }, name: "eSIM Pro", dataMB: 30720, validityDays: 30, basePrice: php(2699), features: ["Priority 5G", "Unlimited hotspot", "Fallback eSIM included"], active: true, visibility: "public" },
  { id: "esim-unlimited", product: "esim", scope: { kind: "global" }, name: "eSIM Unlimited", dataMB: "unlimited", validityDays: 30, basePrice: php(4399), features: ["No fair-use cap", "Guaranteed 5G", "24/7 concierge"], active: true, visibility: "public" },

  // Regional eSIM plans — Europe
  { id: "esim-europe-15", product: "esim", scope: { kind: "region", slug: "europe" }, name: "Europe eSIM 15GB", dataMB: 15360, validityDays: 30, basePrice: php(1499), features: ["Covers 36 EU countries", "5G where available", "Free tethering"], active: true, visibility: "public" },
  { id: "esim-europe-unlimited", product: "esim", scope: { kind: "region", slug: "europe" }, name: "Europe eSIM Unlimited", dataMB: "unlimited", validityDays: 30, basePrice: php(3999), features: ["Unlimited 5G data", "Regional roaming", "Priority network"], active: true, visibility: "public", popular: true },

  // Regional eSIM plans — Asia Pacific
  { id: "esim-apac-5", product: "esim", scope: { kind: "region", slug: "asia-pacific" }, name: "Asia Pacific 5GB", dataMB: 5120, validityDays: 15, basePrice: php(899), features: ["12 APAC countries", "Instant activation", "Hotspot enabled"], active: true, visibility: "public" },
  { id: "esim-apac-20", product: "esim", scope: { kind: "region", slug: "asia-pacific" }, name: "Asia Pacific 20GB", dataMB: 20480, validityDays: 30, basePrice: php(2199), features: ["12 APAC countries", "Priority 5G", "Free carrier failover"], active: true, visibility: "public", popular: true },

  // Country-specific: Japan
  { id: "esim-japan-3", product: "esim", scope: { kind: "country", slug: "japan" }, name: "Japan eSIM 3GB", dataMB: 3072, validityDays: 8, basePrice: php(499), features: ["NTT Docomo 5G", "Kansai + Kanto", "Hotspot enabled"], active: true, visibility: "public" },
  { id: "esim-japan-unlimited", product: "esim", scope: { kind: "country", slug: "japan" }, name: "Japan eSIM Unlimited", dataMB: "unlimited", validityDays: 15, basePrice: php(2199), features: ["Docomo priority 5G", "Unlimited streaming", "Free tethering"], active: true, visibility: "public", popular: true },

  // Country-specific: Singapore
  { id: "esim-singapore-10", product: "esim", scope: { kind: "country", slug: "singapore" }, name: "Singapore 10GB", dataMB: 10240, validityDays: 15, basePrice: php(699), features: ["Singtel priority", "Sub-15ms latency", "Airport-ready"], active: true, visibility: "public" },

  // Travel SIM (physical)
  { id: "sim-travel", product: "travel-sim", scope: { kind: "global" }, name: "Travel SIM", dataMB: 10240, validityDays: 30, basePrice: php(1399), features: ["Ships free worldwide", "Local number included", "3-in-1 cut"], active: true, visibility: "public" },
  { id: "sim-explorer", product: "travel-sim", scope: { kind: "global" }, name: "Explorer SIM", dataMB: 25600, validityDays: 30, basePrice: php(2499), features: ["Multi-carrier failover", "Free international minutes", "Priority 5G"], active: true, visibility: "public", popular: true },
  { id: "sim-longstay", product: "travel-sim", scope: { kind: "global" }, name: "Long Stay SIM", dataMB: 61440, validityDays: 90, basePrice: php(4999), features: ["3-month validity", "Rollover data", "Portable number"], active: true, visibility: "public" },

  // Pocket WiFi
  { id: "wifi-weekend", product: "pocket-wifi", scope: { kind: "global" }, name: "Weekend Hotspot", dataMB: 20480, validityDays: 3, basePrice: php(1349), features: ["5G pocket router", "10 devices", "24h battery"], active: true, visibility: "public" },
  { id: "wifi-tour", product: "pocket-wifi", scope: { kind: "global" }, name: "Tour Hotspot", dataMB: 102400, validityDays: 14, basePrice: php(4999), features: ["Unlimited streaming", "10 devices", "VPN built-in"], active: true, visibility: "public", popular: true },
  { id: "wifi-nomad", product: "pocket-wifi", scope: { kind: "global" }, name: "Nomad Hotspot", dataMB: "unlimited", validityDays: 30, basePrice: php(8899), features: ["No fair-use cap", "Backup eSIM included", "Free courier both ways"], active: true, visibility: "public" },

  // Enterprise (visible, but require sales for real quote)
  { id: "ent-team-10", product: "enterprise", scope: { kind: "global" }, name: "Team 10", dataMB: 204800, validityDays: 30, basePrice: php(13999), features: ["10 employees", "Central dashboard", "IT support"], active: true, visibility: "public" },
  { id: "ent-team-50", product: "enterprise", scope: { kind: "global" }, name: "Team 50", dataMB: 1048576, validityDays: 30, basePrice: php(49999), features: ["50 employees", "SSO integration", "Dedicated CSM"], active: true, visibility: "public", popular: true },
  { id: "ent-global", product: "enterprise", scope: { kind: "global" }, name: "Global Fleet", dataMB: "unlimited", validityDays: 30, basePrice: php(0), features: ["100+ employees", "SLA guaranteed", "Custom APN & IoT"], active: true, visibility: "public" },
];

/** Convenience — human-readable data label. */
export function formatData(dataMB: number | "unlimited"): string {
  if (dataMB === "unlimited") return "Unlimited";
  if (dataMB >= 1024) return `${Math.round(dataMB / 1024)} GB`;
  return `${dataMB} MB`;
}
