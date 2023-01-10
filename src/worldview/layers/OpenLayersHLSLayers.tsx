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
import { 
  configSources,
  configMatrixSets,
  extents, 
  matrixIds,
  matrixSets,
  origins, 
  resolutions,
  style, 
  urls, 
} from './OpenLayersParams'

const OpenLayersHLSLayers = () => {

  const layerResponse = useAppSelector((state) => state.worldview.HLSL30LayerResponse);
  const location = useAppSelector((state) => state.worldview.requestLocation);
  const { map, layerData, setLayerData} = useContext(MapContext);
  const date = useAppSelector((state) => state.worldview.date);

  useEffect(() => {
    if (!map) return;
    console.log("GOGOGO")
    const { tiles } = layerResponse;
    const customResponse = tiles[0]
    // custom response looks like 
    // https://kv9drwgv6l.execute-api.us-west-2.amazonaws.com/mosaic/tiles/287c7ac3d034019c51ec96dff14e4c6a/WebMercatorQuad/{z}/{x}/{y}@1x?post_process=swir&assets=B07&assets=B05&assets=B04

    const { baseURL1, baseURL2, ctURL1, ctURL2, presetFIRMS, ctTileEx, test } = urls
    const { worldOrigin, ctOrigin } = origins
    const { worldExtent, ctExtent } = extents
    const { nineResolutions } = resolutions
    const { twoKmMatrixSet } = matrixSets

    // ------ XYZ method ------
    const xyzTileGridOptions = {
      origin: ctOrigin,
      extent: ctExtent,
      resolutions: nineResolutions,
      tileSize: 256,
    }

    const xyzSourceOptions = {
      url: test,
      crossOrigin: 'anonymous',
      // tileGrid: new TileGrid(xyzTileGridOptions),
      projection: "EPSG:4326",
      tileLoadFunction: (imageTile, src) => {
        imageTile.getImage().src = src;
        console.log('Tile loaded: ', src);
        console.log('Tile coordinates: ', imageTile.getTileCoord());
        console.log('Tile resolution: ', imageTile.getImage());
      }
    }

    const xyzSource = new XYZ(xyzSourceOptions)

    const xyzLayerTile = new OlLayerTile({
      source: xyzSource,
      className: "HLSL30.002",
    })
    // ------ END XYZ method ------

    map.addLayer(xyzLayerTile)

  }, [layerResponse])

  return null;
}

export default OpenLayersHLSLayers;