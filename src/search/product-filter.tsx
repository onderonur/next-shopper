'use client';

import type { Maybe } from '@/common/common-types';
import { Paper, PaperTitle } from '@/common/paper';
import { Checkbox, CheckboxGroup } from '@/forms/checkbox-group';
import { RadioGroup, RadioGroupItem } from '@/forms/radio-group';
import { routes } from '@/routing/routing-utils';
import { useFilterProducts, useProductFilterArgs } from '@/search/search-hooks';
import type {
  ProductFilterData,
  ProductFilterOptions,
} from '@/search/search-types';
import {
  ProductFilterKey,
  getValuesOfSelectedOptions,
} from '@/search/search-utils';
import { useRouter } from 'next/navigation';

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

export function ProductFilter() {
  const { data, isLoading, isValidating } = useFilterProducts({
    // When filter drawer is opened in mobile view, it refetches
    // search results when they are stale.
    // To prevent this, we don't want to revalidate this query in filter
    // when data is stale.
    revalidateIfStale: false,
  });

  // Since `values` are depending on the server response,
  // we disable inputs during requests.
  // Otherwise, if user clicks multiple options of a checkbox group,
  // only the last clicked option becomes selected for some cases.
  // We can handle this by using query params as a fallback during requests (like optimistic UI etc.).
  // Even if this is not the best UX, it is a common pattern used by other e-commerce websites
  // and enough for the purpose of this project.
  const isDisabled = isValidating;
  const values = getValuesOfSelectedOptions(data?.selectedOptions);
  const router = useRouter();
  const filterArgs = useProductFilterArgs();

  const handleChange = (
    filterKey: ProductFilterData['filterKey'],
    newValue: Maybe<string | string[]>,
  ) => {
    router.push(
      routes.search({
        query: {
          ...filterArgs,
          [filterKey]: newValue,
        },
      }),
    );
  };

  const isFirstLoading = isLoading && !data;

  return (
    <div className="flex flex-col gap-4 pb-6">
      {Object.values(data?.filterOptions ?? defaultOptions).map((filter) => {
        let filterInput = null;

        switch (filter.filterKey) {
          case ProductFilterKey.CATEGORIES:
          case ProductFilterKey.PRICE_RANGES:
            filterInput = (
              <CheckboxGroup
                isLoading={isFirstLoading}
                isDisabled={isDisabled}
                value={values[filter.filterKey]}
                onChange={(newValue) => {
                  handleChange(filter.filterKey, newValue);
                }}
              >
                {filter.options.map((option) => {
                  return (
                    <Checkbox key={option.value} value={option.value}>
                      {option.title}
                    </Checkbox>
                  );
                })}
              </CheckboxGroup>
            );
            break;
          case ProductFilterKey.SORTING:
            filterInput = (
              <RadioGroup
                isLoading={isFirstLoading}
                isDisabled={isDisabled}
                value={values[filter.filterKey]}
                onChange={(newValue) => {
                  handleChange(filter.filterKey, newValue);
                }}
              >
                {filter.options.map((option) => {
                  return (
                    <RadioGroupItem key={option.value} value={option.value}>
                      {option.title}
                    </RadioGroupItem>
                  );
                })}
              </RadioGroup>
            );
        }

        return (
          <div key={filter.filterKey}>
            <PaperTitle>{filter.title}</PaperTitle>
            <Paper>{filterInput}</Paper>
          </div>
        );
      })}
    </div>
  );
}
