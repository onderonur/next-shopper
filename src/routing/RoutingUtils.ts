import { isNil } from '@src/common/CommonUtils';
import { ParsedUrlQuery } from 'querystring';

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

// TODO: Rename, refactor etc.
export function paramsToSearchParams(params: any) {
  const searchParams = new URLSearchParams();

  Object.entries(params ?? {}).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((valueItem) => {
        searchParams.append(key, valueItem);
      });
    } else {
      searchParams.append(key, value as any);
    }
  });

  return searchParams;
}
