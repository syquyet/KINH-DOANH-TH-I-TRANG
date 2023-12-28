import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ProductEntity } from "../../entities/product.entity";
export interface UserLogin {
  id: number | undefined;
  name: string | undefined;
  email: string | undefined;
  address: string | undefined;
  avatar: string | undefined;
  role: string | undefined;
  phone: string | undefined;
}
export interface AuthState {
  isLoggedIn: boolean;
  user: UserLogin | null | undefined;
  loading: boolean;
}
const initialState: AuthState = {
  isLoggedIn: false,
  user: null,
  loading: false,
};
const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<UserLogin>) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
  },
});
export const { loginSuccess } = authSlice.actions;
export default authSlice.reducer;
