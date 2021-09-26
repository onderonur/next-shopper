import produce from 'immer';
import React, { useContext, useMemo, useState } from 'react';
import { Product } from '@src/products/ProductsTypes';
import { CartItem } from './CartTypes';

interface CartContextValue {
  cartItems: CartItem[];
  totalPrice: number;
  productCount: number;
  addProduct: (product: Product) => void;
  removeProduct: (product: Product) => void;
  removeCartItem: (product: Product) => void;
  clearCart: () => void;
}

const CartContext = React.createContext<CartContextValue>(
  {} as CartContextValue,
);

export const useCartContext = () => {
  return useContext(CartContext);
};

type CartProviderProps = React.PropsWithChildren<{}>;

function CartProvider({ children }: CartProviderProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const contextValue = useMemo<CartContextValue>(() => {
    const totalPrice = cartItems.reduce((acc, cartItem) => {
      const totalProductPrice = cartItem.info.price * cartItem.count;
      return acc + totalProductPrice;
    }, 0);

    const productCount = cartItems.reduce((acc, cartItem) => {
      return acc + cartItem.count;
    }, 0);

    const addProduct = (addedProduct: Product) => {
      setCartItems(
        produce((draft) => {
          const found = draft.find(
            (cartItem) => cartItem.info.id === addedProduct.id,
          );
          if (found) {
            found.count++;
          } else {
            draft.push({ info: addedProduct, count: 1 });
          }
        }),
      );
    };

    const removeProduct = (removedProduct: Product) => {
      setCartItems(
        produce((draft) => {
          const foundIndex = draft.findIndex(
            (cartItem) => cartItem.info.id === removedProduct.id,
          );
          const found = draft[foundIndex];
          if (found) {
            found.count--;
            if (found.count < 1) {
              draft.splice(foundIndex, 1);
            }
          }
        }),
      );
    };

    const removeCartItem = (removedProduct: Product) => {
      setCartItems(
        produce((draft) =>
          draft.filter((cartItem) => cartItem.info.id !== removedProduct.id),
        ),
      );
    };

    const clearCart = () =>
      setCartItems((currentCartItems) =>
        currentCartItems.length ? [] : currentCartItems,
      );

    return {
      cartItems,
      totalPrice,
      productCount,
      addProduct,
      removeProduct,
      removeCartItem,
      clearCart,
    };
  }, [cartItems]);

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
}

export default CartProvider;
