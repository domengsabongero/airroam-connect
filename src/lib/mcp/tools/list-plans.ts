import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { plans as allPlans, formatData } from "@/data/plans";
import { priceFor } from "@/domain/pricing/service";
import { formatMoney } from "@/lib/format";

export default defineTool({
  name: "list_plans",
  title: "List plans",
  description:
    "List Air-Roam connectivity plans (eSIM, travel SIM, pocket WiFi, enterprise) with PHP pricing. Optionally filter by product.",
  inputSchema: {
    product: z
      .enum(["esim", "travel-sim", "pocket-wifi", "enterprise"])
      .optional()
      .describe("Optional product filter."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ product }) => {
    const list = allPlans
      .filter((p) => p.active && p.visibility === "public")
      .filter((p) => (product ? p.product === product : true))
      .map((p) => {
        const q = priceFor(p);
        return {
          id: p.id,
          product: p.product,
          name: p.name,
          scope: p.scope,
          data: formatData(p.dataMB),
          validityDays: p.validityDays,
          price: formatMoney(q.final),
          priceMinor: q.final.amountMinor,
          currency: q.final.currency,
          features: p.features,
          popular: p.popular ?? false,
        };
      });
    return {
      content: [{ type: "text", text: JSON.stringify(list, null, 2) }],
      structuredContent: { count: list.length, plans: list },
    };
  },
});
