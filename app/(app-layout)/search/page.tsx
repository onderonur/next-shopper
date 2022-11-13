import { Suspense } from 'react';
import { QueryParams, routes } from '@src/routing/routes';
import { ProductFilterKey } from '@src/products/ProductsUtils';
import { paramsToSearchParams } from '@src/routing/RoutingUtils';
import FilterDrawer from '@src/search/FilterDrawer';
import SectionTitle from '@src/common/SectionTitle';
import PageTitle from '@src/common/PageTitle';
import FilterSectionSkeleton from '@src/search/FilterSectionSkeleton';
import FilterSection from '@src/search/FilterSection';
import SelectedFiltersWrapper from '@src/search/SelectedFiltersWrapper';
import SearchResultsSkeleton from '@src/search/SearchResultsSkeleton';
import SearchResults from '@src/search/SearchResults';
import SearchResultsShell from '@src/search/SearchResultsShell';
import FilterSectionShell from '@src/search/FilterSectionShell';

type SearchPageQueryParams = QueryParams<typeof routes.search>;

function getFilterProductsArgs(params: SearchPageQueryParams) {
  const searchParams = paramsToSearchParams(params);

  const query: SearchPageQueryParams = {};

  const sorting = searchParams.get(ProductFilterKey.SORTING);
  if (sorting) {
    query.sorting = sorting;
  }

  query.categories = searchParams.getAll(ProductFilterKey.CATEGORIES);
  query.priceRanges = searchParams.getAll(ProductFilterKey.PRICE_RANGES);

  return query;
}

type SearchPageProps = {
  searchParams: SearchPageQueryParams;
};

export default function SearchPage({ searchParams }: SearchPageProps) {
  const filterArgs = getFilterProductsArgs(searchParams);

  const filterSection = (
    <FilterSectionShell>
      <Suspense fallback={<FilterSectionSkeleton />}>
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-ignore */}
        <FilterSection
          // TODO: Rename
          filterArgs={filterArgs}
        />
      </Suspense>
    </FilterSectionShell>
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
              {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
              {/* @ts-ignore */}
              <SelectedFiltersWrapper filterArgs={filterArgs} />
            </Suspense>
            <FilterDrawer>{filterSection}</FilterDrawer>
            <SearchResultsShell>
              <Suspense fallback={<SearchResultsSkeleton />}>
                {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                {/* @ts-ignore */}
                <SearchResults filterArgs={filterArgs} />
              </Suspense>
            </SearchResultsShell>
          </div>
        </section>
      </div>
    </>
  );
}
