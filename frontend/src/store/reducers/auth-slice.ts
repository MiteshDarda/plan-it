import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: null,
  token: null,
  username: null,
  id: null,
  isAuthenticated: false
} as {
  email: null | string;
  token: string | null;
  isAuthenticated: boolean;
  username: string | null;
  id: string | null;
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.username = action.payload.username;
      state.id = action.payload.id;
    },
    logout: () => initialState
  }
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
