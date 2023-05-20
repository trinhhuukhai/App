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


export const getAllProduct = async () => {
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

export const getProductByShop= async (id) => {
  try {
    const response = await axios.get(`http://192.168.43.199:8443/api/v1/shop/${id}/product`);

    return response.data;
  } catch (error) {
    console.log(error);
  
    return null;
  }
};

export const addProduct = async (data) => {
  try {
    const response = await axios.post(`http://192.168.43.199:8443/api/v1/product/insert`,data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  
    return null;
  }
};


export const editProduct = async (id,data) => {
  try {
    const response = await axios.put(`http://192.168.43.199:8443/api/v1/product/${id}`,data);
    return response.data;
  } catch (error) {
    console.log(error);
  
    return null;
  }
};

export const getProductId = async (id) => {
  try {
    const response = await axios.get(`http://192.168.43.199:8443/api/v1/product/${id}`);

    return response.data;
  } catch (error) {
    console.log(error);
  
    return null;
  }
};

export const getProductSold = async () => {
  try {
    const response = await axios.get(`http://192.168.43.199:8443/api/v1/product/sold`);

    return response.data;
  } catch (error) {
    console.log(error);
  
    return null;
  }
};

export const getProductById= async (id) => {
  try {
    const response = await axios.get(`http://192.168.43.199:8443/api/v1/product/${id}`);

    return response.data;
  } catch (error) {
    console.log(error);
  
    return null;
  }
};

export const deteleProduct = async (id) => {
  try {
    const response = await axios.delete(`http://192.168.43.199:8443/api/v1/product/${id}`);

    return response.data;
  } catch (error) {
    console.log(error);
  
    return null;
  }
};


export default slice.reducer;