import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// axios.defaults.

const apiOrders = axios.create({
  baseURL: "http://localhost:3000/api",
  // baseURL: "https://tasteorama-backend-dcjy.onrender.com/api",
});

export const fetchAddOrders = createAsyncThunk(
  "order/fetchAddOrders",
  async (payload, thunkAPI) => {
    try {
      const response = await apiOrders.post("/orders", payload);
      console.log("🚀 ~ fetchAddOrders ~ response.data:", response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchOrders = createAsyncThunk(
  "order/fetchOrders",
  async (email, thunkAPI) => {
    try {
      const response = await axios.get(`/api/orders?email=${email}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.error || error.message);
    }
  }
);
