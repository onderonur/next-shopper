'use client';

import { routes } from '@/core/routing/routing.utils';
import { Button } from '@/core/ui/components/button';
import { CloseIcon } from '@/core/ui/components/icons';
import { useSelectedOptionsContext } from '@/features/search/components/selected-options-context';
import { getValuesOfSelectedOptions } from '@/features/search/search.utils';
import { useRouter } from 'next/navigation';

const orderComparer = Intl.Collator(undefined, { numeric: true });

export function SelectedFilters() {
  const router = useRouter();
  const {
    optimisticSelectedOptions,
    setOptimisticSelectedOptions,
    startTransition,
  } = useSelectedOptionsContext();

  const visibleOptions = optimisticSelectedOptions
    .filter((option) => option.isVisible)
    // Sorting selected options to prevent different ordering between
    // real and optimistic data.
    .toSorted((a, b) => orderComparer.compare(a.order, b.order));

  if (!visibleOptions.length) return null;

  return (
    <ul className="flex flex-row flex-wrap items-center gap-1">
      {visibleOptions.map((selectedOption) => {
        return (
          <li key={`${selectedOption.filterKey}_${selectedOption.value}`}>
            <Button
              variant="accent"
              className="px-2 py-1 text-sm"
              aria-label={`Remove ${selectedOption.title} filter`}
              icon={<CloseIcon />}
              iconAlignment="right"
              onClick={() => {
                const newOptimisticSelectedOptions =
                  optimisticSelectedOptions.filter(
                    (option) =>
                      option.filterKey !== selectedOption.filterKey ||
                      option.value !== selectedOption.value,
                  );

                startTransition(() => {
                  setOptimisticSelectedOptions(newOptimisticSelectedOptions);

                  router.push(
                    routes.search({
                      query: getValuesOfSelectedOptions(
                        newOptimisticSelectedOptions,
                      ),
                    }),
                  );
                });
              }}
            >
              {selectedOption.title}
            </Button>
          </li>
        );
      })}
      <li>
        <Button
          className="text-sm"
          onClick={() => {
            startTransition(() => {
              setOptimisticSelectedOptions([]);
              router.push(routes.search());
            });
          }}
        >
          Clear Filters
        </Button>
      </li>
    </ul>
  );
}
