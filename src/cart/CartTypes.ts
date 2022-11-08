import { Product } from '@src/products/ProductsTypes';

export type CartItem = {
  info: Product;
  count: number;
};
