import { RootState } from '@src/store/store';
import cartReducer, {
  CartState,
  addProduct,
  removeProduct,
  removeCartItem,
  clearCart,
  selectTotalPrice,
  selectProductsCount,
} from './cartSlice';

const product1 = {
  id: 1,
  title: 'Product 1',
  image: '/images/product-1',
  category: { title: 'Category', value: 'category' },
  description: 'Some description about the product',
  price: 10,
};

const product2 = {
  id: 2,
  title: 'Product 2',
  image: '/images/product-2',
  category: { title: 'Category', value: 'category' },
  description: 'Some description about the product',
  price: 12.99,
};

test('returns the initial state', () => {
  expect(cartReducer(undefined, { type: 'testAction' })).toEqual({
    cartItems: [],
  });
});

test('adds product to cart', () => {
  const state: CartState = { cartItems: [] };

  expect(cartReducer(state, addProduct(product1))).toEqual({
    cartItems: [{ info: product1, count: 1 }],
  });
});

test('removes product from cart', () => {
  let state: CartState = {
    cartItems: [
      { info: product1, count: 2 },
      { info: product2, count: 1 },
    ],
  };

  state = cartReducer(state, removeProduct(product1));

  expect(state).toEqual({
    cartItems: [
      { info: product1, count: 1 },
      { info: product2, count: 1 },
    ],
  });

  state = cartReducer(state, removeProduct(product2));

  expect(state).toEqual({
    cartItems: [{ info: product1, count: 1 }],
  });

  state = cartReducer(state, removeProduct(product1));

  expect(state).toEqual({
    cartItems: [],
  });
});

test('removes cart item from cart', () => {
  let state: CartState = {
    cartItems: [
      { info: product1, count: 2 },
      { info: product2, count: 1 },
    ],
  };

  state = cartReducer(state, removeCartItem(product1));

  expect(state).toEqual({
    cartItems: [{ info: product2, count: 1 }],
  });

  state = cartReducer(state, removeCartItem(product2));

  expect(state).toEqual({
    cartItems: [],
  });
});

test('clears cart', () => {
  const state: CartState = {
    cartItems: [
      { info: product1, count: 2 },
      { info: product2, count: 1 },
    ],
  };

  expect(cartReducer(state, clearCart())).toEqual({
    cartItems: [],
  });
});

// TODO: selector test'lerine bi bak nasıl olmalı.
test('selects total price and total product count', () => {
  const state: RootState = {
    cart: {
      cartItems: [
        { info: product1, count: 2 },
        { info: product2, count: 1 },
      ],
    },
  };

  expect(selectTotalPrice(state)).toBe(32.99);
});

test('selects total product count', () => {
  const state: RootState = {
    cart: {
      cartItems: [
        { info: product1, count: 2 },
        { info: product2, count: 1 },
      ],
    },
  };

  expect(selectProductsCount(state)).toBe(3);
});
