import { paramsSerializer, stringifyUrlQueryParam } from './httpClient';

test('stringifies query param', () => {
  expect(stringifyUrlQueryParam('someParam')).toBe('someParam');
  expect(stringifyUrlQueryParam(10)).toBe('10');
  expect(stringifyUrlQueryParam(0)).toBe('0');
  expect(stringifyUrlQueryParam(true)).toBe('true');
  expect(stringifyUrlQueryParam(false)).toBe('false');
});

test('returns empty string for non-valid query params', () => {
  expect(stringifyUrlQueryParam('')).toBe('');
  expect(stringifyUrlQueryParam(null)).toBe('');
  expect(stringifyUrlQueryParam(undefined)).toBe('');
  expect(stringifyUrlQueryParam(NaN)).toBe('');
});

test('serializes query params', () => {
  expect(
    paramsSerializer({
      str: 'some string param',
      num: 1,
      bool: true,
      arrStr: ['item a', 'item b'],
      arrNum: [1, 2, 3, 4],
    }),
  ).toBe(
    'str=some+string+param&num=1&bool=true&arrStr=item+a&arrStr=item+b&arrNum=1&arrNum=2&arrNum=3&arrNum=4',
  );
});

test('ignores non-valid params when serializing', () => {
  expect(
    paramsSerializer({
      empty: '',
      nan: NaN,
      nullishA: null,
      nullishB: undefined,
    }),
  ).toBe('');
});
