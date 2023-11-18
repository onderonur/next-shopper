'use client';

import { Button } from '@/common/button';
import { Chip, ChipClose, ChipContent } from '@/common/chip';
import { List, ListItem } from '@/common/list';
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
      <List className="flex flex-row flex-wrap gap-1">
        {visibleOptions.map((selectedOption) => {
          return (
            <ListItem
              key={`${selectedOption.filterKey}_${selectedOption.value}`}
            >
              <Chip variant="secondary" textAlign="left">
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
            </ListItem>
          );
        })}
        <ListItem>
          <Button
            className="text-sm"
            variant="transparent"
            onClick={() => {
              router.push(routes.search());
            }}
          >
            Clear Filters
          </Button>
        </ListItem>
      </List>
    </MobilePadding>
  );
}
