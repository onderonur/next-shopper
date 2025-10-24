import { searchPageSearchParamsSchema } from '@/core/routing/schemas';
import { parseSearchParams, routes } from '@/core/routing/utils';
import { getMetadata } from '@/core/seo/utils';
import { PageTitle } from '@/core/ui/components/page-title';
import { Section, SectionTitle } from '@/core/ui/components/section';
import { ProductFilter } from '@/features/search/components/product-filter';
import { ProductFilterDrawer } from '@/features/search/components/product-filter-drawer';
import { SearchResults } from '@/features/search/components/search-results';
import { SelectedFilters } from '@/features/search/components/selected-filters';
import { SelectedOptionsProvider } from '@/features/search/components/selected-options-context';
import { filterProducts } from '@/features/search/data';
import type { Metadata } from 'next';

export const metadata: Metadata = getMetadata({
  title: 'Search Products',
  pathname: routes.search(),
});

export default async function SearchPage(props: PageProps<'/search'>) {
  const searchParams = await props.searchParams;
  const parsedSearchParams = parseSearchParams({
    schema: searchPageSearchParamsSchema,
    searchParams,
  });
  const data = await filterProducts(parsedSearchParams);

  return (
    <main>
      <PageTitle title="Search Products" srOnly />
      <SelectedOptionsProvider data={data}>
        <div className="grid gap-2 md:grid-cols-[--spacing(72)_1fr]">
          <Section className="sticky top-20 hidden max-h-[80vh] overflow-auto px-2 md:block">
            <SectionTitle asChild srOnly>
              <h2>Filter</h2>
            </SectionTitle>
            <ProductFilter data={data} />
          </Section>
          <Section>
            <SectionTitle asChild srOnly>
              <h2>Search Results</h2>
            </SectionTitle>
            <div className="flex flex-col gap-2">
              <SelectedFilters />
              <ProductFilterDrawer>
                <ProductFilter data={data} />
              </ProductFilterDrawer>
              <SearchResults data={data} />
            </div>
          </Section>
        </div>
      </SelectedOptionsProvider>
    </main>
  );
}
