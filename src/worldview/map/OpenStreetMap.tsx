import React, { useState, useEffect, useRef, useReducer } from 'react';
import { MapContainer, TileLayer, useMap, Popup, Marker } from 'react-leaflet'
import { Icon } from "leaflet";
import { Box, Button, Flex, IconButton, Heading, List, ListItem, Text, Spinner, Spacer, Select } from "@chakra-ui/react";
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import "./Map.css";
import OpenStreetLayers from './OpenStreetLayers';

// setting initial values for state
const initialState = {
  lat: 28.3852,
  lon: -81.5639,
  zoom: 9,
  layerToAdd: "",
}

// defining types for state
type State = {
  lat: number;
  lon: number;
  zoom: number;
  layerToAdd: string,
};

// defining types for actions
type Action =
  | { type: 'setLat'; payload: number }
  | { type: 'setLon'; payload: number }
  | { type: 'setZoom'; payload: number }
  | { type: 'addLayer'; payload: string}

// define actions in reducer
const reducer = (state: State, action: Action): State => {
  switch(action.type) {
    case 'setLat':
      return { ...state, lat: action.payload };
    case 'setLon':
      return { ...state, lon: action.payload };
    case 'setZoom': 
      return { ...state, zoom: action.payload };
    case 'addLayer':
      return { ...state, layerToAdd: action.payload };
    default: 
      console.error(`Unhandled action type`);
      return state;
  }
}

const OpenStreetMap = () => {
  const mapRef = useRef();

  // define state and dispatch variables
  const [state, dispatch] = useReducer(reducer, initialState);
  // destructure properties from state
  const {
    lat,
    lon,
    zoom,
    layerToAdd
  } = state;
  // define functions to dispatch state from reducer
  const setLat = (lat: number) => {
    dispatch({ type: 'setLat', payload: lat})
  }
  const setLon = (lon: number) => {
    dispatch({ type: 'setLon', payload: lon})
  }
  const setZoom = (zoom: number) => {
    dispatch({ type: 'setZoom', payload: zoom})
  }
  const addLayer = (layerToAdd: string) => {
    dispatch({ type: 'addLayer', payload: layerToAdd});
  }

  // get API response from redux
  const openStreetResponseLayer = useAppSelector((state) => state.worldview.openStreetLayerResponse);

  const locationRequest = useAppSelector((state) => state.worldview.openStreetRequestLocation);

  // hook that listens for layer adding event and adds layer to map
  useEffect(() => {
      const {
        bounds,
        tiles,
        name
      } = openStreetResponseLayer;

      if(!name) return;

      // an array where index 0 == lat & index 1 == lon
      const location = [(locationRequest[1] + locationRequest[3]) / 2,(locationRequest[0] + locationRequest[2]) / 2];

      setLat(location[0]);
      setLon(location[1]);
      addLayer(tiles[0]);

  }, [openStreetResponseLayer]);

  const testFunction = () => {
    console.log(mapRef)
  }
  
  return (
    <>
    <Button onClick={testFunction} colorScheme='green'>Console</Button>
    <MapContainer ref={mapRef} center={[lat, lon]} zoom={zoom} scrollWheelZoom={true}  id="leaflet-container">
      <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <OpenStreetLayers 
      layerToAdd={layerToAdd} 
      addLayer={addLayer} 
      lat={lat} 
      lon={lon}
      zoom={zoom}
      />
    </MapContainer>
    </>
  );
};

export default OpenStreetMap;