import React, { useState, useEffect, useRef, useReducer } from 'react';
import { MapContainer, TileLayer, useMap, Popup, Marker } from 'react-leaflet'
import { Icon } from "leaflet";
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import "./Map.css";

// setting initial values for state
const initialState = {
  lat: 45.4,
  lon: -75.7,
  zoom: 12,
  tileLayers: []
}

// defining types for state
type State = {
  lat: number;
  lon: number;
  zoom: number;
  tileLayers: any,
};

// defining types for actions
type Action =
  | { type: 'setLat'; payload: number }
  | { type: 'setLon'; payload: number }
  | { type: 'setZoom'; payload: number }
  | { type: 'addTileLayer'; payload: any}

// define actions in reducer
const reducer = (state: State, action: Action): State => {
  switch(action.type) {
    case 'setLat':
      return { ...state, lat: action.payload };
    case 'setLon':
      return { ...state, lon: action.payload };
    case 'setZoom': 
      return { ...state, zoom: action.payload };
    case 'addTileLayer':
      return { ...state, tileLayers: [...state.tileLayers, action.payload] };
    default: 
      console.error(`Unhandled action type`);
      return state;
  }
}

interface ExampleConfig {
  ida_bbox: Array<number>
  zoom_start: number,
  attr: string,
}

const exampleConfig: ExampleConfig = {
  ida_bbox : [-90.932637, 29.705366, -89.766437, 30.71627],
  zoom_start: 11,
  attr: "Mosaic",
}

const OpenStreetMap = () => {
  // define state and dispatch variables
  const [state, dispatch] = useReducer(reducer, initialState);
  // destructure properties from state
  const {
    lat,
    lon,
    zoom
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
  const addTileLayer = (dispatch, value) => {
    dispatch({ type: 'addTileLayer', payload: value});
  }

  const createTileLayer = (bounds, tiles, name,) => {

  }

  // get API response from redux
  const openStreetResponseLayer = useAppSelector((state) => state.worldview.openStreetLayerResponse);

  useEffect(() => {
      const {
        bounds,
        tiles,
        name
      } = openStreetResponseLayer;
      const {
        ida_bbox,
        zoom_start,
        attr
      } = exampleConfig

      createTileLayer(bounds, tiles, name,  )

  }, [openStreetResponseLayer])

  useEffect(() => {
    const {
      ida_bbox,
      zoom_start,
      attr
    } = exampleConfig

    const location = [(ida_bbox[1] + ida_bbox[3]) / 2,(ida_bbox[0] + ida_bbox[2]) / 2];

  })

  return (
    <MapContainer id="leaflet-container" center={[lat, lon]} zoom={zoom} scrollWheelZoom={true}>
      <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
    </MapContainer>
  );
};

export default OpenStreetMap;