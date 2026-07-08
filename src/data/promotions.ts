import type { Promotion } from "@/domain/pricing/types";

/**
 * Active + scheduled promotions. Seasonal campaigns are windows over Promotion rows.
 * Add discount-code-backed promotions here and reference them from `discountCodes`.
 */
export const promotions: Promotion[] = [];
