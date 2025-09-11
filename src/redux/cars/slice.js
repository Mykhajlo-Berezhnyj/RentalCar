import { createSlice, current } from "@reduxjs/toolkit";
import { fetchCarById, fetchCars } from "./operation";

const handlePending = (state) => {
  state.isLoading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload || action.error.message;
};

const handleFulfilled = (state, action) => {
  const payloadData = action.payload.data;
  const { cars: carsArray, totalCars, page, totalPages } = payloadData;
  state.items =
    state.pagination.page === 1 ? carsArray : [...state.items, ...carsArray];
  state.pagination = {
    totalCars,
    page,
    totalPages,
  };
  state.isLoading = false;
  state.error = null;
};

const slice = createSlice({
  name: "cars",
  initialState: {
    items: [],
    favorites: [],
    current: null,
    pagination: {
      totalCars: null,
      page: 1,
      limit: 12,
      totalPages: 1,
    },
    isLoading: false,
    error: null,
  },
  reducers: {
    resetCarsState: (state) => {
      state.items = [];
      state.pagination = {
        totalCars: 0,
        page: 1,
        limit: 12,
        totalPages: 0,
      };
    },
    setPage(state, action) {
      state.pagination.page = action.payload;
    },
    setLimit(state, action) {
      state.pagination.limit = action.payload;
    },
    nextPage(state) {
      state.pagination.page += 1;
    },
    setFavorites(state, action) {
      const cardId = action.payload;
      const hasFavorite = state.favorites.includes(cardId);
      if (hasFavorite) {
        state.favorites = state.favorites.filter((id) => id !== cardId);
      } else {
        state.favorites.push(cardId);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.pending, handlePending)
      .addCase(fetchCars.fulfilled, handleFulfilled)
      .addCase(fetchCars.rejected, handleRejected)
      .addCase(fetchCarById.pending, handlePending)
      .addCase(fetchCarById.fulfilled, (state, action) => {
        state.current = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchCarById.rejected, handleRejected);
  },
});

export const { setPage, setLimit, nextPage, resetCarsState, setFavorites } =
  slice.actions;

export default slice.reducer;
