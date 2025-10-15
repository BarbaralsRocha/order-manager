import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthApi } from '../services/authApi';

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  token: sessionStorage.getItem('token'),
  isAuthenticated: !!sessionStorage.getItem('token'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ token: string }>) => {
      state.token = action.payload.token;
      state.isAuthenticated = true;
      sessionStorage.setItem('token', action.payload.token);
    },
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      sessionStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      AuthApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        state.token = payload.token;
        state.isAuthenticated = true;
        sessionStorage.setItem('token', payload.token);
      },
    );
  },
});

export const { setCredentials, logout } = authSlice.actions;
export const AuthReducer = authSlice.reducer;
