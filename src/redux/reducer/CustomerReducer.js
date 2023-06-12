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

export const deleteCustomer = async (id) => {

  try {
    const res = await axios.delete(`http://192.168.43.199:8443/api/v1/customer/${id}`)

    return res.data;

  } catch (error) {
    console.log(error);

    return null;
  }
}


export const getOrderByIdUser = async (id) => {
  try {
    const response = await axios.get(`http://192.168.43.199:8443/api/v1/${id}/order`);

    return response.data;
  } catch (error) {
    console.log(error);

    return null;
  }
};

export const getWalletById = async (id, token) => {
  try {
    const response = await axios.get(`http://192.168.43.199:8443/api/v1/wallet/${id}`, {
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

export const TopupWallet = async (id, balance, token) => {
  try {
    const response = await axios.post(
      `http://192.168.43.199:8443/api/v1/wallet/${id}/top-up?balance=${balance}`,
      null,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
   
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};


export default slice.reducer;