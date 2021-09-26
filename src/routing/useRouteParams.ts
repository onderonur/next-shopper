import { Maybe } from '@src/common/CommonTypes';
import { useRouter } from 'next/dist/client/router';
import { useCallback } from 'react';
import { parseRouteParams, pruneQueryParams } from './RoutingUtils';
import { ParsedUrlQuery } from 'querystring';

export const useRouteParams = <
  P extends Maybe<{}>,
  Q extends Maybe<ParsedUrlQuery> = {},
>() => {
  const router = useRouter();

  const setQueryParams = useCallback(
    (args: Partial<Q>) => {
      router.push({
        query: pruneQueryParams(args),
      });
    },
    [router],
  );

  return {
    // Pages that are statically optimized by Automatic Static Optimization will be hydrated
    // without their route parameters provided, i.e query will be an empty object ({}).
    // https://nextjs.org/docs/routing/dynamic-routes#caveats
    isReady: router.isReady,
    routeParams: parseRouteParams<P & Q>(router.query),
    setQueryParams,
  };
};
