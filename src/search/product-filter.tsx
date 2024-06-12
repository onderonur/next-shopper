'use client';

import { Paper, PaperTitle } from '@/common/paper';
import { Checkbox, CheckboxGroup } from '@/forms/checkbox-group';
import { RadioGroup, RadioGroupItem } from '@/forms/radio-group';
import type {
  ProductFilterData,
  ProductFilterResponse,
} from '@/search/search-types';
import {
  ProductFilterKey,
  ProductSorting,
  getValuesOfSelectedOptions,
} from '@/search/search-utils';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { useSelectedOptionsContext } from './selected-options-context';

type ProductFilterProps = {
  data: ProductFilterResponse;
};

export function ProductFilter({ data }: ProductFilterProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { optimisticSelectedOptions, setOptimisticSelectedOptions } =
    useSelectedOptionsContext();

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

      const params = new URLSearchParams();

      for (const selectedOption of newOptimisticSelectedOptions) {
        if (selectedOption.isVisible) {
          params.append(selectedOption.filterKey, selectedOption.value);
        }
      }

      router.push(`/search?${params.toString()}`);
    });
  };

  return (
    <div
      data-pending={isPending ? true : undefined}
      className="flex flex-col gap-4 pb-6"
    >
      {Object.values(data.filterOptions).map((filter) => {
        let filterInput = null;

        switch (filter.filterKey) {
          case ProductFilterKey.CATEGORIES:
          case ProductFilterKey.PRICE_RANGES: {
            filterInput = (
              <CheckboxGroup
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
            <PaperTitle>{filter.title}</PaperTitle>
            <Paper>{filterInput}</Paper>
          </div>
        );
      })}
    </div>
  );
}
