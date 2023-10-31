import { getManyProductsByIds } from '@/products/product-fetchers';
import { cookies } from 'next/headers';
import { cache } from 'react';
import { CartDetails, CartItem, cartSchema } from './cart-types';
import { Maybe } from '@/common/common-types';

export const getCart = cache(async (): Promise<Maybe<CartDetails>> => {
  const cookieStore = cookies();

  const cookieValue = cookieStore.get('cart')?.value;

  const cart = cartSchema.safeParse(
    cookieValue ? JSON.parse(cookieValue) : null,
  );

  if (!cart.success) {
    return null;
  }

  const productIds = cart.data.map((item) => item.productId);

  const cartProducts = await getManyProductsByIds(productIds);

  const cartItems: CartItem[] = [];

  let totalPrice = 0;
  let totalCount = 0;

  cartProducts.forEach((product) => {
    const count = cart.data.find((item) => item.productId === product.id)
      ?.count;

    if (count) {
      cartItems.push({ product, count });
      totalPrice += product.price * count;
      totalCount += count;
    }
  });

  return { cartItems, totalPrice, totalCount };
});
