import { GetManyProductsArgs } from '@src/api/products/productsService';
import { AnyFunction, Id } from '@src/common/CommonTypes';
import { pruneQueryParams } from './RoutingUtils';
import { ParsedUrlQuery } from 'querystring';

interface CreateRouteArgs {
  params?: unknown;
  query?: unknown;
}

export type CreateRouteResult<T extends CreateRouteArgs> = (args: T) => {
  pathname: string;
  query: ParsedUrlQuery;
};

function createRoute<T extends CreateRouteArgs>(
  pathname: string | ((pathParams: T['params']) => string),
): CreateRouteResult<T> {
  return (args: T) => {
    return {
      pathname: typeof pathname === 'string' ? pathname : pathname(args.params),
      query: pruneQueryParams(args.query),
    };
  };
}

export type PathParams<T extends AnyFunction> = Parameters<T>[0] extends {
  params?: unknown;
}
  ? Parameters<T>[0]['params']
  : undefined;
export type QueryParams<T extends AnyFunction> = Parameters<T>[0] extends {
  query?: unknown;
}
  ? Parameters<T>[0]['query']
  : undefined;

export const routes = {
  home: createRoute('/'),
  search: createRoute<{ query?: GetManyProductsArgs }>('/search'),
  product: createRoute<{ params: { productId: Id } }>(
    (params) => `/products/${params.productId}`,
  ),
  checkout: createRoute('/checkout'),
};
