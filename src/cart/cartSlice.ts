import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '@src/products/ProductsTypes';
import { RootState } from '@src/store/store';
import { CartItem } from './CartTypes';

export type CartState = {
  cartItems: CartItem[];
};

const initialState: CartState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      const product = action.payload;
      const found = state.cartItems.find(
        (cartItem) => cartItem.info.id === product.id,
      );
      if (found) {
        found.count++;
      } else {
        state.cartItems.push({ info: product, count: 1 });
      }
    },
    removeProduct: (state, action: PayloadAction<Product>) => {
      const foundIndex = state.cartItems.findIndex(
        (cartItem) => cartItem.info.id === action.payload.id,
      );
      const found = state.cartItems[foundIndex];
      if (found) {
        found.count--;
        if (found.count < 1) {
          state.cartItems.splice(foundIndex, 1);
        }
      }
    },
    removeCartItem: (state, action: PayloadAction<Product>) => {
      state.cartItems = state.cartItems.filter(
        (cartItem) => cartItem.info.id !== action.payload.id,
      );
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});

export const { addProduct, removeProduct, removeCartItem, clearCart } =
  cartSlice.actions;

export const selectCartItems = (state: RootState) => state.cart.cartItems;

export const selectTotalPrice = (state: RootState) =>
  state.cart.cartItems.reduce((acc, cartItem) => {
    const totalProductPrice = cartItem.info.price * cartItem.count;
    return acc + totalProductPrice;
  }, 0);

export const selectProductsCount = (state: RootState) =>
  state.cart.cartItems.reduce((acc, cartItem) => {
    return acc + cartItem.count;
  }, 0);

export default cartSlice.reducer;
