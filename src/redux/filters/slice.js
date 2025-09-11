import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  brand: null,
  price: null,
  minMileage: null,
  maxMileage: null,
};

const filtersSlice = createSlice({
  name: "filters",
  initialState: initialState,
  reducers: {
    setBrand(state, action) {
      state.brand = action.payload;
      console.log("🚀 ~ setBrand ~ state.brand:", state.brand)
    },
    setPrice(state, action) {
      state.price = action.payload;
    },
    setMinMileage(state, action) {
      state.minMileage = action.payload;
    },
    setMaxMileage(state, action) {
      state.maxMileage = action.payload;
    },
    resetFilters(state) {
      return initialState;
    },
  },
});

export const {
  setBrand,
  setPrice,
  setMinMileage,
  setMaxMileage,
  resetFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer;
