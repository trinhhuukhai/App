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


export const getAllProduct = () => async () => {
  try {
    const response = await axios.get(`http://192.168.43.199:8443/api/v1/product/getAllProduct`);
  return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getProductByCategory= async (id) => {
  try {
    const response = await axios.get(`http://192.168.43.199:8443/api/v1/category/${id}/product`);

    return response.data;
  } catch (error) {
    console.log(error);
  
    return null;
  }
};

export const orderFormCart= async (data) => {
  try {
    const response = await axios.post(`http://192.168.43.199:8443/api/v1/orderItem/insertFromCart`,data);

    return response.data;
  } catch (error) {
    console.log(error);
  
    return null;
  }
};

export const addToCart = async (data) => {
  try {
    const response = await axios.post(`http://192.168.43.199:8443/api/v1/cartItem/insert`,data);

    return response.data;
  } catch (error) {
    console.log(error);
  
    return null;
  }
};

export const paymentOrder = async (data) => {
  try {
    const response = await axios.post(`http://192.168.43.199:8443/api/v1/payment/insert`,data);
    return response.data;
  } catch (error) {
    console.log(error);
  
    return null;
  }
};


export const editCart = async (id,data) => {
  try {
    const response = await axios.put(`http://192.168.43.199:8443/api/v1/cartItem/${id}`,data);

    return response.data;
  } catch (error) {
    console.log(error);
  
    return null;
  }
};

export const getCartByUser = async (id) => {
  try {
    const response = await axios.get(`http://192.168.43.199:8443/api/v1/cartItem/user/${id}`);
  
    return response.data;
  } catch (error) {
    console.log(error);
  
    return null;
  }
};



export const deteleCart = async (id) => {
  try {
    const response = await axios.delete(`http://192.168.43.199:8443/api/v1/cartItem/${id}`);

    return response.data;
  } catch (error) {
    console.log(error);
  
    return null;
  }
};


export default slice.reducer;