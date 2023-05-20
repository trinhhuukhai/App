import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: null,
  loading: false,
  error: null,
  out:null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action) {
      state.data = action.payload;
      state.loading = false;
    },
    loginError(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    logoutStart(state) {
        state.loading = true;
        state.error = null;
      },
      logoutSuccess(state, action) {
        state.out = action.payload;
        state.loading = false;
      },
      logoutError(state, action) {
        state.error = action.payload;
        state.loading = false;
      },
  },
});

export const { loginStart, loginSuccess, loginError,logoutStart, logoutSuccess, logoutError } = authSlice.actions;

export default authSlice.reducer;
