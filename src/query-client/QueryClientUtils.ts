import { Maybe } from '@src/common/CommonTypes';
import { ApiRequestError } from '@src/error-handling/ErrorHandlingTypes';
import {
  QueryClient,
  QueryFunction,
  QueryKey,
  UseQueryOptions,
} from 'react-query';

export const createQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: { refetchOnWindowFocus: false, retry: false },
    },
  });
};

export const createQuery =
  <
    Key extends QueryKey,
    Data,
    Args = undefined,
    QueryError extends ApiRequestError = ApiRequestError,
  >(config: {
    getQueryKey: (args?: Args) => Maybe<Key>;
    queryFn: QueryFunction<Data, Key>;
  }) =>
  (
    options?: { args?: Args } & UseQueryOptions<Data, QueryError, Data, Key>,
  ): UseQueryOptions<Data, QueryError, Data, Key> => {
    const { args, ...rest } = options ?? {};
    return {
      ...rest,
      queryKey: config.getQueryKey(args) ?? undefined,
      queryFn: config.queryFn,
    };
  };
