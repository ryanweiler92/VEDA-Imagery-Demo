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
        title: "Search STAC API for dates within timeframe",
        url: "customRequest",
        description: "Search the STAC API to find the specific dates available within timeframe of interest.",
        customReference: "1"
    }
  ];

  