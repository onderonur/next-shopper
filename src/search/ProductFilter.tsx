'use client';

import { Maybe } from '@src/common/CommonTypes';
import PaperTitle from '@src/common/PaperTitle';
import Paper from '@src/common/Paper';
import CheckboxGroup from '@src/forms/CheckboxGroup';
import RadioGroup from '@src/forms/RadioGroup';
import {
  ProductFilterData,
  ProductFilterOptionItem,
} from '@src/products/ProductsTypes';
import {
  getValuesOfSelectedOptions,
  ProductFilterKey,
} from '@src/products/ProductsUtils';
import { routes } from '@src/routing/routes';
import { useRouter } from 'next/navigation';
import { useProductFilterArgs } from '@src/products/useProductFilterArgs';
import { useFilterProducts } from '@src/products/useFilterProducts';
import { createMockArray } from '@src/common/CommonUtils';
import OptionGroupSkeleton from '@src/forms/OptionGroupSkeleton';

export default function ProductFilter() {
  // TODO: Mobile moddayken filter drawer'ı açınca refetch ediyor search'ü revalidate etmek için.
  // Ondan bu revalidateIfStale false yapıldı.
  // Belki daha iyi bi yöntem vs bulunabilir bilemedim.
  const { data, isLoading, isValidating } = useFilterProducts({
    revalidateIfStale: false,
  });

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

  return (
    <div className="pb-6 flex flex-col gap-4">
      {isLoading && !data
        ? createMockArray(3).map((i) => {
            return (
              <div key={i}>
                <PaperTitle isLoading />
                <Paper>
                  <OptionGroupSkeleton />
                </Paper>
              </div>
            );
          })
        : Object.values(data?.filterOptions ?? {}).map((filter) => {
            let filterInput = null;

            switch (filter.filterKey) {
              case ProductFilterKey.CATEGORIES:
              case ProductFilterKey.PRICE_RANGES:
                filterInput = (
                  <CheckboxGroup<ProductFilterOptionItem>
                    // isLoading={isLoading}
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
                    // isLoading={isLoading}
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
