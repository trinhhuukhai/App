import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const slice = createSlice({
  name: 'data',
  initialState: [],
  reducers: {
    setData: (state, action) => {
      return action.payload;
    },
  },
});

export const { setData } = slice.actions;

export const getAllCustomer = async (id) => {
  try {
    const response = await axios.get(`http://192.168.43.199:8443/api/v1/shop/${id}/customer`);

    return response.data;
  } catch (error) {
    console.log(error);
  
    return null;
  }
};


export const getOrderByIdUser = async (id) => {
  try {
    const response = await axios.get(`http://192.168.43.199:8443/api/v1/${id}/order`);

    return response.data;
  } catch (error) {
    console.log(error);
  
    return null;
  }
};


export default slice.reducer;