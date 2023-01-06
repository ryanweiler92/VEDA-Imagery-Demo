import React, { useState, useEffect, useRef, useReducer } from 'react';
import { MapContainer, TileLayer, useMap, Popup, Marker } from 'react-leaflet'
import * as L from 'leaflet';
import { useAppSelector, useAppDispatch } from '../../store/hooks';

const LeafletLayers = ({ layerToAdd, addLayer, lat, lon, zoom, flyTrigger, setFlyTrigger }) => {
  // custom react-leaflet hook to access map object
  const map = useMap();

  const leafletZoom = useAppSelector((state) => state.worldview.leafletZoom);

  // adds layer to map 
  useEffect(() => {
    if(!layerToAdd) return;
    // console.log(layerToAdd)
    const layer = new L.TileLayer(layerToAdd);
    // console.log('layerToAdd', layerToAdd)
    // console.log('layer', layer)
    layer.addTo(map);
    // setting state in parent component
    addLayer("");

    const newLocation = {lat: lat, lng: lon};
    
    map.flyTo(newLocation, leafletZoom);
  }, [layerToAdd]);

  // for testing bbox location coords
  // noreast bbox
  const testCoords = [-80.8715, 39.3752, -66.0202, 47.1953];
  const leafletMapPls = useMap()

  useEffect(() => {
    // if(flyTrigger){
    //   const location = [(testCoords[1] + testCoords[3]) / 2,(testCoords[0] + testCoords[2]) / 2];
    //   const newLocation = {lat: location[0], lng: location[1]}
    //   map.flyTo(newLocation, 6);
    //   setFlyTrigger(false);
    // }
    if(flyTrigger){
      
      setFlyTrigger(false);
    }
  }, [flyTrigger])

  return null;
}

export default LeafletLayers