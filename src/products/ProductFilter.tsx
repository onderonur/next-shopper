import { Maybe } from '@src/common/CommonTypes';
import Panel from '@src/common/Panel';
import CheckboxGroup from '@src/forms/CheckboxGroup';
import RadioGroup from '@src/forms/RadioGroup';
import {
  FilterProductsArgs,
  ProductFilterData,
  ProductFilterOptionItem,
  ProductFilterOptions,
} from './ProductsTypes';
import { ProductFilterKey } from './ProductsUtils';

interface ProductFilterProps {
  isLoading: boolean;
  isDisabled?: boolean;
  options: Maybe<ProductFilterOptions>;
  values: FilterProductsArgs;
  onChange: (
    filterKey: ProductFilterData['filterKey'],
    value: Maybe<string | string[]>,
  ) => void;
}

// To render filter skeleton during the initial fetch.
const defaultOptions: ProductFilterOptions = {
  sortings: {
    title: 'Sorting',
    options: [],
    filterKey: ProductFilterKey.SORTING,
  },
  categories: {
    title: 'Categories',
    options: [],
    filterKey: ProductFilterKey.CATEGORIES,
  },
  priceRanges: {
    title: 'Price',
    options: [],
    filterKey: ProductFilterKey.PRICE_RANGES,
  },
};

function ProductFilter({
  isLoading,
  isDisabled,
  options,
  values,
  onChange,
}: ProductFilterProps) {
  return (
    <>
      {Object.values(options ?? defaultOptions).map((filter) => {
        let filterInput = null;

        switch (filter.filterKey) {
          case ProductFilterKey.CATEGORIES:
          case ProductFilterKey.PRICE_RANGES:
            filterInput = (
              <CheckboxGroup<ProductFilterOptionItem>
                isLoading={isLoading}
                isDisabled={isDisabled}
                options={filter.options}
                getOptionLabel={(option) => option.title}
                getOptionValue={(option) => option.value}
                value={values[filter.filterKey]}
                onChange={(newValue) => {
                  onChange(filter.filterKey, newValue);
                }}
              />
            );
            break;
          case ProductFilterKey.SORTING:
            filterInput = (
              <RadioGroup<ProductFilterOptionItem>
                isLoading={isLoading}
                isDisabled={isDisabled}
                options={filter.options}
                getOptionLabel={(option) => option.title}
                getOptionValue={(option) => option.value}
                value={values[filter.filterKey]}
                onChange={(newValue) => {
                  onChange(filter.filterKey, newValue);
                }}
              />
            );
        }

        return (
          <Panel key={filter.filterKey} title={filter.title}>
            {filterInput}
          </Panel>
        );
      })}
    </>
  );
}

export default ProductFilter;
