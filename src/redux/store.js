import { configureStore } from '@reduxjs/toolkit';
import AuthReducer from './slice/authSlice';
import thunk from 'redux-thunk';

const store = configureStore({
  reducer: {
    auth: AuthReducer,

  },
  middleware: [thunk],
});

export default store;
