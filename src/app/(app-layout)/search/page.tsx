import FilterDrawer from '@/search/filter-drawer';
import SectionTitle from '@/common/section-title';
import PageTitle from '@/common/page-title';
import SelectedFilters from '@/search/selected-filters';
import SearchResults from '@/search/search-results';
import ProductFilter from '@/search/product-filter';
import { getMetadata } from '@/seo/seo-utils';

export const metadata = getMetadata({
  title: 'Search Products',
  pathname: '/search',
});

export default function SearchPage() {
  const productFilter = <ProductFilter />;

  return (
    <>
      <PageTitle title="Search Products" srOnly />
      <div className="grid md:grid-cols-[theme(spacing.72)_1fr] gap-2">
        <section className="hidden md:block px-2 max-h-[80vh] overflow-auto sticky top-24">
          <SectionTitle as="h2" srOnly>
            Filter
          </SectionTitle>
          {productFilter}
        </section>
        <section>
          <SectionTitle as="h2" srOnly>
            Search Results
          </SectionTitle>
          <div className="space-y-2">
            <SelectedFilters />
            <FilterDrawer>{productFilter}</FilterDrawer>
            <SearchResults />
          </div>
        </section>
      </div>
    </>
  );
}
