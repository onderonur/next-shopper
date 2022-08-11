import { ApiRequestError } from '@src/error-handling/ErrorHandlingTypes';
import {
  QueryClient,
  QueryFunction,
  QueryKey,
  UseQueryOptions,
} from '@tanstack/react-query';

export const createQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: false,
        // For SSR:
        // Because staleTime defaults to 0, queries will be refetched in the background on page load by default.
        // You might want to use a higher staleTime to avoid this double fetching, especially if you don't cache your markup.
        // https://@tanstack/react-query.tanstack.com/guides/ssr#staleness-is-measured-from-when-the-query-was-fetched-on-the-server
        staleTime: 1000,
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
