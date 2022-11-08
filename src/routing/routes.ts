import { AnyFunction, Id } from '@src/common/CommonTypes';
import { paramsToSearchParams, pruneQueryParams } from './RoutingUtils';
import { ParsedUrlQuery } from 'querystring';
import { FilterProductsArgs } from '@src/products/ProductsTypes';

type CreateRouteArgs = {
  params?: unknown;
  query?: unknown;
};

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
  href: string;
};

function createRoute<RouteArgs extends CreateRouteArgs>(
  getPathname: (pathParams: RouteArgs['params']) => string,
): CreateRouteResult<RouteArgs> {
  return (...args) => {
    const [routeArgs] = args;

    const pathname = getPathname(routeArgs?.params);
    const search = paramsToSearchParams(routeArgs?.query as any).toString();

    // TODO: Buraya bi refactor yapılabilir.
    return {
      pathname,
      query: pruneQueryParams(routeArgs?.query),
      href: `${pathname}${search ? `?${search}` : ''}`,
    };
  };
}

type RouteArgs<T extends AnyFunction> = NonNullable<Parameters<T>[0]>;
export type PathParams<T extends AnyFunction> = RouteArgs<T>['params'];
export type QueryParams<T extends AnyFunction> = RouteArgs<T>['query'];

export const routes = {
  home: createRoute(() => '/'),
  search: createRoute<{ query?: FilterProductsArgs }>(() => '/search'),
  product: createRoute<{ params: { productId: Id } }>(
    (params) => `/products/${params.productId}`,
  ),
  checkout: createRoute(() => '/checkout'),
};
