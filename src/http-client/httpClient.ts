import axios from 'axios';

// https://github.com/vercel/next.js/blob/canary/packages/next/shared/lib/router/utils/querystring.ts
export function stringifyUrlQueryParam(param: unknown): string {
  if (
    typeof param === 'string' ||
    (typeof param === 'number' && !isNaN(param)) ||
    typeof param === 'boolean'
  ) {
    return String(param);
  } else {
    return '';
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function paramsSerializer(params: any) {
  const result = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((valueItem) => {
        const stringified = stringifyUrlQueryParam(valueItem);
        if (stringified) {
          result.append(key, stringified);
        }
      });
    } else {
      const stringified = stringifyUrlQueryParam(value);
      if (stringified) {
        result.set(key, stringified);
      }
    }
  });
  return result.toString();
}

export const httpClient = axios.create({
  paramsSerializer,
});
