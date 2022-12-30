import React, { useState, useEffect, useRef, useReducer, useContext } from 'react';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import MapContext from '../mapLayout/MapContext';

const OpenLayersHLSLayers = () => {

  const layerResponse = useAppSelector((state) => state.worldview.HLSL30LayerResponse);
  const location = useAppSelector((state) => state.worldview.requestLocation);
  const { map, layerData, setLayerData} = useContext(MapContext);

  useEffect(() => {
    if (!map) return;
    const currentLayers = map.getLayers();
    const layersArray = currentLayers.array_;
    // console.log(layersArray);
  }, [map]);

  useEffect(() => {
    // console.log(layerResponse);
  }, [layerResponse])

  return null;
}

export default OpenLayersHLSLayers;