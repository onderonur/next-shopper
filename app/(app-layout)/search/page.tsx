import { QueryParams, routes } from '@src/routing/routes';
import { ProductFilterKey } from '@src/products/ProductsUtils';
import FilterSection from './FilterSection';
import { paramsToSearchParams } from '@src/routing/RoutingUtils';
import FilterDrawer from './FilterDrawer';
import SearchResults from './SearchResults';
import { Suspense } from 'react';
import SearchResultsSkeleton from './SearchResultsSkeleton';
import FilterSectionSkeleton from './FilterSectionSkeleton';
import SelectedFiltersWrapper from './SelectedFiltersWrapper';
import SectionTitle from '@src/common/SectionTitle';
import PageTitle from '@src/common/PageTitle';
import Paper from '@src/common/Paper';
import List from '@src/common/List';

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

  const filterSection = (
    <div className="pb-6 flex flex-col gap-4">
      <Suspense fallback={<FilterSectionSkeleton />}>
        <FilterSection
          // TODO: Rename
          filterArgs={filterArgs}
        />
      </Suspense>
    </div>
  );

  return (
    <>
      <PageTitle title="Search Products" srOnly />
      <div className="flex gap-2">
        <section className="hidden md:block w-72 px-2 max-h-[80vh] overflow-auto sticky top-24">
          <SectionTitle as="h2" srOnly>
            Filter
          </SectionTitle>
          {filterSection}
        </section>
        <section className="flex-1">
          <SectionTitle as="h2" srOnly>
            Search Results
          </SectionTitle>
          <div className="flex flex-col gap-2">
            <Suspense>
              <SelectedFiltersWrapper filterArgs={filterArgs} />
            </Suspense>
            <FilterDrawer>{filterSection}</FilterDrawer>
            <Paper>
              <List className="grid grid-cols-[repeat(auto-fill,minmax(11rem,1fr))] gap-4">
                <Suspense fallback={<SearchResultsSkeleton />}>
                  <SearchResults filterArgs={filterArgs} />
                </Suspense>
              </List>
            </Paper>
          </div>
        </section>
      </div>
    </>
  );
}
