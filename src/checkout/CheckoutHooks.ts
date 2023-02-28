import { httpClient } from '@/http-client/httpClient';
import { HttpClientError } from '@/http-client/HttpClientError';
import useSWRMutation from 'swr/mutation';
import { CompleteCheckoutArgs } from './CheckoutUtils';

export function useCheckoutMutation() {
  return useSWRMutation<void, HttpClientError, string, CompleteCheckoutArgs>(
    '/checkout/api',
    (url, { arg }) => httpClient.post(url, arg),
  );
}
