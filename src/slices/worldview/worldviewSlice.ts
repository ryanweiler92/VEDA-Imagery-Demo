import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';
import startingLayers from '../../worldview/config/availableLayers';
import { startingDate } from '../../worldview/selectors/selectors';

const initialState = {
  availableLayers: startingLayers,
  orderedLayers: [],
  date: startingDate,
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
      state.date = action.payload;
    },
  },
});

export const { setAvailableLayers, setOrderedLayers, setDate } = worldviewSlice.actions;
export default worldviewSlice.reducer;

