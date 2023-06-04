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

export const getAllOrder = async (id) => {
  try {
    const response = await axios.get(`http://192.168.43.199:8443/api/v1/shop/${id}/orderItem`);

    return response.data;
  } catch (error) {
    console.log(error);
  
    return null;
  }
};

export const getPaymentTotal = async (id) => {
  try {
    const response = await axios.get(`http://192.168.43.199:8443/api/v1/shop/${id}/payment`);
    return response.data;
  } catch (error) {
    console.log(error);
  
    return null;
  }
};

export const getOrderById = async (id) => {
  try {
    const response = await axios.get(`http://192.168.43.199:8443/api/v1/order/${id}/orderItem`);

    return response.data;
  } catch (error) {
    console.log(error);
  
    return null;
  }
};


export const getOrderByUser = async (id) => {
  try {
    const response = await axios.get(`http://192.168.43.199:8443/api/v1/${id}/order`);

    return response.data;
  } catch (error) {
    console.log(error);
  
    return null;
  }
};

export const getOrderItemByOId = async (id) => {
  try {
    const response = await axios.get(`http://192.168.43.199:8443/api/v1/order/${id}/orderItem`);

    return response.data;
  } catch (error) {
    console.log(error);
  
    return null;
  }
};

export const getOrderByTime = async (time,id) => {
  try {
    const response = await axios.get(`http://192.168.43.199:8443/api/v1/orderItem/${time}?shopId=${id}`);

    return response.data;
  } catch (error) {
    console.log(error);
  
    return null;
  }
};


export const confirmOrderStatus = async (id,data) => {
  try {
    const response = await axios.put(`http://192.168.43.199:8443/api/v1/orderItem/${id}`, data);
  
    return response.data;
  } catch (error) {
    console.log(error);
  
    return null;
  }
};


export const cancelOrder = async (id,status) => {
  try {
    const response = await axios.put(`http://192.168.43.199:8443/api/v1/order/${id}/status?status=${status}`);
    
    return response.data;
  } catch (error) {
    console.log(error);
  
    return null;
  }
};

export const refundPayment = async (id) => {
  try {
    const response = await axios.put(`http://192.168.43.199:8443/api/v1/orderItem/{id}/refund?status=Hoàn tiền`);
    
    return response.data;
  } catch (error) {
    console.log(error);
  
    return null;
  }
};
export default slice.reducer;