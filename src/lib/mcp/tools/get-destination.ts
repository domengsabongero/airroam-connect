import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { countries } from "@/data/countries";
import { plansForCountry, priceFor, startingFrom } from "@/domain/pricing/service";
import { formatData } from "@/data/plans";
import { formatMoney } from "@/lib/format";

export default defineTool({
  name: "get_destination",
  title: "Get destination details",
  description:
    "Get full details for one destination by slug — coordinates, partner networks, coverage, travel tips, and every applicable plan with final PHP pricing.",
  inputSchema: {
    slug: z.string().min(1).describe("Country slug, e.g. 'japan' or 'south-korea'."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ slug }) => {
    const country = countries.find((c) => c.slug === slug);
    if (!country) {
      return {
        content: [{ type: "text", text: `No destination with slug '${slug}'.` }],
        isError: true,
      };
    }
    const plans = plansForCountry(slug).map((p) => {
      const q = priceFor(p, { countrySlug: slug });
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
    const from = startingFrom(slug);
    const detail = {
      slug: country.slug,
      name: country.name,
      flag: country.flag,
      region: country.region,
      regionSlug: country.regionSlug,
      capital: country.capital,
      currency: country.currency,
      timezone: country.timezone,
      network: country.network,
      speed: country.speed,
      fiveG: country.fiveG,
      coverage: country.coverage,
      lat: country.lat,
      lng: country.lng,
      partnerNetworks: country.partnerNetworks,
      activation: country.activation,
      supportedProducts: country.supportedProducts,
      tagline: country.tagline,
      tips: country.tips,
      startingFrom: from ? formatMoney(from) : null,
      plans,
    };
    return {
      content: [{ type: "text", text: JSON.stringify(detail, null, 2) }],
      structuredContent: detail,
    };
  },
});
