import { Product } from '@src/products/ProductsTypes';

export type CartItem = {
  product: Product;
  count: number;
};
