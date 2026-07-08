/**
 * Pricing service — pure, deterministic derivations over the canonical dataset.
 * Every price shown in the UI must originate here.
 */
import { countries } from "@/data/countries";
import { plans as allPlans } from "@/data/plans";
import { promotions as allPromotions } from "@/data/promotions";
import { fxRates as staticFxRates } from "@/data/fx-rates";
import type {
  CurrencyCode,
  Money,
  Plan,
  PriceQuote,
  PricingContext,
  Product,
  Promotion,
} from "./types";

const isPublic = (p: Plan) => p.active && p.visibility === "public";

/** Country + regional + global plans that apply to a country. */
export function plansForCountry(slug: string): Plan[] {
  const country = countries.find((c) => c.slug === slug);
  const regionSlug = country?.regionSlug;
  return allPlans.filter((p) => {
    if (!isPublic(p)) return false;
    switch (p.scope.kind) {
      case "country":
        return p.scope.slug === slug;
      case "region":
        return regionSlug ? p.scope.slug === regionSlug : false;
      case "global":
        return true;
    }
  });
}

export function plansByProduct(slug: string, product: Product): Plan[] {
  return plansForCountry(slug).filter((p) => p.product === product);
}

/** Promotions that apply to a plan under a pricing context. */
export function applicablePromotions(plan: Plan, ctx: PricingContext = {}): Promotion[] {
  const now = ctx.now ?? new Date();
  const t = now.getTime();
  const country = ctx.countrySlug ? countries.find((c) => c.slug === ctx.countrySlug) : undefined;
  const regionSlug = ctx.regionSlug ?? country?.regionSlug;
  const tier = ctx.tier ?? "retail";

  return allPromotions
    .filter((promo) => {
      if (!promo.active) return false;
      if (t < Date.parse(promo.window.startsAt) || t > Date.parse(promo.window.endsAt)) return false;
      const a = promo.appliesTo;
      if (a.planIds && !a.planIds.includes(plan.id)) return false;
      if (a.productIds && !a.productIds.includes(plan.product)) return false;
      if (a.countrySlugs && (!ctx.countrySlug || !a.countrySlugs.includes(ctx.countrySlug))) return false;
      if (a.regionSlugs && (!regionSlug || !a.regionSlugs.includes(regionSlug))) return false;
      if (a.tiers && !a.tiers.includes(tier)) return false;
      return true;
    })
    .sort((a, b) => b.priority - a.priority);
}

function applyPromotion(base: Money, promo: Promotion): Money {
  if (promo.kind === "override" && promo.overridePrice) {
    return promo.overridePrice;
  }
  if (promo.kind === "percent") {
    const amountMinor = Math.round(base.amountMinor * (1 - promo.value / 100));
    return { amountMinor: Math.max(0, amountMinor), currency: base.currency };
  }
  if (promo.kind === "amount") {
    return { amountMinor: Math.max(0, base.amountMinor - promo.value), currency: base.currency };
  }
  return base;
}

/** Compute the final price for a plan under a pricing context. */
export function priceFor(plan: Plan, ctx: PricingContext = {}): PriceQuote {
  const tier = ctx.tier ?? "retail";
  const base = plan.tierPrices?.[tier] ?? plan.basePrice;

  const promos = applicablePromotions(plan, ctx);
  const applied: Promotion[] = [];
  let current = base;

  for (const p of promos) {
    if (applied.length > 0 && !p.stackable) continue;
    if (applied.length > 0 && !applied.every((a) => a.stackable)) continue;
    current = applyPromotion(current, p);
    applied.push(p);
    if (!p.stackable) break;
  }

  return { base, final: current, appliedPromotions: applied };
}

/** The lowest final price across all public plans that apply to a country. */
export function startingFrom(slug: string, ctx: PricingContext = {}): Money | null {
  const plans = plansForCountry(slug);
  if (plans.length === 0) return null;
  const localCtx: PricingContext = { ...ctx, countrySlug: slug };
  let min: Money | null = null;
  for (const plan of plans) {
    const q = priceFor(plan, localCtx);
    if (min === null || q.final.amountMinor < min.amountMinor) min = q.final;
  }
  return min;
}

/** Convert money between currencies using provided (or static) FX rates. */
export function convert(money: Money, target: CurrencyCode, rates = staticFxRates): Money {
  if (money.currency === target) return money;
  const direct = rates.find((r) => r.from === money.currency && r.to === target);
  if (direct) {
    return { amountMinor: Math.round(money.amountMinor * direct.rate), currency: target };
  }
  const inverse = rates.find((r) => r.from === target && r.to === money.currency);
  if (inverse) {
    return { amountMinor: Math.round(money.amountMinor / inverse.rate), currency: target };
  }
  return money;
}
