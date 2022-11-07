import { GetServerSideProps } from 'next';
import { dehydrate, DehydratedState } from '@tanstack/react-query';
import { createQueryClient } from '@src/query-client/QueryClientUtils';
import ErrorMessage from '@src/error-handling/ErrorMessage';
import ProductDetail from '@src/products/ProductDetail';
import { ParsedRouteParams, parseRouteParams } from '@src/routing/RoutingUtils';
import Loading from '@src/common/Loading';
import { useRouteParams } from '@src/routing/useRouteParams';
import BaseSeo from '@src/seo/BaseSeo';
import Panel from '@src/common/Panel';
import React from 'react';
import PageHeader from '@src/common/PageHeader';
import { RouteParams, routes } from '@src/routing/routes';
import { useQuery } from '@tanstack/react-query';
import { productsAPI } from '@src/products/productsAPI';

type ProductViewRouteParams = RouteParams<typeof routes['product']>;

function getProductId(routeParams: ParsedRouteParams<ProductViewRouteParams>) {
  return Number(routeParams.get('productId'));
}

interface ProductViewProps {
  // eslint-disable-next-line react/no-unused-prop-types
  dehydratedState?: DehydratedState;
}

function ProductView() {
  const { routeParams } = useRouteParams<ProductViewRouteParams>();
  const productId = getProductId(routeParams);
  const {
    data: product,
    isLoading,
    error,
  } = useQuery(productsAPI.fetchOneProduct({ args: { productId } }));

  return (
    <>
      <BaseSeo
        title={product?.title}
        description={product?.description}
        images={
          product?.image
            ? [
                {
                  url: product.image,
                  alt: product.title,
                },
              ]
            : undefined
        }
      />
      <PageHeader title={product?.title} />
      <Loading isLoading={isLoading}>
        <ErrorMessage error={error}>
          {product && (
            <Panel>
              <ProductDetail product={product} />
            </Panel>
          )}
        </ErrorMessage>
      </Loading>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<ProductViewProps> = async (
  ctx,
) => {
  // Using hydration:
  // https://tanstack.com/query/v4/docs/guides/ssr#using-hydration
  const productId = getProductId(parseRouteParams(ctx.query));
  const queryClient = createQueryClient();

  await queryClient.fetchQuery(
    productsAPI.fetchOneProduct({
      args: { productId },
    }),
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default ProductView;
