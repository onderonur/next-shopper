'use client';

import { Button } from '@/common/button';
import { Chip, ChipClose, ChipContent } from '@/common/chip';
import { MobilePadding } from '@/common/mobile-padding';
import { routes } from '@/routing/routing-utils';
import { useRouter } from 'next/navigation';
import { useFilterProducts, useProductFilterArgs } from './search-hooks';

export function SelectedFilters() {
  const router = useRouter();
  const filterArgs = useProductFilterArgs();
  const { data } = useFilterProducts();

  const visibleOptions = data?.selectedOptions.filter(
    (option) => option.isVisible,
  );

  if (!visibleOptions?.length) {
    return null;
  }

  return (
    <MobilePadding>
      <ul className="flex flex-row flex-wrap gap-1">
        {visibleOptions.map((selectedOption) => {
          return (
            <li key={`${selectedOption.filterKey}_${selectedOption.value}`}>
              <Chip>
                <ChipContent>{selectedOption.title}</ChipContent>
                <ChipClose
                  aria-label={`Remove ${selectedOption.title} filter`}
                  onClick={() => {
                    const {
                      [selectedOption.filterKey]: currentValue,
                      ...restQuery
                    } = filterArgs;

                    if (Array.isArray(currentValue)) {
                      router.push(
                        routes.search({
                          query: {
                            ...restQuery,
                            [selectedOption.filterKey]: currentValue.filter(
                              (value) => value !== selectedOption.value,
                            ),
                          },
                        }),
                      );
                    } else {
                      router.push(routes.search({ query: restQuery }));
                    }
                  }}
                />
              </Chip>
            </li>
          );
        })}
        <li>
          <Button
            className="text-sm"
            variant="transparent"
            onClick={() => {
              router.push(routes.search());
            }}
          >
            Clear Filters
          </Button>
        </li>
      </ul>
    </MobilePadding>
  );
}
