import React, {
  useState,
  useEffect,
  useRef,
  useReducer,
  useContext,
} from "react";
import OlTileGridWMTS from "ol/tilegrid/WMTS";
import TileGrid from "ol/tilegrid/TileGrid.js";
import XYZ from "ol/source/XYZ.js";
import { createXYZ } from "ol/tilegrid";
import OlLayerTile from "ol/layer/Tile";
import config from "../config/config";
import { get } from "ol/proj";
import {
  calcExtentsFromLimits,
  toISOStringSeconds,
  roundTimeOneMinute,
} from "../selectors/selectors";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import MapContext from "../mapLayout/MapContext";
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
} from "./OpenLayersParams";

const OpenLayersHLSLayers = () => {
  const layerResponse = useAppSelector(
    (state) => state.worldview.HLSL30LayerResponse
  );
  const location = useAppSelector((state) => state.worldview.requestLocation);
  const { map, layerData, setLayerData } = useContext(MapContext);
  const date = useAppSelector((state) => state.worldview.date);

  const projection = config.projections.geographic;

  useEffect(() => {
    if (!map) return;

    const XYZgrid = createXYZ({
      extent: projection.maxExtent,
      minZoom: 9,
    });

    const tileUrlFunction = (tileCoord) => {
      const { name } = layerResponse;
      const z = tileCoord[0] - 1;
      const x = tileCoord[1];
      const y = tileCoord[2];
      const url = `https://kv9drwgv6l.execute-api.us-west-2.amazonaws.com/mosaic/tiles/${name}/WGS1984Quad/${z}/${x}/${y}@1x?post_process=swir&assets=B07&assets=B05&assets=B04`;
      console.log(`z:${z} x:${x} y:${y}`);
      return url;
    };

    const xyzSourceOptions = {
      // url: URL,
      crossOrigin: "anonymous",
      // tileGrid: XYZgrid,
      minZoom: 9,
      projection: get("EPSG:4326"),
      // maxResolution: projection.resolutions[0],
      tileUrlFunction: tileUrlFunction,
    };

    const xyzSource = new XYZ(xyzSourceOptions);

    const xyzLayerTile = new OlLayerTile({
      source: xyzSource,
      className: "HLSL30.002",
    });
    // ------ END XYZ method ------

    map.addLayer(xyzLayerTile);
  }, [layerResponse]);

  return null;
};

export default OpenLayersHLSLayers;
