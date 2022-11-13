'use client';

import Button from '@src/common/Button';
import Chip from '@src/common/Chip';
import List from '@src/common/List';
import ListItem from '@src/common/ListItem';
import {
  FilterProductsArgs,
  ProductFilterSelectedOption,
} from '@src/products/ProductsTypes';
import { routes } from '@src/routing/routes';
import { useRouter } from 'next/navigation';

type SelectedFiltersProps = {
  // TODO: Rename
  filterArgs: FilterProductsArgs;
  selectedOptions: ProductFilterSelectedOption[];
};

export default function SelectedFilters({
  filterArgs,
  selectedOptions,
}: SelectedFiltersProps) {
  const router = useRouter();

  const visibleOptions = selectedOptions.filter((option) => option.isVisible);

  if (!visibleOptions?.length) {
    return null;
  }

  return (
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
                            ...filterArgs,
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
  );
}
