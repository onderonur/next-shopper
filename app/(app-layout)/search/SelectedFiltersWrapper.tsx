import {
  FilterProductsArgs,
  ProductFilterResponse,
} from '@src/products/ProductsTypes';
import SelectedFilters from './SelectedFilters';

type SelectedFiltersWrapperProps = {
  filterArgs: FilterProductsArgs;
  _data: Promise<ProductFilterResponse>;
};

// TODO: Rename
export default async function SelectedFiltersWrapper({
  filterArgs,
  _data,
}: SelectedFiltersWrapperProps) {
  const data = await _data;

  return (
    <SelectedFilters
      filterArgs={filterArgs}
      selectedOptions={data.selectedOptions}
    />
  );
}
