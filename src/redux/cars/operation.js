import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://car-rental-api.goit.global";

export const fetchCars = createAsyncThunk(
  "cars/fetchAll",
  async ({ page, filters = {} }, thunkAPI) => {
    try {
      const { brand, price, minMileage, maxMileage } = filters;
      const params = {
        page: page,
        limit: thunkAPI.getState().cars.pagination.limit,
        brand: brand || undefined,
        rentalPrice: price || undefined,
        minMileage: minMileage || undefined,
        maxMileage: maxMileage || undefined,
      };
      const response = await axios.get("/cars", { params });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const fetchCarById = createAsyncThunk(
  "cars/fetchCarById",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`/cars/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || error.message
      );
    }
  }
);
