import { KeyOf } from '@src/common/CommonTypes';
import { isNil } from '@src/common/CommonUtils';
import { ParsedUrlQuery } from 'querystring';

export type ParsedRouteParams<RouteParams> = {
  get: (key: KeyOf<RouteParams>) => string | undefined;
  getMany: (key: KeyOf<RouteParams>) => string[];
};

export const parseRouteParams = <RouteParams>(
  query: ParsedUrlQuery,
): ParsedRouteParams<RouteParams> => {
  const get = (key: KeyOf<RouteParams>): string | undefined => {
    const value = query[key as string];
    if (Array.isArray(value)) {
      return value[0];
    }
    return value;
  };

  const getMany = (key: KeyOf<RouteParams>): string[] => {
    const value = query[key as string];
    if (Array.isArray(value)) {
      return value;
    }
    return typeof value === 'string' ? [value] : [];
  };

  return { get, getMany };
};

// Removes null/undefined params from query.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const pruneQueryParams = (query: any): ParsedUrlQuery => {
  const filteredQuery: ParsedUrlQuery = {};
  if (!query) {
    return filteredQuery;
  }
  Object.keys(query).forEach((key) => {
    const value = query[key];
    if (isNil(value) || value === '') {
      return;
    }
    filteredQuery[key] = value;
  });
  return filteredQuery;
};
