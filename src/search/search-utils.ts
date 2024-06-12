import type { Maybe } from '@/common/common-types';
import type { ProductFilterSelectedOption } from '@/search/search-types';

export enum ProductFilterKey {
  SORTING = 'sorting',
  CATEGORIES = 'categories',
  PRICE_RANGES = 'priceRanges',
}

export enum ProductSorting {
  DEFAULT = 'default',
  PRICE_ASC = 'price-asc',
  PRICE_DESC = 'price-desc',
}

function getOneSelectedOptionValue(
  filterKey: ProductFilterKey,
  selectedOptions: Maybe<ProductFilterSelectedOption[]>,
) {
  return selectedOptions?.find((option) => option.filterKey === filterKey)
    ?.value;
}

function getManySelectedOptionValues(
  filterKey: ProductFilterKey,
  selectedOptions: Maybe<ProductFilterSelectedOption[]>,
) {
  const values: string[] = [];

  for (const selectedOption of selectedOptions ?? []) {
    if (selectedOption.filterKey === filterKey) {
      values.push(selectedOption.value);
    }
  }

  return values;
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
