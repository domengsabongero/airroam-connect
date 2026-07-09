import { defineMcp } from "@lovable.dev/mcp-js";
import listDestinations from "./tools/list-destinations";
import getDestination from "./tools/get-destination";
import listPlans from "./tools/list-plans";
import recommendPlan from "./tools/recommend-plan";
import listRegions from "./tools/list-regions";

export default defineMcp({
  name: "air-roam-mcp",
  title: "Air-Roam",
  version: "0.1.0",
  instructions:
    "Air-Roam travel connectivity catalog. Use these tools to browse destinations, regions, and eSIM / travel SIM / pocket WiFi plans, and to recommend the best plan for a trip. All prices are in PHP.",
  tools: [listDestinations, getDestination, listPlans, recommendPlan, listRegions],
});
