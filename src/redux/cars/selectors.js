import { createSelector } from "@reduxjs/toolkit";

export const selectCars = (state) => state.cars.items;

export const selectFavorites = (state) => state.cars.favorites;

export const selectisLoading = (state) => state.cars.isLoading;

export const selectError = (state) => state.cars.error;

export const selectPagination = (state) => state.cars.pagination;

export const selectCarCurrent = (state) => state.cars.current;
