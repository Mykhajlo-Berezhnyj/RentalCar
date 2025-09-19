import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import carsReducer from "./cars/slice";
import filtersReducer from "./filters/slice";
import ordersReducer from "./orders/slice";

const carsPersistConfig = {
  key: "cars",
  storage,
  whitelist: ["favorites"],
};

const ordersPersistConfig = {
  key: "orders",
  storage,
  whitelist: ["items"],
};

const persistedCarsReducer = persistReducer(carsPersistConfig, carsReducer);
const persistedOrdersReducer = persistReducer(
  ordersPersistConfig,
  ordersReducer
);

export const store = configureStore({
  reducer: {
    filters: filtersReducer,
    cars: persistedCarsReducer,
    orders: persistedOrdersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
