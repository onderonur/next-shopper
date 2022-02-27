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
      queries: {
        refetchOnWindowFocus: false,
        retry: false,
      },
    },
  });
};

export const createQuery = <
  Key extends QueryKey,
  Data,
  Args = undefined,
  QueryError extends ApiRequestError = ApiRequestError,
>(config: {
  getQueryKey: (args: Args) => Key;
  queryFn: (
    ...customCtx: [Args, ...Parameters<QueryFunction<Data, Key>>]
  ) => ReturnType<QueryFunction<Data, Key>>;
}) => {
  type CreatedQueryOptions = { args: Args } & UseQueryOptions<
    Data,
    QueryError,
    Data,
    Key
  >;

  return (
    // If Args is undefined, options parameter is optional.
    ...options: Args extends undefined
      ? [CreatedQueryOptions?]
      : [CreatedQueryOptions]
  ): UseQueryOptions<Data, QueryError, Data, Key> => {
    const { args, ...rest } = options[0] ?? {};
    return {
      ...rest,
      queryKey: config.getQueryKey(args as Args),
      queryFn: (ctx) => config.queryFn(args as Args, ctx),
    };
  };
};
