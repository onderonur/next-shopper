import FilterDrawer from '@src/search/FilterDrawer';
import SectionTitle from '@src/common/SectionTitle';
import PageTitle from '@src/common/PageTitle';
import FilterSection from '@src/search/FilterSection';
import SelectedFilters from '@src/search/SelectedFilters';
import SearchResults from '@src/search/SearchResults';

export default function SearchPage() {
  const filterSection = <FilterSection />;

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
            <SelectedFilters />
            <FilterDrawer>{filterSection}</FilterDrawer>
            <SearchResults />
          </div>
        </section>
      </div>
    </>
  );
}
