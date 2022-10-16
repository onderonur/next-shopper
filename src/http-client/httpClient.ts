import axios from 'axios';

// https://github.com/vercel/next.js/blob/canary/packages/next/shared/lib/router/utils/querystring.ts
function stringifyUrlQueryParam(param: unknown): string {
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

export const httpClient = axios.create({
  paramsSerializer: {
    serialize: (params) => {
      const result = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((valueItem) => {
            result.append(key, stringifyUrlQueryParam(valueItem));
          });
        } else {
          result.set(key, stringifyUrlQueryParam(value));
        }
      });
      return result.toString();
    },
  },
});
