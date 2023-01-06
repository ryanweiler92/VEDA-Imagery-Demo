import React, { useState, useEffect, useRef, useReducer, useContext } from 'react';
import OlTileGridWMTS from "ol/tilegrid/WMTS";
import OlSourceWMTS from "ol/source/WMTS";
import TileJSON from 'ol/source/TileJSON.js';
import TileGrid from 'ol/tilegrid/TileGrid.js';
import XYZ from 'ol/source/XYZ.js';
import OlLayerTile from "ol/layer/Tile";
import config from '../config/config';
import {
  calcExtentsFromLimits,
  toISOStringSeconds,
  roundTimeOneMinute,
} from '../selectors/selectors';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import MapContext from '../mapLayout/MapContext';

const OpenLayersHLSLayers = () => {

  const layerResponse = useAppSelector((state) => state.worldview.HLSL30LayerResponse);
  const location = useAppSelector((state) => state.worldview.requestLocation);
  const { map, layerData, setLayerData} = useContext(MapContext);
  const date = useAppSelector((state) => state.worldview.date);

  useEffect(() => {
    if (!map) return;
    const currentLayers = map.getLayers();
    const layersArray = currentLayers.array_;
  }, [map]);

  const turnThisOff = true;

  useEffect(() => {
    if (!map || turnThisOff) return;
    // ------LAYER PROPS-------
    // This section will serve to mimic the layer props from AddWMTSLayer.tsx
    const id = "HLSL30.002";
    const format = "image/png"; // Can't find value from HLS tiles
    const matrixIds = undefined;
    const matrixSet = "2km" // Can't find value from HLS tiles
    const matrixSetLimits = undefined;
    const style = undefined;
    // ------END LAYER PROPS-------

    // ------OPTIONS VARIABLES-------
    const configSource = config.sources['GIBS:geographic'];
    const configMatrixSet = configSource.matrixSets[matrixSet]; // Relies on matrixSet prop (so probably incorrect)
    const layerDate = date;
    // The following variables would typically be destructured from configMatrixSet like the following line but I am going to set them manually here
    // const { tileMatrices, resolutions, tileSize } = configMatrixSet; 
    const tileMatrices = [
      { matrixWidth: 2, matrixHeight: 1 },
      { matrixWidth: 3, matrixHeight: 2 },
      { matrixWidth: 5, matrixHeight: 3 },
      { matrixWidth: 10, matrixHeight: 5 },
      { matrixWidth: 20, matrixHeight: 10 },
      { matrixWidth: 40, matrixHeight: 20 },
      { matrixWidth: 80, matrixHeight: 40 },
      { matrixWidth: 160, matrixHeight: 80 },
      { matrixWidth: 320, matrixHeight: 160 },
      { matrixWidth: 640, matrixHeight: 320 },
      { matrixWidth: 1280, matrixHeight: 640 },
      { matrixWidth: 2560, matrixHeight: 1280 },
      { matrixWidth: 5120, matrixHeight: 2560 }
    ]; // can't find these values in the HLS tile info
    const resolutions = [0.5625, 0.28125, 0.140625, 0.0703125, 0.03515625, 0.017578125, 0.0087890625, 0.00439453125, 0.002197265625, 0.0010986328125, 0.00054931640625, 0.000274658203125, 0.0001373291015625] // can't find these values in the HLS tile info
    const tileSize = [256, 256]; // confirmed this value from HLS tile info
    const day = 0; // not sure what this represents
    const selected = config.projections.geographic;
    // the following variables would be destructured from calcExtentsFromLimits but I am setting manually
    // const { origin, extent } = calcExtentsFromLimits(configMatrixSet, matrixSetLimits, day, selected);
    // const origin = [-120.48605, 44.1567]
    const origin = [-180, 90]
    // const extent = [-124.5654, 41.9209, -116.4067, 46.3925]
    const extent = [-180, -90, 180, 90]
    const sizes = !tileMatrices ? [] : tileMatrices.map(({ matrixWidth, matrixHeight }) => [matrixWidth, matrixHeight]);
    const urlParameters = `?TIME=${toISOStringSeconds(roundTimeOneMinute(layerDate))}`;
    const sourceURL = "https://kv9drwgv6l.execute-api.us-west-2.amazonaws.com/mosaic/tiles/cbbaa8a9dde25c4c3d1f932feca3f045/WebMercatorQuad/{z}/{x}/{y}@1x?post_process=swir&assets=B07&assets=B05&assets=B04"
    // ------END OPTION VARIABLES------

    const tileGridOptions = {
      origin: origin,
      extent: extent,
      sizes,
      resolutions,
      matrixIds: matrixIds || resolutions.map((set, index) => index),
      tileSize: tileSize[0],
    };

    const sourceOptions = {
      url: sourceURL,
      layer: id,
      cacheSize: 4096,
      crossOrigin: 'anonymous',
      format,
      transition: 0,
      matrixSet: configMatrixSet.id,
      tileGrid: new OlTileGridWMTS(tileGridOptions),
      wrapX: false,
      style: typeof style === 'undefined' ? 'default' : style,
    };

    const tileSource = new OlSourceWMTS(sourceOptions);

    

    const layerTile = new OlLayerTile({
      extent: extent,
      preload: 0,
      source: tileSource,
      className: id,
    });

    map.addLayer(layerTile);

    // componentWillUnmount
    return () => {
      if (map) {
          map.removeLayer(layerTile)
      }
    }
    
  }, [layerResponse])

  const dontRunThis2 = false

  useEffect(() => {
    if (!map || dontRunThis2) return;
    const { tiles } = layerResponse;
    const resolutions = [0.5625, 0.28125, 0.140625, 0.0703125, 0.03515625, 0.017578125, 0.0087890625, 0.00439453125, 0.002197265625]
    const matrixIds = undefined
    const style = undefined
    const matrixSet = "2km" 
    const configSource = config.sources['GIBS:geographic'];
    const configMatrixSet = configSource.matrixSets[matrixSet];

    const tileGridOptions = {
      // origin: [-180, 90],
      origin: [-72.08, 41.60],
      extent: [-73.7, 41.6, -71.8, 42.05],
      // extent: [-180, -90, 180, 90],
      tileSize: 256,
      resolutions,
      matrixIds: matrixIds || resolutions.map((set, index) => index),
      // matrixIds: ['EPSG:4326:0', 'EPSG:4326:1', 'EPSG:4326:2', 'EPSG:4326:3', 'EPSG:4326:4', 'EPSG:4326:5', 'EPSG:4326:6', 'EPSG:4326:7', 'EPSG:4326:8'],
    }

    const xyzTileGridOptions = {
      origin: [-72.08, 41.60],
      extent: [-73.7, 41.6, -71.8, 42.05],
      resolutions,
      tileSize: 256,
    }

    const presetFIRMSExample = "https://d1nzvsko7rbono.cloudfront.net/mosaic/tiles/4c640d25fd8dd78aef47721a71ee8e96/WGS1984Quad/9/561/132@1x?assets=B07&assets=B05&assets=B04&post_process=swir"
    const customLayerResponse = tiles[0]
    const chicagoURL = "https://d1nzvsko7rbono.cloudfront.net/mosaic/tiles/6a4836cf022708ca29819eb2a6fbc75f/WGS1984Quad/9/131/190@1x?assets=B07&assets=B05&assets=B04&post_process=swir"

    const ctURL = "https://kv9drwgv6l.execute-api.us-west-2.amazonaws.com/mosaic/tiles/287c7ac3d034019c51ec96dff14e4c6a/WGS1984Quad/{z}/{x}/{y}@1x?post_process=swir&assets=B07&assets=B05&assets=B04"
    const ctURL2 = "https://d1nzvsko7rbono.cloudfront.net/mosaic/tiles/287c7ac3d034019c51ec96dff14e4c6a/WGS1984Quad/{z}/{x}/{y}@1x?post_process=swir&assets=B07&assets=B05&assets=B04"

    const sourceOptions = {
      // url: "https://kv9drwgv6l.execute-api.us-west-2.amazonaws.com/mosaic/6112e654f98f9be580cb586832569457/tilejson.json",
      url: ctURL,
      // url: presetFIRMSExample,
      layer: "HLSL30.002",
      crossOrigin: 'anonymous',
      tileGrid: new OlTileGridWMTS(tileGridOptions),
      wrapX: false,
      style: typeof style === 'undefined' ? 'default' : style,
      matrixSet: 'EPSG:4326',
      format: 'image/png',
      tileLoadFunction: (imageTile, src) => {
        console.log('Tile loaded: ', src);
        console.log('Tile coordinates: ', imageTile.getTileCoord());
        console.log('Tile resolution: ', imageTile.getTileCoord()[0]);
      }
    }

    const xyzSourceOptions = {
      url: ctURL,
      crossOrigin: 'anonymous',
      tileGrid: new TileGrid(xyzTileGridOptions),
      projection: "EPSG:4326",
      tileLoadFunction: (imageTile, src) => {
        console.log('Tile loaded: ', src);
        console.log('Tile coordinates: ', imageTile.getTileCoord());
        console.log('Tile resolution: ', imageTile.getTileCoord()[0]);
      }
    }

    const tileSource = new OlSourceWMTS(sourceOptions);



    const xyzSource = new XYZ(xyzSourceOptions)

    const layerTile = new OlLayerTile({
      source: tileSource,
      className: "HLSL30.002",
      preload: 0,
    })

    const xyzLayerTile = new OlLayerTile({
      source: xyzSource,
      className: "HLSL30.002",
    })

    map.addLayer(xyzLayerTile)

  }, [layerResponse])

  return null;
}

export default OpenLayersHLSLayers;