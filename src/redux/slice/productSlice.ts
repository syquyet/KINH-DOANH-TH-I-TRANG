import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ProductEntity } from "../../entities/product.entity";

export interface ProductState {
  productDetail: ProductEntity | null;
  data: ProductEntity[];
}
const initialState: ProductState = {
  productDetail: null,
  data: [],
};
const productSlice = createSlice({
  name: "products",
  initialState: initialState,
  reducers: {
    getProduct: (state: ProductState, action: PayloadAction) => {
      state.data = action.payload as unknown as ProductEntity[];
    },
    getProductDetail: (state: ProductState, action: PayloadAction) => {
      state.productDetail = action.payload as unknown as ProductEntity;
    },
  },
});

export const { getProduct,getProductDetail } = productSlice.actions;
export default productSlice.reducer;
