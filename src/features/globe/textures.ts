/**
 * Earth textures — sourced from the three-globe example bundle (CORS-enabled,
 * long-lived, Blue Marble NASA imagery). The globe engine treats these as the
 * canonical layer; swap the URLs to self-host without touching any component.
 */
export const TEX = {
  earthDay: "https://cdn.jsdelivr.net/npm/three-globe@2.31.1/example/img/earth-blue-marble.jpg",
  earthBump: "https://cdn.jsdelivr.net/npm/three-globe@2.31.1/example/img/earth-topology.png",
  earthSpec: "https://cdn.jsdelivr.net/npm/three-globe@2.31.1/example/img/earth-water.png",
  clouds:
    "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_clouds_1024.png",
} as const;
