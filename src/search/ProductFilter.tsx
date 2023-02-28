'use client';

import { Maybe } from '@/common/CommonTypes';
import PaperTitle from '@/common/PaperTitle';
import Paper from '@/common/Paper';
import CheckboxGroup from '@/forms/CheckboxGroup';
import RadioGroup from '@/forms/RadioGroup';
import {
  ProductFilterData,
  ProductFilterOptionItem,
  ProductFilterOptions,
} from '@/search/SearchTypes';
import {
  getValuesOfSelectedOptions,
  ProductFilterKey,
} from '@/search/SearchUtils';
import { useRouter } from 'next/navigation';
import { useProductFilterArgs } from '@/search/SearchHooks';
import { useFilterProducts } from '@/search/SearchHooks';
import { routes } from '@/routing/RoutingUtils';

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

export default function ProductFilter() {
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
    <div className="pb-6 flex flex-col gap-4">
      {Object.values(data?.filterOptions ?? defaultOptions).map((filter) => {
        let filterInput = null;

        switch (filter.filterKey) {
          case ProductFilterKey.CATEGORIES:
          case ProductFilterKey.PRICE_RANGES:
            filterInput = (
              <CheckboxGroup<ProductFilterOptionItem>
                isLoading={isFirstLoading}
                isDisabled={isDisabled}
                options={filter.options}
                getOptionLabel={(option) => option.title}
                getOptionValue={(option) => option.value}
                value={values[filter.filterKey]}
                onChange={(newValue) => {
                  handleChange(filter.filterKey, newValue);
                }}
              />
            );
            break;
          case ProductFilterKey.SORTING:
            filterInput = (
              <RadioGroup<ProductFilterOptionItem>
                isLoading={isFirstLoading}
                isDisabled={isDisabled}
                options={filter.options}
                getOptionLabel={(option) => option.title}
                getOptionValue={(option) => option.value}
                value={values[filter.filterKey]}
                onChange={(newValue) => {
                  handleChange(filter.filterKey, newValue);
                }}
              />
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
