import { Id } from '@src/common/CommonTypes';
import { ProductFilterKey } from './ProductsUtils';

export interface Product {
  id: Id;
  category: {
    title: string;
    value: string;
  };
  description: string;
  image: string;
  price: number;
  title: string;
}

export interface GetOneProductByIdArgs {
  productId: Id;
}

export type FilterProductsArgs = {
  sorting?: string;
  categories?: string[];
  priceRanges?: string[];
};

export interface ProductFilterOptionItem {
  title: string;
  value: string;
}

export interface ProductFilterData {
  title: string;
  options: ProductFilterOptionItem[];
  filterKey: ProductFilterKey;
}

export type ProductFilterOptions = Record<
  'categories' | 'sortings' | 'priceRanges',
  ProductFilterData
>;

export type ProductFilterSelectedOption = ProductFilterOptionItem & {
  isVisible: boolean;
  filterKey: ProductFilterKey;
};

export interface ProductFilterResponse {
  filterOptions: ProductFilterOptions;
  selectedOptions: ProductFilterSelectedOption[];
  products: Product[];
}
