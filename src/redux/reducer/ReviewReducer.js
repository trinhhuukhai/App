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

export const getReviewByProduct= async (id) => {
  try {
    const response = await axios.get(`http://192.168.43.199:8443/api/v1/review/product/${id}`);
  
    return response.data;
  } catch (error) {
    console.log(error);
  
    return null;
  }
};

export const addReview = async (review) => {
  try {
      const response = await axios.post("http://192.168.43.199:8443/api/v1/review/insert", review)
      
      return response.data;
  } catch (error) {
    console.log(error);
  
    return null;
  }
}

export const editReviewPro = async (id,review) => {
  try {
      const response = await axios.put(`http://192.168.43.199:8443/api/v1/review/${id}`, review)
      
      return response.data;
  } catch (error) {
    console.log(error);
  
    return null;
  }
}

export const deteleReview = async (id) => {
  try {
    const response = await axios.delete(`http://192.168.43.199:8443/api/v1/review/${id}`);

    return response.data;
  } catch (error) {
    console.log(error);
  
    return null;
  }
};

export const getReviewById= async (id) => {
    try {
      const response = await axios.get(`http://192.168.43.199:8443/api/v1/review/${id}`);
    
      return response.data;
    } catch (error) {
      console.log(error);
    
      return null;
    }
  };



export default slice.reducer;