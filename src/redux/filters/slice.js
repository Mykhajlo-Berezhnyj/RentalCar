import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  brand: null,
  rentalPrice: null,
  minMileage: null,
  maxMileage: null,
};

const filtersSlice = createSlice({
  name: "filters",
  initialState: initialState,
  reducers: {
    setBrand(state, action) {
      state.brand = action.payload;
    },
    setRentalPrice(state, action) {
      state.rentalPrice = action.payload;
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
  setRentalPrice,
  setMinMileage,
  setMaxMileage,
  resetFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer;
