import Section from '@src/common/Section';
import { QueryParams, routes } from '@src/routing/routes';
import { ProductFilterKey } from '@src/products/ProductsUtils';
import FilterSection from './FilterSection';
import { paramsToSearchParams } from '@src/routing/RoutingUtils';
import FilterDrawer from './FilterDrawer';
import ProductList from './ProductList';
import { Suspense } from 'react';
import ProductListShell from './ProductListShell';
import ProductListSkeleton from './ProductListSkeleton';
import FilterSectionShell from './FilterSectionShell';
import FilterSectionSkeleton from './FilterSectionSkeleton';
import { productsService } from '@src/products/productsService';
import SelectedFiltersWrapper from './SelectedFiltersWrapper';
import SectionTitle from '@src/common/SectionTitle';
import SectionBody from '@src/common/SectionBody';
import PageHeader from '@src/common/PageHeader';

type ProductListPageQueryParams = QueryParams<typeof routes.search>;

function getFilterProductsArgs(params: ProductListPageQueryParams) {
  const searchParams = paramsToSearchParams(params);

  const query: ProductListPageQueryParams = {};

  const sorting = searchParams.get(ProductFilterKey.SORTING);
  if (sorting) {
    query.sorting = sorting;
  }

  query.categories = searchParams.getAll(ProductFilterKey.CATEGORIES);
  query.priceRanges = searchParams.getAll(ProductFilterKey.PRICE_RANGES);

  return query;
}

type SearchPageProps = {
  searchParams: ProductListPageQueryParams;
};

export default function SearchPage({ searchParams }: SearchPageProps) {
  const filterArgs = getFilterProductsArgs(searchParams);
  const _data = productsService.filterProducts(filterArgs);
  // TODO: data?. 'daki ? gereksiz bu server component olduğu için.
  // TODO: Bu ?'ları genel olarak bi kontrol et.

  const filterSection = (
    <FilterSectionShell>
      <Suspense fallback={<FilterSectionSkeleton />}>
        {/* @ts-ignore */}
        <FilterSection
          // TODO: Rename
          filterArgs={filterArgs}
          _data={_data}
        />
      </Suspense>
    </FilterSectionShell>
  );

  return (
    <>
      <PageHeader title="Search Products" isHidden />
      <div className="flex gap-2">
        <Section className="hidden md:block w-72 px-2 max-h-[80vh] overflow-auto sticky top-24">
          <SectionTitle as="h2" hideTitle>
            Filter
          </SectionTitle>
          <div>{filterSection}</div>
        </Section>
        <Section className="flex-1">
          <SectionTitle as="h2" hideTitle>
            Search Results
          </SectionTitle>
          <div className="flex flex-col gap-2">
            <Suspense>
              {/* @ts-ignore */}
              <SelectedFiltersWrapper filterArgs={filterArgs} _data={_data} />
            </Suspense>
            <FilterDrawer>{filterSection}</FilterDrawer>
            <ProductListShell>
              <Suspense fallback={<ProductListSkeleton />}>
                {/* @ts-ignore */}
                <ProductList _data={_data} />
              </Suspense>
            </ProductListShell>
          </div>
        </Section>
      </div>
    </>
  );
}
