import type { SearchParams } from '@/core/routing/types';
import type { Id, Maybe } from '@/core/shared/types';
import type { ProductFilterArgs } from '@/features/search/types';
import { notFound } from 'next/navigation';
import type { z } from 'zod';

function createUrl(pathname: string, searchParams?: URLSearchParams) {
  const searchParamsString = searchParams?.toString();
  const queryString = searchParamsString ? `?${searchParamsString}` : '';
  return `${pathname}${queryString}`;
}

export function parseSearchParams<Output, Def extends z.ZodTypeDef, Input>({
  searchParamsSchema,
  searchParams,
}: {
  searchParamsSchema: z.ZodSchema<Output, Def, Input>;
  searchParams: SearchParams;
}) {
  const result = searchParamsSchema.safeParse(searchParams);
  if (!result.success) notFound();
  return result.data;
}

function isNonEmptyValue<Value extends string | number>(
  value: Value | null | undefined,
): value is Value {
  return value !== null && value !== undefined && value !== '';
}

function parseObjectToSearchParams(
  searchParams: Maybe<
    Record<string, string | string[] | number | undefined | null>
  >,
) {
  const parsedSearchParams = new URLSearchParams();

  if (!searchParams) return parsedSearchParams;

  for (const [key, value] of Object.entries(searchParams)) {
    if (Array.isArray(value)) {
      for (const valueItem of value) {
        if (isNonEmptyValue(valueItem)) {
          parsedSearchParams.append(key, valueItem);
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

export const routes = {
  home: () => '/',
  signIn: (args?: { callbackUrl: string | null }) =>
    createUrl('/auth/sign-in', parseObjectToSearchParams(args)),
  search: (args?: ProductFilterArgs) =>
    createUrl('/search', parseObjectToSearchParams(args)),
  product: ({ productId }: { productId: Id }) => `/products/${productId}`,
  checkout: () => '/checkout',
  orders: () => '/orders',
  order: ({ orderId }: { orderId: Id }) => `/orders/${orderId}`,
  favorites: () => '/products/favorites',
};
