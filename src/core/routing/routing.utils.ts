import type { SearchParams } from '@/core/routing/routing.types';
import type { Id, Maybe } from '@/core/shared/shared.types';
import type { ProductFilterArgs } from '@/features/search/search.types';

function createUrl(pathname: string, searchParams?: URLSearchParams) {
  const searchParamsString = searchParams?.toString();
  const queryString = searchParamsString ? `?${searchParamsString}` : '';
  return `${pathname}${queryString}`;
}

function parseToURLSearchParams(params: Maybe<SearchParams>) {
  const searchParams = new URLSearchParams();

  function appendParam(key: string, value: Maybe<string>) {
    if (value !== null && value !== undefined) {
      searchParams.append(key, value);
    }
  }

  for (const [key, value] of Object.entries(params ?? {})) {
    if (Array.isArray(value)) {
      for (const valueItem of value) {
        appendParam(key, valueItem);
      }
    } else {
      appendParam(key, value);
    }
  }

  return searchParams;
}

// https://stackoverflow.com/a/55247867/10876256
type RequiredKeys<T> = {
  [K in keyof T]-?: object extends { [P in K]: T[K] } ? never : K;
}[keyof T];

type HasRequiredField<T> = RequiredKeys<T> extends never ? false : true;

type CreateRouteArgs = {
  params?: unknown;
  query?: SearchParams;
};

type CreateRouteResult<RouteArgs extends CreateRouteArgs> = (
  // args parameter is optional when both of params and query fields are optional
  ...args: HasRequiredField<RouteArgs> extends true ? [RouteArgs] : [RouteArgs?]
) => string;

function createRoute<RouteArgs extends CreateRouteArgs>(
  getPathname: (pathParams: RouteArgs['params']) => string,
): CreateRouteResult<RouteArgs> {
  return (...args) => {
    const [routeArgs] = args;
    const pathname = getPathname(routeArgs?.params);
    const searchParams = parseToURLSearchParams(routeArgs?.query);
    return createUrl(pathname, searchParams);
  };
}

export const routes = {
  home: createRoute(() => '/'),
  search: createRoute<{ query?: ProductFilterArgs }>(() => '/search'),
  product: createRoute<{ params: { productId: Id } }>(
    ({ productId }) => `/products/${productId}`,
  ),
  checkout: createRoute(() => '/checkout'),
  orders: createRoute(() => '/orders'),
  order: createRoute<{ params: { orderId: Id } }>(
    ({ orderId }) => `/orders/${orderId}`,
  ),
  favorites: createRoute(() => '/products/favorites'),
};
