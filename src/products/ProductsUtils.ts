import { Maybe } from '@src/common/CommonTypes';
import { ProductFilterSelectedOption } from './ProductsTypes';

export enum ProductSorting {
  PRICE_ASC = 'price-asc',
  PRICE_DESC = 'price-desc',
}

export enum ProductFilterKey {
  SORTING = 'sorting',
  CATEGORIES = 'categories',
  PRICE_RANGES = 'priceRanges',
}

export function getOneSelectedOptionValue(
  filterKey: ProductFilterKey,
  selectedOptions: Maybe<ProductFilterSelectedOption[]>,
) {
  return selectedOptions?.find((option) => option.filterKey === filterKey)
    ?.value;
}

export function getManySelectedOptionValues(
  filterKey: ProductFilterKey,
  selectedOptions: Maybe<ProductFilterSelectedOption[]>,
) {
  return (
    selectedOptions
      ?.filter((option) => option.filterKey === filterKey)
      .map((option) => option.value) ?? []
  );
}

export function getValuesOfSelectedOptions(
  selectedOptions: Maybe<ProductFilterSelectedOption[]>,
) {
  const values = {
    [ProductFilterKey.SORTING]: getOneSelectedOptionValue(
      ProductFilterKey.SORTING,
      selectedOptions,
    ),
    [ProductFilterKey.CATEGORIES]: getManySelectedOptionValues(
      ProductFilterKey.CATEGORIES,
      selectedOptions,
    ),
    [ProductFilterKey.PRICE_RANGES]: getManySelectedOptionValues(
      ProductFilterKey.PRICE_RANGES,
      selectedOptions,
    ),
  };

  return values;
}
