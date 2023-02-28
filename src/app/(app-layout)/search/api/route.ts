import { createHandler } from '@/api/ApiUtils';
import { searchService } from '@/search/searchService';
import { getProductFilterArgs } from '@/search/SearchUtils';
import { NextResponse } from 'next/server';

export const GET = createHandler(async (request) => {
  const productFilterArgs = getProductFilterArgs(request.nextUrl.searchParams);
  const response = await searchService.filterProducts(productFilterArgs);

  // TypeScript Warning: Although Response.json() is valid,
  // native TypeScript types currently shows an error,
  // you can use NextResponse.json() for typed responses instead.
  // https://beta.nextjs.org/docs/routing/route-handlers#static-route-handlers
  return NextResponse.json(response);
});
