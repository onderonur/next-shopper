'use client';

import { Button } from '@/common/button';
import { Chip, ChipClose, ChipContent } from '@/common/chip';
import { MobilePadding } from '@/common/mobile-padding';
import { useSearchParams } from 'next/navigation';
import { useFilterProducts } from './search-hooks';

export function SelectedFilters() {
  const searchParams = useSearchParams();
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
                    const params = new URLSearchParams(searchParams.toString());
                    const currentValue = params.getAll(
                      selectedOption.filterKey,
                    );
                    const newValue = currentValue.filter(
                      (value) => value !== selectedOption.value,
                    );

                    params.delete(selectedOption.filterKey);

                    newValue.forEach((value) => {
                      params.append(selectedOption.filterKey, value);
                    });

                    window.history.pushState(null, '', `?${params.toString()}`);
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
              window.history.pushState(null, '', '?');
            }}
          >
            Clear Filters
          </Button>
        </li>
      </ul>
    </MobilePadding>
  );
}
