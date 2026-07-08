import { plans } from "@/data/plans";
import { promotions } from "@/data/promotions";
import { fxRates } from "@/data/fx-rates";
import type { PricingRepository } from "./repository";
import type { DiscountCode, FxRate, Plan, Promotion } from "./types";

/** Default static-data-backed repository. Replace with SupabasePricingRepository later. */
export class StaticPricingRepository implements PricingRepository {
  async listPlans(): Promise<Plan[]> {
    return plans.filter((p) => p.active && p.visibility !== "internal");
  }

  async listPromotions(now: Date = new Date()): Promise<Promotion[]> {
    const t = now.getTime();
    return promotions.filter((p) => {
      if (!p.active) return false;
      const starts = Date.parse(p.window.startsAt);
      const ends = Date.parse(p.window.endsAt);
      return t >= starts && t <= ends;
    });
  }

  async getDiscountCode(_code: string): Promise<DiscountCode | null> {
    return null; // no static discount codes for now
  }

  async listFxRates(): Promise<FxRate[]> {
    return fxRates;
  }
}

export const pricingRepository: PricingRepository = new StaticPricingRepository();
