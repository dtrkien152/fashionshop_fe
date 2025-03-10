// src/shared/reducer/authReducer.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartProduct } from '~/dto';

export interface ICartState {
  cartCode?: string;
  products: CartProduct[];
  openCart: boolean;
}

const initialState: ICartState = {
  products: [],
  openCart: false,
};

const authSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartCode: (state, action: PayloadAction<string>) => {
      state.cartCode = action.payload;
    },
    setProducts: (state, action: PayloadAction<CartProduct[]>) => {
      state.products = action.payload;
    },
    setOpenCart: (state, action: PayloadAction<boolean>) => {
      state.openCart = action.payload;
    },
    addToCart: (state, action: PayloadAction<CartProduct>) => {
      const index = state.products.findIndex(
        (product) =>
          product.productId === action.payload.productId &&
          product.color === action.payload.color &&
          product.size === action.payload.size
      );
      if (index === -1) {
        state.products.push(action.payload);
      } else {
        state.products[index].unit += action.payload.unit;
      }
    },
    removeFromCart: (
      state,
      action: PayloadAction<{
        productId: number;
        color: string;
        size: string;
      }>
    ) => {
      const index = state.products.findIndex(
        (product) =>
          product.productId === action.payload.productId &&
          product.color === action.payload.color &&
          product.size === action.payload.size
      );
      if (index !== -1) {
        state.products.splice(index, 1);
      }
    },
    resetCart: (state) => {
      state.products = [];
    },
    updateUnit: (
      state,
      action: PayloadAction<{
        productId: number;
        color: string;
        size: string;
        unit: number;
      }>
    ) => {
      const index = state.products.findIndex(
        (product) =>
          product.productId === action.payload.productId &&
          product.color === action.payload.color &&
          product.size === action.payload.size
      );
      if (index !== -1) {
        state.products[index].unit = action.payload.unit;
      }
    },
  },
});

export const { setCartCode, setProducts, setOpenCart, addToCart, removeFromCart, resetCart, updateUnit } =
  authSlice.actions;
export default authSlice.reducer;
