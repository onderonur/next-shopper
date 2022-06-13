import Button from '@src/common/Button';
import Chip from '@src/common/Chip';
import { Maybe } from '@src/common/CommonTypes';
import List from '@src/common/List';
import ListItem from '@src/common/ListItem';
import { ProductFilterSelectedOption } from './ProductsTypes';

interface ProductFilterProps {
  selectedOptions: Maybe<ProductFilterSelectedOption[]>;
  onRemove: (option: ProductFilterSelectedOption) => void;
  onReset: VoidFunction;
}

function SelectedProductFilters({
  selectedOptions,
  onRemove,
  onReset,
}: ProductFilterProps) {
  const visibleOptions = selectedOptions?.filter((option) => option.isVisible);

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
                  onClick: () => onRemove(selectedOption),
                }}
              >
                {selectedOption.title}
              </Chip>
            </ListItem>
          );
        })}
        <ListItem>
          <Button className="text-sm" variant="transparent" onClick={onReset}>
            Clear Filters
          </Button>
        </ListItem>
      </List>
    </div>
  );
}

export default SelectedProductFilters;
