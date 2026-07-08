import type { DiscountCode, FxRate, Plan, Promotion } from "./types";

/**
 * Repository port. Swappable data source — static today, Supabase later.
 * Async by design so the migration to a network-backed repository is trivial.
 */
export interface PricingRepository {
  listPlans(): Promise<Plan[]>;
  listPromotions(now?: Date): Promise<Promotion[]>;
  getDiscountCode(code: string): Promise<DiscountCode | null>;
  listFxRates(): Promise<FxRate[]>;
}
