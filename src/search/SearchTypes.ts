import { Product } from '@/products/ProductsTypes';
import { ProductFilterKey } from './SearchUtils';

export type ProductFilterArgs = {
  sorting?: string;
  categories?: string[];
  priceRanges?: string[];
};

export type ProductFilterOptionItem = {
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
