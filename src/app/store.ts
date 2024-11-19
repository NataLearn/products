import { configureStore } from "@reduxjs/toolkit";

import productsReducer from "../slices/productsSlice";

export const store = configureStore({
  reducer: { products: productsReducer },
});

export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
