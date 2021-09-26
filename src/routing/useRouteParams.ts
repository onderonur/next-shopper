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
    routeParams: parseRouteParams<P & Q>(router.query),
    setQueryParams,
  };
};
