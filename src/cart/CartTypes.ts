import { Product } from '@/products/ProductsTypes';

export type CartItem = {
  product: Product;
  count: number;
};
