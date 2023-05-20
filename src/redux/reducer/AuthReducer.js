import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const slice = createSlice({
  name: 'data',
  initialState: null,
  reducers: {
    setData: (state, action) => {
      return action.payload;
    },
    clearData: (state, action) => {
      return null;
    },
  },
});

export const { setData, clearData } = slice.actions;

export const loginUser = async (user) => {
  try {
    const response = await axios.post('http://192.168.43.199:8443/api/v1/authenticate', user);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getUser = async () => {
  try {
    const response = await axios.get('http://192.168.43.199:8443/api/v1/byRole/USER');
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getUserById = async (id) => {
  try {
    const response = await axios.get(`http://192.168.43.199:8443/api/v1/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const editUser = async (id, data) => {
  try {
    const response = await axios.put(`http://192.168.43.199:8443/api/v1/customer/${id}`, data);
    
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const changePassw = async (id, data) => {
  try {
    const response = await axios.put(`http://192.168.43.199:8443/api/v1/customer/${id}/password`, data);
    
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};



export default slice.reducer;
