import { productsService } from '@src/products/productsService';
import { FilterProductsArgs } from '@src/products/ProductsTypes';
import { getValuesOfSelectedOptions } from '@src/products/ProductsUtils';
import ProductFilter from './ProductFilter';

type FilterSectionProps = {
  filterArgs: FilterProductsArgs;
};

export default async function FilterSection({
  filterArgs,
}: FilterSectionProps) {
  const data = await productsService.filterProducts(filterArgs);

  return (
    <ProductFilter
      // TODO: Bu alttaki konuya fix lazım
      // Since `values` are depending on the server response,
      // we disable inputs during requests.
      // Otherwise, if user clicks multiple options of a checkbox group,
      // only the last clicked option becomes selected.
      // We can handle this by using query params as a fallback during requests (like optimistic UI etc.).
      // But it's not necessary and this is a common pattern used by other e-commerce websites.
      filterArgs={filterArgs}
      options={data.filterOptions}
      values={getValuesOfSelectedOptions(data.selectedOptions)}
    />
  );
}
