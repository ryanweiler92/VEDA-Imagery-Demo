import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';
import { getUser } from '../../localStorage/localStorage';

const userFromLocalStorage = getUser();

interface UserState {
  token: string,
  email: string,
  firstName: string,
  lastName: string,
}

const initialState: UserState = userFromLocalStorage ? {
  token: userFromLocalStorage.token,
  email: userFromLocalStorage.email,
  firstName: userFromLocalStorage.firstName,
  lastName: userFromLocalStorage.lastName,
} : {
  token: "",
  email: "",
  firstName: "",
  lastName: "",
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<UserState>) => {
      return { ...action.payload }
    },
  },
});

export const { setUserInfo } = userSlice.actions;
export const selectUser = (state: RootState) => state.user;
export default userSlice.reducer;