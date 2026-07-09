import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { countries } from "@/data/countries";
import { plansForCountry, priceFor } from "@/domain/pricing/service";
import { formatData } from "@/data/plans";
import { formatMoney } from "@/lib/format";

export default defineTool({
  name: "recommend_plan",
  title: "Recommend a plan",
  description:
    "Recommend the best Air-Roam plan for a trip. Given a destination slug, trip length in days and expected data usage in GB, returns the cheapest plan that fits and 2 alternatives.",
  inputSchema: {
    destination: z.string().min(1).describe("Country slug, e.g. 'japan'."),
    days: z.number().int().positive().describe("Trip length in days."),
    dataGB: z
      .number()
      .positive()
      .describe("Expected total data usage across the trip, in GB. Use a large value for heavy streaming."),
    travelers: z.number().int().positive().optional().describe("Number of travelers, defaults to 1."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ destination, days, dataGB, travelers }) => {
    const country = countries.find((c) => c.slug === destination);
    if (!country) {
      return {
        content: [{ type: "text", text: `No destination with slug '${destination}'.` }],
        isError: true,
      };
    }
    const needMB = dataGB * 1024;
    const groupSize = travelers ?? 1;

    const scored = plansForCountry(destination)
      .map((p) => {
        const q = priceFor(p, { countrySlug: destination });
        const fitsData = p.dataMB === "unlimited" || p.dataMB >= needMB;
        const fitsDays = p.validityDays >= days;
        // pocket-wifi is a strong signal for groups
        const groupBonus = groupSize >= 3 && p.product === "pocket-wifi" ? 1 : 0;
        return { plan: p, quote: q, fitsData, fitsDays, groupBonus };
      })
      .filter((s) => s.fitsData && s.fitsDays)
      .sort((a, b) => {
        if (a.groupBonus !== b.groupBonus) return b.groupBonus - a.groupBonus;
        return a.quote.final.amountMinor - b.quote.final.amountMinor;
      });

    if (scored.length === 0) {
      return {
        content: [
          {
            type: "text",
            text: `No plan covers ${dataGB}GB over ${days} days in ${country.name}. Consider splitting across multiple plans or contacting sales.`,
          },
        ],
      };
    }

    const shape = (s: (typeof scored)[number]) => ({
      id: s.plan.id,
      name: s.plan.name,
      product: s.plan.product,
      data: formatData(s.plan.dataMB),
      validityDays: s.plan.validityDays,
      price: formatMoney(s.quote.final),
      priceMinor: s.quote.final.amountMinor,
      currency: s.quote.final.currency,
      features: s.plan.features,
    });

    const result = {
      destination: country.name,
      tripDays: days,
      dataGB,
      travelers: groupSize,
      recommended: shape(scored[0]!),
      alternatives: scored.slice(1, 3).map(shape),
    };
    return {
      content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      structuredContent: result,
    };
  },
});
