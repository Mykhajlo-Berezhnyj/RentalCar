import { createSlice } from "@reduxjs/toolkit";
import { fetchAddOrders, fetchOrders } from "./operations";
import slice from "../filters/slice";

const handlePending = (state) => {
  state.isLoading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload || action.error.message;
};

const initialState = {
  items: [],
  isLoading: false,
  error: null,
};

const orderSlice = createSlice({
  name: "orders",
  initialState: initialState,
  reducers: {
    clearOrders: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, handlePending)
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchOrders.rejected, handleRejected)
      .addCase(fetchAddOrders.pending, handlePending)
      .addCase(fetchAddOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        console.log("payload.data", action.payload.data);
        state.items.push(action.payload.data);
      })
      .addCase(fetchAddOrders.rejected, handleRejected);
  },
});

export const {clearOrders} =orderSlice.actions;

export default orderSlice.reducer;
