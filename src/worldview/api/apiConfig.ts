export const apiCalls = [
    {
        title: "VEDA List All Collections",
        url: "https://staging-stac.delta-backend.com/",
        description: "Get a list of all the available collections for VEDA API`",
        applyToMap: false
    },
    // {
    //     title: "STAC API /search (GET)",
    //     url: "https://staging-stac.delta-backend.com/search/",
    //     description: "STAC search. Returns a feature collection.",
    //     applyToMap: false
    // },
    // {
    //     title: "FIRMS STAC API /search (GET)",
    //     url: "https://kv9drwgv6l.execute-api.us-west-2.amazonaws.com/search/",
    //     description: "STAC search. Returns a feature collection.",
    //     applyToMap: false
    // },
    // {
    //     title: "Tile Request (GET)",
    //     url: "https://staging-raster.delta-backend.com/mosaic/7743bcb31bff7151aff7e5508785fce1/tilejson.json?minzoom=6&maxzoom=12&post_process=swir&assets=%5B%27B12%27%2C+%27B8A%27%2C+%27B04%27%5D",
    //     description: "Tile request for band assets for HLS S30. See specific details in postProcessingAlgorithm.ts",
    //     applyToMap: false
    // },
    // {
    //     title: "Fetch an array of dates within timeframe of interest",
    //     url: "customRequest",
    //     description: "Search the STAC API to find the specific dates available within timeframe of interest.",
    //     customReference: "1",
    //     applyToMap: false
    // },
    // {
    //     title: "Register search with Raster API",
    //     url: "customRequest",
    //     description: "Update the temporal range in search body and register that search with the Raster API. The registered search id can be reused for alternate map layer visualizations.",
    //     customReference: "2",
    //     applyToMap: false
    // },
    {
        title: "VEDA Hurricane Ida SWIR (MAP)",
        url: "customRequest",
        description: "Imagery from VEDA API for 2021 Hurricane Ida using the built-in SWIR post processing algorithm, post_process=swir, assets=[B07/B05/B04]",
        customReference: "3",
        applyToMap: true
    },
    {
        title: "VEDA Hurricane Ida Color Map (MAP)",
        url: "customRequest",
        description: "Imagery from VEDA API for 2021 Hurricane Ida using color map & rescaling & expression, assets=B08/B04, expression=(B08-B04)/(B08+B04), rescale=0/1, colormap_name=rdylgn",
        customReference: "4",
        applyToMap: true
    },
    {
        title: "VEDA Hurricane Maria L30 (MAP)",
        url: "customRequest",
        description: "Imagery from the VEDA API for 2017 Hurricane Maria using color map & rescaling & expression, assets=B03/B05, expression=(B03-B05)/(B03+B05), rescale=0/1, colorMap=viridis",
        customReference: "5",
        applyToMap: true
    },
    // {
    //     title: "Custom SWIR Test (MAP)",
    //     url: "customRequest",
    //     description: "Imagery from 2017 of North East US using SWIR band combo B07, B05 & B04",
    //     customReference: "6",
    //     applyToMap: true
    // },
    {
        title: "FIRMS API HLSS30 Connecticut (MAP)",
        url: "customRequest",
        description: "collection=HLSS30, bbox=Connecticut, temporalRange=7/1/18-10/28/21, bandCombo=B07/B05/B04, post_process=swir, minzoom=9, maxzoom=14",
        customReference: "7",
        applyToMap: true
    },
    {
        title: "FIRMS API HLSL30 Oregon (MAP)",
        url: "customRequest",
        description: "collection=HLSS30, bbox=Oregon, temporalRange=7/1/18-10/28/21, bandCombo=B07/B05/B04 post_process=swir, minzoom=9, maxzoom=14",
        customReference: "8",
        applyToMap: true
    },
    // {
    //     title: "FIRMS API HLSL30 US (MAP)",
    //     url: "customRequest",
    //     description: "FIRMS. collection=HLSS30 bbox=UnitedStates, temporalRange=10/27/21-10/28/21 bandCombo=B07,B05,B04 post_process=swir minzoom=9 maxzoom=14",
    //     customReference: "9",
    //     applyToMap: true
    // },
    // {
    //     title: "FIRMS Asset List (Doesn't work yet)",
    //     // url: "https://d1nzvsko7rbono.cloudfront.net/mosaic/e327118c2abc8ae6389b91b804df6913/{z}/{x}/{y}/assets",
    //     url: "https://kv9drwgv6l.execute-api.us-west-2.amazonaws.com/mosaic/list",
    //     description: "Florida. Return a list of assets which overlap a given tile",
    //     customReference: "9",
    //     applyToMap: false
    // },
    // {
    //     title: "FIRMS Single Collection HLSL30 Oregon",
    //     url: "https://kv9drwgv6l.execute-api.us-west-2.amazonaws.com/search?collections=HLSL30&bbox=-124.56,41.92,-116.40,46.39&limit=100&datetime=2022-01-01T00:00:00Z/2022-01-01T23:59:59Z",
    //     description: "request Item objects from a single collection from the search endpoint, without having to using OGC API - Features",
    //     customReference: "9",
    //     applyToMap: false
    // },
    {
        title: "FIRMS API HLSL30 FL (MAP)",
        url: "customRequest",
        description: "collection=HLSS30, bbox=SouthFlorida, temporalRange=7/1/18-10/28/21, bandCombo=B07/B05/B04, post_process=swir, minzoom=9, maxzoom=14",
        customReference: "10",
        applyToMap: true
    },
    {
        title: "FIRMS HLSS No Bbox",
        url: "customRequest",
        description: "collection=HLSS30, bbox=n/a, temporalRange=7/1/18-10/28/21, bandCombo=B07/B05/B04, post_process=swir, minzoom=9, maxzoom=14, You should be able to pan anywhere on a Leaflet map and if zoomed enough should render tiles",
        customReference: "11",
        applyToMap: true
    },
    // {
    //     title: "Get Capabilities",
    //     url: "https://d1nzvsko7rbono.cloudfront.net/wmts?SERVICE=WMTS&REQUEST=GetCapabilities",
    //     description: "Get Capabilities",
    //     applyToMap: false
    // },

  ];

  