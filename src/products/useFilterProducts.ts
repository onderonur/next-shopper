import { useSearchParams } from 'next/navigation';
import { ProductFilterResponse } from './ProductsTypes';
import useSWR, { SWRConfiguration } from 'swr';
import { HttpClientError } from '@src/http-client/HttpClientError';

export function useFilterProducts(config?: SWRConfiguration) {
  const searchParams = useSearchParams();
  const queryString = searchParams.toString();
  return useSWR<ProductFilterResponse, HttpClientError>(
    `/api/search${queryString ? `?${queryString}` : ''}`,
    { ...config, keepPreviousData: true },
  );
}
