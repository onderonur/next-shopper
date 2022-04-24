import { AnyFunction, Id } from '@src/common/CommonTypes';
import { pruneQueryParams } from './RoutingUtils';
import { ParsedUrlQuery } from 'querystring';
import { FilterProductsArgs } from '@src/products/ProductsTypes';

interface CreateRouteArgs {
  params?: unknown;
  query?: unknown;
}

// https://stackoverflow.com/a/55247867/10876256
type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends { [P in K]: T[K] } ? never : K;
}[keyof T];
type HasRequiredField<T> = RequiredKeys<T> extends never ? false : true;

type CreateRouteResult<RouteArgs extends CreateRouteArgs> = (
  // args parameter is optional when both of params and query fields are optional
  ...args: HasRequiredField<RouteArgs> extends true ? [RouteArgs] : [RouteArgs?]
) => {
  pathname: string;
  query: ParsedUrlQuery;
};

function createRoute<RouteArgs extends CreateRouteArgs>(
  pathname: (pathParams: RouteArgs['params']) => string,
): CreateRouteResult<RouteArgs> {
  return (...args) => {
    const [routeArgs] = args;
    return {
      pathname: pathname(routeArgs?.params),
      query: pruneQueryParams(routeArgs?.query),
    };
  };
}

type RouteArgs<T extends AnyFunction> = NonNullable<Parameters<T>[0]>;
export type PathParams<T extends AnyFunction> = RouteArgs<T>['params'];
export type QueryParams<T extends AnyFunction> = RouteArgs<T>['query'];
export type RouteParams<T extends AnyFunction> = PathParams<T> & QueryParams<T>;

export const routes = {
  home: createRoute(() => '/'),
  search: createRoute<{ query?: FilterProductsArgs }>(() => '/search'),
  product: createRoute<{ params: { productId: Id } }>(
    (params) => `/products/${params.productId}`,
  ),
  checkout: createRoute(() => '/checkout'),
};
