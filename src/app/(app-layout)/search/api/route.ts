import { createHandler } from '@/api/api-utils';
import { filterProducts } from '@/search/search-fetchers';
import { getProductFilterArgs } from '@/search/search-utils';
import { NextResponse } from 'next/server';

export const GET = createHandler(async (request) => {
  const productFilterArgs = getProductFilterArgs(request.nextUrl.searchParams);
  const response = await filterProducts(productFilterArgs);

  // TypeScript Warning: Response.json() is only valid from TypeScript 5.2.
  // If you use a lower TypeScript version,
  // you can use NextResponse.json() for typed responses instead.
  // https://nextjs.org/docs/app/building-your-application/routing/route-handlers#behavior
  return NextResponse.json(response);
});
