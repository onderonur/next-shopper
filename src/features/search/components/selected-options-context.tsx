'use client';

import type {
  ProductFilterResponse,
  ProductFilterSelectedOption,
} from '@/features/search/search.types';
import {
  ProductFilterKey,
  ProductSorting,
} from '@/features/search/search.utils';
import { produce } from 'immer';
import type { TransitionStartFunction } from 'react';
import { createContext, useContext, useOptimistic, useTransition } from 'react';

type SelectedOptionsContextValue = {
  optimisticSelectedOptions: ProductFilterSelectedOption[];
  setOptimisticSelectedOptions: (
    selectedOptions: ProductFilterSelectedOption[],
  ) => void;
  isPending: boolean;
  startTransition: TransitionStartFunction;
};

const SelectedOptionsContext =
  createContext<SelectedOptionsContextValue | null>(null);

export function useSelectedOptionsContext() {
  const value = useContext(SelectedOptionsContext);
  if (!value) throw new Error('SelectedOptionsContext not found');
  return value;
}

type SelectedOptionsProviderProps = {
  data: ProductFilterResponse;
  children: React.ReactNode;
};

export function SelectedOptionsProvider({
  data,
  children,
}: SelectedOptionsProviderProps) {
  const [isPending, startTransition] = useTransition();
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
        isPending,
        startTransition,
      }}
    >
      {children}
    </SelectedOptionsContext.Provider>
  );
}
