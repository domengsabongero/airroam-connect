import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { countries } from "@/data/countries";
import { startingFrom } from "@/domain/pricing/service";
import { formatMoney } from "@/lib/format";

export default defineTool({
  name: "list_destinations",
  title: "List destinations",
  description:
    "List Air-Roam supported destinations with region, capital, network tech, coverage and starting price in PHP. Optionally filter by region slug.",
  inputSchema: {
    region: z
      .enum(["europe", "asia-pacific", "americas", "middle-east", "africa", "oceania"])
      .optional()
      .describe("Optional region slug filter."),
    popularOnly: z.boolean().optional().describe("Return only popular destinations."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ region, popularOnly }) => {
    const list = countries
      .filter((c) => (region ? c.regionSlug === region : true))
      .filter((c) => (popularOnly ? c.popular : true))
      .map((c) => {
        const from = startingFrom(c.slug);
        return {
          slug: c.slug,
          name: c.name,
          region: c.region,
          regionSlug: c.regionSlug,
          capital: c.capital,
          network: c.network,
          fiveG: c.fiveG,
          coverage: c.coverage,
          lat: c.lat,
          lng: c.lng,
          startingFrom: from ? formatMoney(from) : null,
        };
      });
    return {
      content: [{ type: "text", text: JSON.stringify(list, null, 2) }],
      structuredContent: { count: list.length, destinations: list },
    };
  },
});
