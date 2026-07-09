import { defineTool } from "@lovable.dev/mcp-js";
import { regions } from "@/data/regions";
import { countries } from "@/data/countries";

export default defineTool({
  name: "list_regions",
  title: "List regions",
  description: "List Air-Roam coverage regions with the destinations included in each.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const list = regions.map((r) => ({
      slug: r.slug,
      name: r.name,
      description: r.description,
      destinations: countries
        .filter((c) => c.regionSlug === r.slug)
        .map((c) => ({ slug: c.slug, name: c.name })),
    }));
    return {
      content: [{ type: "text", text: JSON.stringify(list, null, 2) }],
      structuredContent: { regions: list },
    };
  },
});
