import {
  FilterProductsArgs,
  ProductFilterResponse,
} from '@src/products/ProductsTypes';
import { getValuesOfSelectedOptions } from '@src/products/ProductsUtils';
import ProductFilter from './ProductFilter';

type FilterSectionProps = {
  filterArgs: FilterProductsArgs;
  _data: Promise<ProductFilterResponse>;
};

export default async function FilterSection({
  filterArgs,
  _data,
}: FilterSectionProps) {
  const data = await _data;

  return (
    <div className="pb-6 flex flex-col gap-4">
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
    </div>
  );
}
