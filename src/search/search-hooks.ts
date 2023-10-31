import { useSearchParams } from 'next/navigation';
import { ProductFilterResponse } from '@/search/search-types';
import useSWR, { SWRConfiguration } from 'swr';
import { HttpClientError } from '@/http-client/http-client-error';
import { getProductFilterArgs } from '@/search/search-utils';

export function useFilterProducts(config?: SWRConfiguration) {
  const searchParams = useSearchParams();
  const queryString = searchParams.toString();
  return useSWR<ProductFilterResponse, HttpClientError>(
    `/search/api${queryString ? `?${queryString}` : ''}`,
    { ...config, keepPreviousData: true },
  );
}

export function useProductFilterArgs() {
  const searchParams = useSearchParams();
  const productFilterArgs = getProductFilterArgs(searchParams);
  return productFilterArgs;
}
