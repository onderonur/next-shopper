import { ApiErrorResponse } from '@src/api/ApiTypes';
import { AxiosError } from 'axios';

export type ApiRequestError = AxiosError<ApiErrorResponse>;
