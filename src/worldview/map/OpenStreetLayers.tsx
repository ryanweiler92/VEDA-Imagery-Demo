import React, { useState, useEffect, useRef, useReducer } from 'react';
import { MapContainer, TileLayer, useMap, Popup, Marker } from 'react-leaflet'
import * as L from 'leaflet';

const OpenStreetLayers = ({ layerToAdd, addLayer, lat, lon, zoom }) => {
  // custom react-leaflet hook to access map object
  const map = useMap();

  // adds layer to map 
  useEffect(() => {
    if(!layerToAdd) return;
    const layer = new L.TileLayer(layerToAdd);
    layer.addTo(map);
    // setting state in parent component
    addLayer("");

    const newLocation = {lat: lat, lng: lon};
    
    map.flyTo(newLocation, zoom)
  }, [layerToAdd])

  return null;
}

export default OpenStreetLayers