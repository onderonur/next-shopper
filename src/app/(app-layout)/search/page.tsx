import {
  multiSearchParamSchema,
  singleSearchParamSchema,
} from '@/core/routing/routing.schemas';
import type { SearchParams } from '@/core/routing/routing.types';
import { routes } from '@/core/routing/routing.utils';
import { getMetadata } from '@/core/seo/seo.utils';
import { PageTitle } from '@/core/ui/components/page-title';
import { Section, SectionTitle } from '@/core/ui/components/section';
import { ProductFilter } from '@/features/search/components/product-filter';
import { ProductFilterDrawer } from '@/features/search/components/product-filter-drawer';
import { SearchResults } from '@/features/search/components/search-results';
import { SelectedFilters } from '@/features/search/components/selected-filters';
import { SelectedOptionsProvider } from '@/features/search/components/selected-options-context';
import { filterProducts } from '@/features/search/search.data';
import { z } from 'zod';

export const metadata = getMetadata({
  title: 'Search Products',
  pathname: routes.search(),
});

const searchParamsSchema = z.object({
  categories: multiSearchParamSchema,
  priceRanges: multiSearchParamSchema,
  sorting: singleSearchParamSchema,
});

type SearchPageProps = {
  searchParams: SearchParams;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const data = await filterProducts(searchParamsSchema.parse(searchParams));

  return (
    <main>
      <PageTitle title="Search Products" srOnly />
      <SelectedOptionsProvider data={data}>
        <div className="grid gap-2 md:grid-cols-[theme(spacing.72)_1fr]">
          <Section className="sticky top-20 hidden max-h-[80vh] overflow-auto px-2 md:block">
            <SectionTitle as="h2" srOnly>
              Filter
            </SectionTitle>
            <ProductFilter data={data} />
          </Section>
          <Section>
            <SectionTitle as="h2" srOnly>
              Search Results
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
