import ProductCard from '@src/products/ProductCard';
import { useRouteParams } from '@src/routing/useRouteParams';
import Panel from '@src/common/Panel';
import AppLayout from '@src/app-layout/AppLayout';
import List from '@src/common/List';
import BaseSeo from '@src/seo/BaseSeo';
import Button from '@src/common/Button';
import { FilterIcon } from '@src/common/Icons';
import ProductFilter from '@src/products/ProductFilter';
import Drawer, { useDrawer } from '@src/common/Drawer';
import Section from '@src/common/Section';
import { QueryParams, RouteParams, routes } from '@src/routing/routes';
import { dehydrate, useQuery } from 'react-query';
import { productsAPI } from '@src/products/productsAPI';
import ListItem from '@src/common/ListItem';
import ProductCardSkeleton from '@src/products/ProductCardSkeleton';
import { createMockArray } from '@src/common/CommonUtils';
import SelectedProductFilters from '@src/products/SelectedProductFilters';
import {
  getValuesOfSelectedOptions,
  ProductFilterKey,
} from '@src/products/ProductsUtils';
import { GetServerSideProps } from 'next';
import { createQueryClient } from '@src/query-client/QueryClientUtils';
import { ParsedRouteParams, parseRouteParams } from '@src/routing/RoutingUtils';

type ProductListViewQueryParams = QueryParams<typeof routes['search']>;
type ProductListViewRouteParams = RouteParams<typeof routes['search']>;

function getFilterProductsArgs(
  routeParams: ParsedRouteParams<ProductListViewRouteParams>,
) {
  const query: ProductListViewQueryParams = {};

  const sorting = routeParams.get(ProductFilterKey.SORTING);
  if (sorting) {
    query.sorting = sorting;
  }

  query.categories = routeParams.getMany(ProductFilterKey.CATEGORIES);
  query.priceRanges = routeParams.getMany(ProductFilterKey.PRICE_RANGES);

  return query;
}

function ProductListView() {
  const { routeParams, setQueryParams } =
    useRouteParams<ProductListViewRouteParams>();
  const filterProductsArgs = getFilterProductsArgs(routeParams);

  const { data, isLoading, isFetching } = useQuery({
    ...productsAPI.filterProducts({
      args: filterProductsArgs,
    }),
    keepPreviousData: true,
  });

  const filterSectionContent = (
    <div className="pb-6 flex flex-col gap-4">
      <ProductFilter
        isLoading={isLoading}
        // Since `values` are depending on the server response,
        // we disable inputs during requests.
        // Otherwise, if user clicks multiple options of a checkbox group,
        // only the last clicked option becomes selected.
        // We can handle this by using query params as a fallback during requests (like optimistic UI etc.).
        // But it's not necessary and this is a common pattern used by other e-commerce websites.
        isDisabled={isFetching}
        options={data?.filterOptions}
        values={getValuesOfSelectedOptions(data?.selectedOptions)}
        onChange={(filterKey, newValue) => {
          setQueryParams({
            ...filterProductsArgs,
            [filterKey]: newValue,
          });
        }}
      />
    </div>
  );

  const { isOpen, open, close } = useDrawer({ closeOnRouteChange: false });

  return (
    <>
      <BaseSeo title="Products" />
      <div className="flex gap-2">
        <Section
          title="Product Filter"
          titleAs="h2"
          hideTitle
          className="hidden md:block w-72 px-2 max-h-[80vh] overflow-auto sticky top-24"
        >
          {filterSectionContent}
        </Section>
        <Section
          title="Products"
          titleAs="h1"
          hideTitle
          className="flex-1 flex flex-col gap-2"
        >
          <SelectedProductFilters
            selectedOptions={data?.selectedOptions}
            onRemove={(option) => {
              const { [option.filterKey]: currentValue, ...restQuery } =
                filterProductsArgs;
              if (Array.isArray(currentValue)) {
                setQueryParams({
                  ...filterProductsArgs,
                  [option.filterKey]: currentValue.filter(
                    (value) => value !== option.value,
                  ),
                });
              } else {
                setQueryParams(restQuery);
              }
            }}
            onReset={() => setQueryParams({})}
          />
          <div className="md:hidden flex justify-end">
            <Button variant="transparent" icon={<FilterIcon />} onClick={open}>
              Filter
            </Button>
            <Drawer title="Product Filter" isOpen={isOpen} onClose={close}>
              {filterSectionContent}
            </Drawer>
          </div>
          <Panel>
            <List className="grid grid-cols-[repeat(auto-fill,minmax(11rem,1fr))] gap-4">
              {isFetching
                ? createMockArray(8).map((i) => {
                    return (
                      <ListItem key={i}>
                        <ProductCardSkeleton />
                      </ListItem>
                    );
                  })
                : data?.products.map((product) => {
                    return (
                      <ListItem key={product.id}>
                        <ProductCard product={product} />
                      </ListItem>
                    );
                  })}
            </List>
          </Panel>
        </Section>
      </div>
    </>
  );
}

ProductListView.Layout = AppLayout;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const queryClient = createQueryClient();
  const parsedQuery = getFilterProductsArgs(parseRouteParams(ctx.query));
  await queryClient.prefetchQuery(
    productsAPI.filterProducts({
      args: parsedQuery,
    }),
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default ProductListView;
