import FilterDrawer from '@/search/FilterDrawer';
import SectionTitle from '@/common/SectionTitle';
import PageTitle from '@/common/PageTitle';
import SelectedFilters from '@/search/SelectedFilters';
import SearchResults from '@/search/SearchResults';
import ProductFilter from '@/search/ProductFilter';
import { getMetadata } from '@/seo/SeoUtils';

export const metadata = getMetadata({ title: 'Search Products' });

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
          <div className="flex flex-col gap-2">
            <SelectedFilters />
            <FilterDrawer>{productFilter}</FilterDrawer>
            <SearchResults />
          </div>
        </section>
      </div>
    </>
  );
}
