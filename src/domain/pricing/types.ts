/**
 * Pricing domain — canonical types.
 * All prices in the application flow through these shapes.
 * PHP is the primary currency; other currencies exist for future FX conversion.
 */

export type Product = "esim" | "travel-sim" | "pocket-wifi" | "enterprise";

export type CurrencyCode = "PHP" | "USD" | "EUR" | "JPY" | "SGD";

/** Integer minor units (e.g. centavos). PHP is stored as whole ₱ * 100. */
export type Money = { amountMinor: number; currency: CurrencyCode };

export type PlanScope =
  | { kind: "country"; slug: string }
  | { kind: "region"; slug: string }
  | { kind: "global" };

export type CustomerTier = "retail" | "reseller" | "b2b" | "enterprise";

export type Plan = {
  id: string;
  product: Product;
  scope: PlanScope;
  name: string;
  dataMB: number | "unlimited";
  validityDays: number;
  basePrice: Money;
  tierPrices?: Partial<Record<CustomerTier, Money>>;
  features: string[];
  active: boolean;
  visibility: "public" | "unlisted" | "internal";
  popular?: boolean;
};

export type Promotion = {
  id: string;
  name: string;
  kind: "percent" | "amount" | "override";
  value: number;
  overridePrice?: Money;
  appliesTo: {
    productIds?: Product[];
    planIds?: string[];
    countrySlugs?: string[];
    regionSlugs?: string[];
    tiers?: CustomerTier[];
  };
  window: { startsAt: string; endsAt: string };
  stackable: boolean;
  priority: number;
  active: boolean;
};

export type DiscountCode = {
  code: string;
  promotionId: string;
  maxRedemptions?: number;
  perCustomerLimit?: number;
  requiresAuth?: boolean;
  active: boolean;
};

export type FxRate = {
  from: CurrencyCode;
  to: CurrencyCode;
  rate: number;
  asOf: string;
};

export type PricingContext = {
  now?: Date;
  countrySlug?: string;
  regionSlug?: string;
  tier?: CustomerTier;
  code?: string;
};

export type PriceQuote = {
  base: Money;
  final: Money;
  appliedPromotions: Promotion[];
};

/** Helper — construct PHP money from whole ₱. */
export const php = (whole: number): Money => ({
  amountMinor: Math.round(whole * 100),
  currency: "PHP",
});
