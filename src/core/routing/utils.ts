import type { SearchParams } from '@/core/routing/types';
import type { Id, Maybe, ValueOf } from '@/core/shared/types';
import { notFound } from 'next/navigation';
import type { z } from 'zod';
import type { SearchPageSearchParams, SignInPageSearchParams } from './schemas';

export function parseSearchParams<T extends z.ZodType>({
  schema,
  searchParams,
}: {
  schema: T;
  searchParams: SearchParams;
}) {
  const result = schema.safeParse(searchParams);
  if (!result.success) notFound();
  return result.data;
}

function isNonEmptyValue<Value extends string | number>(
  value: Value | null | undefined,
): value is Value {
  return value !== null && value !== undefined && value !== '';
}

// To accept `number`, `number[]` and `null` as `SearchParams` values.
type ExtendedSearchParams = Record<
  keyof SearchParams,
  ValueOf<SearchParams> | number | number[] | null
>;

function parseObjectToSearchParams(searchParams: Maybe<ExtendedSearchParams>) {
  const parsedSearchParams = new URLSearchParams();

  if (!searchParams) return parsedSearchParams;

  for (const [key, value] of Object.entries(searchParams)) {
    if (Array.isArray(value)) {
      for (const valueItem of value) {
        if (isNonEmptyValue(valueItem)) {
          parsedSearchParams.append(key, valueItem.toString());
        }
      }

      continue;
    }

    if (isNonEmptyValue(value)) {
      parsedSearchParams.append(key, value.toString());
    }
  }

  return parsedSearchParams;
}

function createUrl(pathname: string, searchParams?: ExtendedSearchParams) {
  const urlSearchParams = parseObjectToSearchParams(searchParams);
  const urlSearchParamsString = urlSearchParams.toString();
  const queryString = urlSearchParamsString ? `?${urlSearchParamsString}` : '';
  return `${pathname}${queryString}`;
}

export const routes = {
  home: () => '/',
  signIn: (args?: SignInPageSearchParams) => createUrl('/auth/sign-in', args),
  search: (args?: SearchPageSearchParams) => createUrl('/search', args),
  product: (args: { productId: Id }) => `/products/${args.productId}`,
  checkout: () => '/checkout',
  orders: () => '/orders',
  order: (args: { orderId: Id }) => `/orders/${args.orderId}`,
  favorites: () => '/products/favorites',
  account: () => '/account',
};
