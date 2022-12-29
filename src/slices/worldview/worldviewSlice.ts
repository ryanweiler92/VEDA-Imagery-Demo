import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';
import startingLayers from '../../worldview/config/availableLayers';
import { startingDate } from '../../worldview/selectors/selectors';

interface OpenStreetLayerResponse {
  bounds: Array<number>,
  center: Array<number>,
  maxzoom: number,
  minzoom: number,
  name: string,
  scheme: string,
  tilejson: string,
  tiles: Array<string>
  version: string
}

const openStreetLayerResponse: OpenStreetLayerResponse = {
  bounds: [],
  center: [],
  maxzoom: 0,
  minzoom: 0,
  name: '',
  scheme: '',
  tilejson: '',
  tiles: [],
  version: '',
}

const initialState = {
  availableLayers: startingLayers,
  orderedLayers: [],
  date: startingDate,
  openStreetLayerResponse: openStreetLayerResponse,
  openStreetRequestLocation: [],
  leafletZoom: 9,
}

export const worldviewSlice = createSlice({
  name: 'worldview',
  initialState,
  reducers: {
    setAvailableLayers: (state, action: PayloadAction<any>) => {
      state.availableLayers = action.payload
    },
    setOrderedLayers: (state, action: PayloadAction<any>) => {
      state.orderedLayers = action.payload
    },
    setDate: (state, action: PayloadAction<string>) => {
      state.date = action.payload
    },
    setOpenStreetLayerResponse: (state, action: PayloadAction<any>) => {
      state.openStreetLayerResponse = action.payload
    },
    setOpenStreetRequestLocation: (state, action: PayloadAction<any>) => {
      state.openStreetRequestLocation = action.payload
    },
    setLeafletZoom: (state, action: PayloadAction<number>) => {
      state.leafletZoom = action.payload
    } 
  },
});

export const { setAvailableLayers, setOrderedLayers, setDate, setOpenStreetLayerResponse, setOpenStreetRequestLocation, setLeafletZoom } = worldviewSlice.actions;
export default worldviewSlice.reducer;

