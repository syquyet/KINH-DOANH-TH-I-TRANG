import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../slice/authSlice";
import productReducer from "../slice/productSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    products:productReducer
  },
});
export type RootState= ReturnType<typeof store.getState>