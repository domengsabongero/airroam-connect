import type { FxRate } from "@/domain/pricing/types";

/**
 * Static FX rates. Empty by default — PHP is the sole display currency at launch.
 * Populate this array (or swap the pricing repository) to enable multi-currency display.
 */
export const fxRates: FxRate[] = [];
