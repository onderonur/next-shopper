'use client';

import { getValuesOfSelectedOptions } from '@src/products/ProductsUtils';
import { useFilterProducts } from '@src/products/useFilterProducts';
import FilterSectionSkeleton from './FilterSectionSkeleton';
import ProductFilter from './ProductFilter';

// TODO: Rename (FilterSectionSkeleton falan dahil)
export default function FilterSection() {
  // TODO: Mobile moddayken filter drawer'ı açınca refetch ediyor search'ü revalidate etmek için.
  // Ondan bu revalidateIfStale false yapıldı.
  // Belki daha iyi bi yöntem vs bulunabilir bilemedim.
  const { data, isLoading, isValidating } = useFilterProducts({
    revalidateIfStale: false,
  });

  return (
    <div className="pb-6 flex flex-col gap-4">
      {/* TODO: Bu skeleton form component'lerin içine de alınabilir tek tek */}
      {isLoading && !data ? (
        <FilterSectionSkeleton />
      ) : (
        <ProductFilter
          // TODO: Bu alttaki konuya fix lazım
          // Since `values` are depending on the server response,
          // we disable inputs during requests.
          // Otherwise, if user clicks multiple options of a checkbox group,
          // only the last clicked option becomes selected.
          // We can handle this by using query params as a fallback during requests (like optimistic UI etc.).
          // But it's not necessary and this is a common pattern used by other e-commerce websites.
          isDisabled={isValidating}
          options={data?.filterOptions}
          values={getValuesOfSelectedOptions(data?.selectedOptions)}
        />
      )}
    </div>
  );
}
