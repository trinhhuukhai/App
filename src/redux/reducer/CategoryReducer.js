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

export const getAllCategory = async () => {
  try {
    const response = await axios.get(`http://192.168.43.199:8443/api/v1/category/getAllCategory`);

    return response.data;
  } catch (error) {
    console.log(error);
  
    return null;
  }
};

export const deteleCategory = async (id) => {
  try {
    const response = await axios.delete(`http://192.168.43.199:8443/api/v1/category/${id}`);

    return response.data;
  } catch (error) {
    console.log(error);
  
    return null;
  }
};

export const addCategory = async (data) => {
  try {
    const response = await axios.post(`http://192.168.43.199:8443/api/v1/category/insert`,data);

    return response.data;
  } catch (error) {
    console.log(error);
  
    return null;
  }
};

export const editCategory = async (id,data) => {
  try {
    const response = await axios.put(`http://192.168.43.199:8443/api/v1/category/${id}`,data);
    return response.data;
  } catch (error) {
    console.log(error);
  
    return null;
  }
};

export const getCategoryId = async (id) => {
  try {
    const response = await axios.get(`http://192.168.43.199:8443/api/v1/category/${id}`);

    return response.data;
  } catch (error) {
    console.log(error);
  
    return null;
  }
};



export default slice.reducer;