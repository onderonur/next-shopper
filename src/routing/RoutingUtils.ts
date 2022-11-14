import { Maybe } from '@src/common/CommonTypes';
import { isNil } from '@src/common/CommonUtils';

export function parseToSearchParams(
  params: Maybe<Record<string, Maybe<string | string[]>>>,
) {
  const searchParams = new URLSearchParams();

  function appendParam(key: string, value: Maybe<string>) {
    if (!isNil(value)) {
      searchParams.append(key, value);
    }
  }

  Object.entries(params ?? {}).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((valueItem) => {
        appendParam(key, valueItem);
      });
    } else {
      appendParam(key, value);
    }
  });

  return searchParams;
}
