import ProductCard from '@src/products/ProductCard';
import { useRouteParams } from '@src/routing/useRouteParams';
import Panel from '@src/common/Panel';
import { useProducts } from '@src/products/useProducts';
import AppLayout from '@src/app-layout/AppLayout';
import List from '@src/common/List';
import ProductCardSkeleton from '@src/products/ProductCardSkeleton';
import BaseSeo from '@src/seo/BaseSeo';
import { productSorting } from '@src/products/ProductsUtils';
import Button from '@src/common/Button';
import { FilterIcon } from '@src/common/Icons';
import ProductFilter from '@src/products/ProductFilter';
import Drawer, { useDrawer } from '@src/common/Drawer';
import Section from '@src/common/Section';
import { QueryParams, routes } from '@src/routing/routes';

type ProductListViewQueryParams = QueryParams<typeof routes['search']>;

function ProductListView() {
  const { isReady, routeParams, setQueryParams } = useRouteParams<
    {},
    ProductListViewQueryParams
  >();
  const category = routeParams.get('category');
  const sorting = routeParams.get('sorting') ?? productSorting.priceAsc.id;
  const query = { category, sorting };
  const { data: products, isLoading } = useProducts({
    args: query,
    enabled: isReady,
  });

  const productFilter = (
    <ProductFilter
      values={query}
      onChange={(values) =>
        setQueryParams({
          category: values.category ?? undefined,
          sorting: values.sorting ?? undefined,
        })
      }
    />
  );

  const { isOpen, open, close } = useDrawer({ closeOnRouteChange: false });

  return (
    <>
      <BaseSeo title="Products" />
      <div className="flex gap-6">
        <Section
          title="Product Filter"
          titleAs="h2"
          hideTitle
          className="hidden md:block w-64"
        >
          <div className="sticky top-24">{productFilter}</div>
        </Section>
        <Section title="Products" titleAs="h1" hideTitle className="flex-1">
          <div className="md:hidden flex justify-end">
            <Button variant="transparent" icon={<FilterIcon />} onClick={open}>
              Filter
            </Button>
            <Drawer title="Product Filter" isOpen={isOpen} onClose={close}>
              {productFilter}
            </Drawer>
          </div>
          <Panel>
            <List
              className="grid grid-cols-autofill-44 gap-4"
              items={products}
              isLoading={isLoading}
              getItemKey={(product) => product.id.toString()}
              renderItem={(product) => <ProductCard product={product} />}
              skeletonCount={8}
              itemSkeleton={<ProductCardSkeleton />}
            />
          </Panel>
        </Section>
      </div>
    </>
  );
}

ProductListView.Layout = AppLayout;

export default ProductListView;
