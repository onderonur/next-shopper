import { Product } from '@src/products/ProductsTypes';

export interface CartItem {
  info: Product;
  count: number;
}
