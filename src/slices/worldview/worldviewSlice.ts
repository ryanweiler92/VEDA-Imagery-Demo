import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';
import startingLayers from '../../worldview/config/availableLayers';
import { startingDate } from '../../worldview/selectors/selectors';

const initialState = {
  availableLayers: startingLayers,
  layerData: [] as string[],
  orderedLayers: [] as string[],
  date: startingDate,
  obama: "",
}

export const worldviewSlice = createSlice({
  name: 'worldview',
  initialState,
  reducers: {
    setAvailableLayers: (state, action: PayloadAction<any>) => {
      state.availableLayers = action.payload
    },
    setLayerData: (state, action: PayloadAction<string[]>) => {
      state.layerData = action.payload
    },
    setObama: (state, action: PayloadAction<string>) => {
      state.obama = action.payload
    },
    setDate: (state, action: PayloadAction<Date>) => {
      state.date = action.payload
    }
  },
});

export const { setAvailableLayers, setLayerData, setObama, setDate } = worldviewSlice.actions;
export default worldviewSlice.reducer;

