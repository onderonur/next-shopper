import type { ProductListItem } from '@/features/products/products.types';
import type { ProductFilterKey } from '@/features/search/search.utils';

export type ProductFilterArgs = {
  [ProductFilterKey.SORTING]?: string;
  [ProductFilterKey.CATEGORIES]?: string[];
  [ProductFilterKey.PRICE_RANGES]?: string[];
};

type ProductFilterOptionItem = {
  title: string;
  value: string;
  order: `${number}_${number}`;
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
  products: ProductListItem[];
};
