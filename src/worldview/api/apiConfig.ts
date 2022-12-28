export const apiCalls = [
    {
        title: "List All Collections (GET)",
        url: "https://staging-stac.delta-backend.com/",
        description: "Returns a catalog. Get a list of all the available collections. This includes HLSL30.002. This is the STAC_API_URL in the HLS example in the VEDA Docs. links[19] == `HSL30.002 Environmental Justice Events`",
        applyToMap: false
    },
    {
        title: "STAC API /search (GET)",
        url: "https://staging-stac.delta-backend.com/search",
        description: "STAC search. Returns a feature collection.",
        applyToMap: false
    },
    {
        title: "Tile Request (GET)",
        url: "https://staging-raster.delta-backend.com/mosaic/7743bcb31bff7151aff7e5508785fce1/tilejson.json?minzoom=6&maxzoom=12&post_process=swir&assets=%5B%27B12%27%2C+%27B8A%27%2C+%27B04%27%5D",
        description: "Tile request for band assets for HLS S30. See specific details in postProcessingAlgorithm.ts",
        applyToMap: false
    },
    {
        title: "Fetch an array of dates within timeframe of interest",
        url: "customRequest",
        description: "Search the STAC API to find the specific dates available within timeframe of interest.",
        customReference: "1",
        applyToMap: false
    },
    {
        title: "Register search with Raster API",
        url: "customRequest",
        description: "Update the temporal range in search body and register that search with the Raster API. The registered search id can be reused for alternate map layer visualizations.",
        customReference: "2",
        applyToMap: false
    },
    {
        title: "Hurricane Ida SWIR (MAP)",
        url: "customRequest",
        description: "Imagery from 2021 Hurricane Ida using the built-in SWIR post processing algorithm. post_process=swir, assets=[B07, B05, B04]",
        customReference: "3",
        applyToMap: true
    },
    {
        title: "Hurricane Ida Color Map (MAP)",
        url: "customRequest",
        description: "Imagery from 2021 Hurricane Ida using color map, rescaling & expression. assets=[B08, B04], expression=(B08-B04)/(B08+B04) rescale=0,1, colormap_name=rdylgn",
        customReference: "4",
        applyToMap: true
    },
    {
        title: "Hurricane Maria L30 (MAP)",
        url: "customRequest",
        description: "Imagery from 2017 Hurricane Maria using color map, rescaling & expression. assets=[B03, B05] expression=(B03-B05)/(B03+B05) rescale=0,1 colorMap=viridis",
        customReference: "5",
        applyToMap: true
    }
  ];

  