import { productsService } from '@src/products/productsService';
import { FilterProductsArgs } from '@src/products/ProductsTypes';
import SelectedFilters from './SelectedFilters';

type SelectedFiltersWrapperProps = {
  filterArgs: FilterProductsArgs;
};

// TODO: Rename
export default async function SelectedFiltersWrapper({
  filterArgs,
}: SelectedFiltersWrapperProps) {
  const data = await productsService.filterProducts(filterArgs);

  return (
    <SelectedFilters
      filterArgs={filterArgs}
      selectedOptions={data.selectedOptions}
    />
  );
}
