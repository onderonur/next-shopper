import { searchParamParser } from '@/core/routing/schemas';
import type { SearchParams } from '@/core/routing/types';
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
import { z } from 'zod';

export const metadata = getMetadata({
  title: 'Search Products',
  pathname: routes.search(),
});

const searchParamsSchema = z
  .object({
    categories: searchParamParser.toArray(z.string()),
    priceRanges: searchParamParser.toArray(z.string()),
    sorting: searchParamParser.toSingle(z.string()),
  })
  .partial();

type SearchPageProps = {
  searchParams: SearchParams;
};

export default async function SearchPage(props: SearchPageProps) {
  const searchParams = parseSearchParams({ searchParamsSchema, ...props });
  const data = await filterProducts(searchParams);

  return (
    <main>
      <PageTitle title="Search Products" srOnly />
      <SelectedOptionsProvider data={data}>
        <div className="grid gap-2 md:grid-cols-[theme(spacing.72)_1fr]">
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
