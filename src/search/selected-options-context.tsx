'use client';

import { createSafeContext } from '@/common/safe-context';
import { produce } from 'immer';
import { useOptimistic } from 'react';
import type {
  ProductFilterResponse,
  ProductFilterSelectedOption,
} from './search-types';
import { ProductFilterKey, ProductSorting } from './search-utils';

type SelectedOptionsContextValue = {
  optimisticSelectedOptions: ProductFilterSelectedOption[];
  setOptimisticSelectedOptions: (
    selectedOptions: ProductFilterSelectedOption[],
  ) => void;
};

const [SelectedOptionsContext, useSelectedOptionsContext] =
  createSafeContext<SelectedOptionsContextValue>({
    displayName: 'SelectedOptionsContext',
  });

export { useSelectedOptionsContext };

type SelectedOptionsProviderProps = React.PropsWithChildren<{
  data: ProductFilterResponse;
}>;

export function SelectedOptionsProvider({
  data,
  children,
}: SelectedOptionsProviderProps) {
  const [optimisticData, setOptimisticSelectedOptions] = useOptimistic(
    data,
    (state, newSelectedOptions: ProductFilterSelectedOption[]) => {
      return produce(state, (draft) => {
        draft.selectedOptions = newSelectedOptions;

        const hasSorting = draft.selectedOptions.some(
          (option) => option.filterKey === ProductFilterKey.SORTING,
        );

        if (!hasSorting) {
          draft.selectedOptions.push({
            filterKey: ProductFilterKey.SORTING,
            isVisible: false,
            title: 'Sorting',
            value: ProductSorting.DEFAULT,
            order: '0_0',
          });
        }
      });
    },
  );

  return (
    <SelectedOptionsContext.Provider
      value={{
        optimisticSelectedOptions: optimisticData.selectedOptions,
        setOptimisticSelectedOptions,
      }}
    >
      {children}
    </SelectedOptionsContext.Provider>
  );
}
