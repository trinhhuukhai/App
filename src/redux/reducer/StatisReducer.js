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

export const getDataInDay = async (date) => {
  try {
    const response = await axios.get(`http://192.168.43.199:8443/api/v1/order/date?status=3&startDate=${date}`);


    return response.data;
  } catch (error) {
    console.log(error);

    return null;
  }
};

export const getStaticPayment = async (shop, token) => {
  try {
    const response = await axios.get(`http://192.168.43.199:8443/api/v1/shop/${id}/payment`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });


    return response.data;
  } catch (error) {
    console.log(error);

    return null;
  }
};

export const getDataInMonth = async (date) => {
  try {
    const response = await axios.get(`http://192.168.43.199:8443/api/v1/order/find?status=3&${date}`);

    return response.data;
  } catch (error) {
    console.log(error);

    return null;
  }
};

export const getTotalStatic = async (z) => {
  try {
    const response = await axios.get(`http://192.168.43.199:8443/api/v1/payment/count`);

    return response.data;
  } catch (error) {
    console.log(error);

    return null;
  }
};


export default slice.reducer;