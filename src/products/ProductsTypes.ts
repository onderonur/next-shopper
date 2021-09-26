import { Id } from '@src/common/CommonTypes';

export interface Product {
  id: Id;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
}

export interface ProductSorting {
  id: string;
  name: string;
}
