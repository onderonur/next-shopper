import { httpClient } from '@src/http-client/httpClient';
import { HttpClientError } from '@src/http-client/HttpClientError';
import useSWRMutation from 'swr/mutation';
import { CompleteCheckoutArgs } from './CheckoutUtils';

export function useCheckoutMutation() {
  return useSWRMutation<void, HttpClientError, string, CompleteCheckoutArgs>(
    '/api/checkout',
    (url, { arg }) => httpClient.post(url, arg),
  );
}
