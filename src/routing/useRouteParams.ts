import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { parseRouteParams, pruneQueryParams } from './RoutingUtils';

export const useRouteParams = <RouteParams>() => {
  const router = useRouter();

  const setQueryParams = useCallback(
    (args: RouteParams) => {
      router.push(
        {
          query: pruneQueryParams(args),
        },
        undefined,
        { shallow: true },
      );
    },
    [router],
  );

  return {
    // Pages that are statically optimized by Automatic Static Optimization will be hydrated
    // without their route parameters provided, i.e query will be an empty object ({}).
    // https://nextjs.org/docs/routing/dynamic-routes#caveats
    isReady: router.isReady,
    routeParams: parseRouteParams<RouteParams>(router.query),
    setQueryParams,
  };
};
