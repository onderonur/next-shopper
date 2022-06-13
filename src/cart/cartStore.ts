import { Product } from '@src/products/ProductsTypes';
import { createSelectors } from '@src/store/StoreUtils';
import create from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { CartItem } from './CartTypes';

type CartState = {
  cartItems: CartItem[];
  addProduct: (product: Product) => void;
  removeProduct: (product: Product) => void;
  removeCartItem: (product: Product) => void;
  clearCart: VoidFunction;
};

export const useCartStore = create(
  immer<CartState>((set) => ({
    cartItems: [],
    addProduct: (product: Product) =>
      set((state) => {
        const found = state.cartItems.find(
          (cartItem) => cartItem.info.id === product.id,
        );
        if (found) {
          found.count++;
        } else {
          state.cartItems.push({ info: product, count: 1 });
        }
      }),
    removeProduct: (product) =>
      set((state) => {
        const foundIndex = state.cartItems.findIndex(
          (cartItem) => cartItem.info.id === product.id,
        );
        const found = state.cartItems[foundIndex];
        if (found) {
          found.count--;
          if (found.count < 1) {
            state.cartItems.splice(foundIndex, 1);
          }
        }
      }),
    removeCartItem: (product) =>
      set((state) => {
        state.cartItems = state.cartItems.filter(
          (cartItem) => cartItem.info.id !== product.id,
        );
      }),
    clearCart: () =>
      set((state) => {
        state.cartItems = [];
      }),
  })),
);

export const cartSelectors = {
  ...createSelectors(useCartStore),
  totalPrice: (state: CartState) => {
    return state.cartItems.reduce((acc, cartItem) => {
      const totalProductPrice = cartItem.info.price * cartItem.count;
      return acc + totalProductPrice;
    }, 0);
  },
  productsCount: (state: CartState) => {
    return state.cartItems.reduce((acc, cartItem) => {
      return acc + cartItem.count;
    }, 0);
  },
};
