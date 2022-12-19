import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../slices/user/userSlice';
import worldviewReducer from '../slices/worldview/worldviewSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    worldview: worldviewReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
