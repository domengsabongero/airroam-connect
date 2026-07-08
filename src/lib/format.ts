import type { Money } from "@/domain/pricing/types";

const localeFor: Partial<Record<Money["currency"], string>> = {
  PHP: "en-PH",
  USD: "en-US",
  EUR: "en-IE",
  JPY: "ja-JP",
  SGD: "en-SG",
};

const fractionDigitsFor: Partial<Record<Money["currency"], number>> = {
  PHP: 0,
  JPY: 0,
};

/**
 * Format money as a localized currency string.
 * Default locale follows the money's currency (PHP → en-PH).
 */
export function formatMoney(money: Money, locale?: string): string {
  const resolvedLocale = locale ?? localeFor[money.currency] ?? "en-US";
  const fractionDigits = fractionDigitsFor[money.currency] ?? 2;
  const value = money.amountMinor / 100;
  return new Intl.NumberFormat(resolvedLocale, {
    style: "currency",
    currency: money.currency,
    maximumFractionDigits: fractionDigits,
    minimumFractionDigits: fractionDigits,
  }).format(value);
}

/** Short compact form — "₱1,199" without the currency word. */
export function formatMoneyShort(money: Money, locale?: string): string {
  return formatMoney(money, locale);
}
