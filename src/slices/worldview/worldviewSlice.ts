import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';
import startingLayers from '../../worldview/config/availableLayers';
import { startingDate } from '../../worldview/selectors/selectors';

interface HLSL30LayerResponse {
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

const HLSL30LayerResponse: HLSL30LayerResponse = {
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
  HLSL30LayerResponse: HLSL30LayerResponse,
  requestLocation: [],
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
    setHLSL30LayerResponse: (state, action: PayloadAction<any>) => {
      state.HLSL30LayerResponse = action.payload
    },
    setRequestLocation: (state, action: PayloadAction<any>) => {
      state.requestLocation = action.payload
    },
    setLeafletZoom: (state, action: PayloadAction<number>) => {
      state.leafletZoom = action.payload
    } 
  },
});

export const { setAvailableLayers, setOrderedLayers, setDate, setHLSL30LayerResponse, setRequestLocation, setLeafletZoom } = worldviewSlice.actions;
export default worldviewSlice.reducer;

