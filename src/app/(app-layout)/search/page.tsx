import { ProductFilterDrawer } from '@/search/product-filter-drawer';
import { Section, SectionTitle } from '@/common/section';
import { PageTitle } from '@/common/page-title';
import { SelectedFilters } from '@/search/selected-filters';
import { SearchResults } from '@/search/search-results';
import { ProductFilter } from '@/search/product-filter';
import { getMetadata } from '@/seo/seo-utils';

export const metadata = getMetadata({
  title: 'Search Products',
  pathname: '/search',
});

export default function SearchPage() {
  return (
    <>
      <PageTitle title="Search Products" srOnly />
      <div className="grid gap-2 md:grid-cols-[theme(spacing.72)_1fr]">
        <Section className="sticky top-24 hidden max-h-[80vh] overflow-auto px-2 md:block">
          <SectionTitle as="h2" srOnly>
            Filter
          </SectionTitle>
          <ProductFilter />
        </Section>
        <Section>
          <SectionTitle as="h2" srOnly>
            Search Results
          </SectionTitle>
          <div className="flex flex-col gap-2">
            <SelectedFilters />
            <ProductFilterDrawer />
            <SearchResults />
          </div>
        </Section>
      </div>
    </>
  );
}
