import { HttpClientError } from '@/http-client/HttpClientError';

export type ApiRequestError = HttpClientError;

export type ApiErrorResponse = {
  statusCode: number;
  message: string;
};
