import type { Product } from '@/products/product-types';
import type { ProductFilterKey } from './search-utils';

export type ProductFilterArgs = {
  sorting?: string;
  categories?: string[];
  priceRanges?: string[];
};

type ProductFilterOptionItem = {
  title: string;
  value: string;
};

export type ProductFilterData = {
  title: string;
  options: ProductFilterOptionItem[];
  filterKey: ProductFilterKey;
};

export type ProductFilterOptions = Record<
  'categories' | 'sortings' | 'priceRanges',
  ProductFilterData
>;

export type ProductFilterSelectedOption = ProductFilterOptionItem & {
  isVisible: boolean;
  filterKey: ProductFilterKey;
};

export type ProductFilterResponse = {
  filterOptions: ProductFilterOptions;
  selectedOptions: ProductFilterSelectedOption[];
  products: Product[];
};
