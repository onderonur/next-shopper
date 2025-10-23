import type { ProductListItem } from '@/features/products/types';
import type { ProductFilterKey } from '@/features/search/utils';

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
  filterKey: ProductFilterKey;
};

export type ProductFilterResponse = {
  filterOptions: ProductFilterOptions;
  selectedOptions: ProductFilterSelectedOption[];
  products: ProductListItem[];
};
