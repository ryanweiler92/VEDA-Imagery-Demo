export const apiCalls = [
    {
        title: "List All Collections (GET)",
        url: "https://staging-stac.delta-backend.com/",
        description: "Returns a catelog. Get a list of all the available collections. This includes HLSL30.002. This is the STAC_API_URL in the HLS example in the VEDA Docs. links[19] == `HSL30.002 Environmental Justice Events`",
    },
    {
        title: "STAC API /search (GET)",
        url: "https://staging-stac.delta-backend.com/search",
        description: "STAC search. Returns a feature collections.",
    },
    {
        title: "Tile Request (GET)",
        url: "https://staging-raster.delta-backend.com/mosaic/7743bcb31bff7151aff7e5508785fce1/tilejson.json?minzoom=6&maxzoom=12&post_process=swir&assets=%5B%27B12%27%2C+%27B8A%27%2C+%27B04%27%5D",
        description: "Tile request for band assets for HLS S30. See specific details in postProcessingAlgorithm.ts",
    },
    {
        title: "Fetch an array of dates within timeframe of interest",
        url: "customRequest",
        description: "Search the STAC API to find the specific dates available within timeframe of interest.",
        customReference: "1",
    },
    {
        title: "Register search with Raster API",
        url: "customRequest",
        description: "Update the temporal range in search body and register that search with the Raster API. The registered search id can be reused for alternate map layer visualizations.",
        customReference: "2",
    },
    {
        title: "Use the built-in SWIR post processing algorithm",
        url: "customRequest",
        description: "Returns tiles from a tile request. Use the built-in SWIR post processing algorithm.",
        customReference: "3",
    }
  ];

  