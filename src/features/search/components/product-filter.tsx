'use client';

import {
  Checkbox,
  CheckboxGroup,
} from '@/core/forms/components/checkbox-group';
import {
  RadioGroup,
  RadioGroupItem,
} from '@/core/forms/components/radio-group';
import { routes } from '@/core/routing/routing.utils';
import { Card, CardContent, CardHeader } from '@/core/ui/components/card';
import { useSelectedOptionsContext } from '@/features/search/components/selected-options-context';
import type {
  ProductFilterData,
  ProductFilterResponse,
} from '@/features/search/search.types';
import {
  ProductFilterKey,
  ProductSorting,
  getValuesOfSelectedOptions,
} from '@/features/search/search.utils';
import { useRouter } from 'next/navigation';

type ProductFilterProps = {
  data: ProductFilterResponse;
};

export function ProductFilter({ data }: ProductFilterProps) {
  const router = useRouter();
  const {
    optimisticSelectedOptions,
    setOptimisticSelectedOptions,
    startTransition,
  } = useSelectedOptionsContext();

  const values = getValuesOfSelectedOptions(optimisticSelectedOptions);

  const handleChange = (
    filterKey: ProductFilterData['filterKey'],
    newValues: string[],
  ) => {
    const newOptimisticSelectedOptions = optimisticSelectedOptions.filter(
      (option) => option.filterKey !== filterKey,
    );

    const filterOption = Object.values(data.filterOptions).find(
      (filterOption) => filterOption.filterKey === filterKey,
    );

    for (const value of newValues) {
      const option = filterOption?.options.find(
        (option) => option.value === value,
      );

      if (!option) continue;

      newOptimisticSelectedOptions.push({
        ...option,
        filterKey,
        isVisible: (option.value as ProductSorting) !== ProductSorting.DEFAULT,
      });
    }

    startTransition(() => {
      setOptimisticSelectedOptions(newOptimisticSelectedOptions);

      router.push(
        routes.search({
          query: getValuesOfSelectedOptions(newOptimisticSelectedOptions),
        }),
      );
    });
  };

  return (
    <div className="flex flex-col gap-4 pb-6">
      {Object.values(data.filterOptions).map((filter) => {
        let filterInput = null;
        const labelId = `${filter.filterKey}_label`;

        switch (filter.filterKey) {
          case ProductFilterKey.CATEGORIES:
          case ProductFilterKey.PRICE_RANGES: {
            filterInput = (
              <CheckboxGroup
                aria-labelledby={labelId}
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
          }
          case ProductFilterKey.SORTING: {
            filterInput = (
              <RadioGroup
                aria-labelledby={labelId}
                value={values[filter.filterKey]}
                onChange={(newValue) => {
                  handleChange(filter.filterKey, [newValue]);
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
        }

        return (
          <div key={filter.filterKey}>
            <Card>
              <CardHeader id={labelId}>{filter.title}</CardHeader>
              <CardContent>{filterInput}</CardContent>
            </Card>
          </div>
        );
      })}
    </div>
  );
}
