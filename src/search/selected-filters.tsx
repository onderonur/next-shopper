'use client';

import { Button } from '@/common/button';
import { Chip, ChipClose, ChipContent } from '@/common/chip';
import { MobilePadding } from '@/common/mobile-padding';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { useSelectedOptionsContext } from './selected-options-context';

const orderComparer = Intl.Collator(undefined, { numeric: true });

export function SelectedFilters() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { optimisticSelectedOptions, setOptimisticSelectedOptions } =
    useSelectedOptionsContext();

  const visibleOptions = optimisticSelectedOptions
    .filter((option) => option.isVisible)
    // Sorting selected options to prevent different ordering between
    // real and optimistic data.
    .toSorted((a, b) => orderComparer.compare(a.order, b.order));

  return (
    <div data-pending={isPending ? true : undefined}>
      {!!visibleOptions.length && (
        <MobilePadding>
          <ul className="flex flex-row flex-wrap items-center gap-1">
            {visibleOptions.map((selectedOption) => {
              return (
                <li key={`${selectedOption.filterKey}_${selectedOption.value}`}>
                  <Chip>
                    <ChipContent>{selectedOption.title}</ChipContent>
                    <ChipClose
                      aria-label={`Remove ${selectedOption.title} filter`}
                      onClick={() => {
                        const newOptimisticSelectedOptions =
                          optimisticSelectedOptions.filter(
                            (option) =>
                              option.filterKey !== selectedOption.filterKey ||
                              option.value !== selectedOption.value,
                          );

                        startTransition(() => {
                          setOptimisticSelectedOptions(
                            newOptimisticSelectedOptions,
                          );

                          const params = new URLSearchParams();

                          for (const selectedOption of newOptimisticSelectedOptions) {
                            if (selectedOption.isVisible) {
                              params.append(
                                selectedOption.filterKey,
                                selectedOption.value,
                              );
                            }
                          }

                          router.push(`/search?${params.toString()}`);
                        });
                      }}
                    />
                  </Chip>
                </li>
              );
            })}
            <li>
              <Button
                className="text-sm"
                onClick={() => {
                  startTransition(() => {
                    setOptimisticSelectedOptions([]);
                    router.push('/search');
                  });
                }}
              >
                Clear Filters
              </Button>
            </li>
          </ul>
        </MobilePadding>
      )}
    </div>
  );
}
