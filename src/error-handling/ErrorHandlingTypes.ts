import { HttpClientError } from '@src/http-client/HttpClientError';

export type ApiRequestError = HttpClientError;

export type ApiErrorResponse = {
  statusCode: number;
  message: string;
};
