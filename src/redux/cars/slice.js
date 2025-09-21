import { createSlice } from "@reduxjs/toolkit";
import { fetchCarById, fetchCars } from "./operation";

const handlePending = (state) => {
  state.isLoading = true;
  state.status = "loading";
  state.error = null;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.status = "failed";
  state.error = action.payload || action.error.message;
};

const handleFulfilled = (state, action) => {
  const payloadData = action.payload;
  const { cars: carsArray, totalCars, page, totalPages } = payloadData;
  state.items =
    Number(state.pagination.page) === 1
      ? carsArray
      : [...state.items, ...carsArray];
  state.pagination = {
    ...state.pagination,
    totalCars,
    page: Number(page),
    totalPages: Number(totalPages),
  };
  state.isLoading = false;
  state.status = "succeeded";
  state.error = null;
};

const initialState = {
  items: [],
  favorites: [],
  current: null,
  hasSearch: false,
  pagination: {
    totalCars: null,
    page: 1,
    limit: 12,
    totalPages: 1,
  },
  status: "idle",
  isLoading: false,
  error: null,
};

const slice = createSlice({
  name: "cars",
  initialState: initialState,
  reducers: {
    resetCarsState: (state) => {
      state.items = [];
      state.status = "idle";
      state.pagination = {
        ...state.pagination,
        totalCars: 0,
        page: 1,
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
      state.pagination.page = Number(state.pagination.page) + 1;
    },
    setFavorites(state, action) {
      const car = action.payload;
      const exist = state.favorites.some((fav) => fav.id === car.id);

      state.favorites = exist
        ? state.favorites.filter((fav) => fav.id !== car.id)
        : [...state.favorites, car];
    },
    setUpdateFavorites(state, action) {
      const fav = action.payload;
      const favIndex = state.favorites.findIndex((f) => f._id === fav.id);
      if (favIndex !== -1) {
        state.favorites[favIndex] = fav;
      }
    },
    setHasSearch(state, action) {
      state.hasSearch = action.payload;
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

export const {
  setPage,
  setLimit,
  nextPage,
  resetCarsState,
  setFavorites,
  setHasSearch,
  setUpdateFavorites,
} = slice.actions;

export default slice.reducer;
