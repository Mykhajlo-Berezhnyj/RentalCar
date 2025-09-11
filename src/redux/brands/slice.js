import { createSlice } from "@reduxjs/toolkit";
import { fetchBrands } from "./operations";

const handlePending = (state) => {
  state.isLoading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload || action.error.message;
};

const handleFulfilled = (state, action) => {
  state.isLoading = false;
  state.error = null;
  state.items = action.payload;
};

const sliceBrand = createSlice({
  name: "brands",
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBrands.pending, handlePending);
    builder.addCase(fetchBrands.fulfilled, handleFulfilled);
    builder.addCase(fetchBrands.rejected, handleRejected);
  },
});

export default sliceBrand.reducer;
