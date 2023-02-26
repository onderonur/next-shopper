'use client';

import Button from '@src/common/Button';
import Chip from '@src/common/Chip';
import List from '@src/common/List';
import ListItem from '@src/common/ListItem';
import MobilePadding from '@src/common/MobilePadding';
import { routes } from '@src/routing/RoutingUtils';
import { useRouter } from 'next/navigation';
import { useFilterProducts, useProductFilterArgs } from './SearchHooks';

export default function SelectedFilters() {
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
      <div className="flex flex-col gap-1 items-start">
        <List className="flex flex-row flex-wrap gap-1">
          {visibleOptions.map((selectedOption) => {
            return (
              <ListItem
                key={`${selectedOption.filterKey}_${selectedOption.value}`}
              >
                <Chip
                  variant="secondary"
                  textAlign="left"
                  closeButtonProps={{
                    'aria-label': `Remove ${selectedOption.title} filter`,
                    onClick: () => {
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
                    },
                  }}
                >
                  {selectedOption.title}
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
      </div>
    </MobilePadding>
  );
}
