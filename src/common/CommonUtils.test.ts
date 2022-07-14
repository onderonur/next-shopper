import { createMockArray, isNil } from './CommonUtils';

test('creates mock array', () => {
  expect(createMockArray(5)).toEqual([0, 1, 2, 3, 4]);
});

test('returns `true` for nullish values', () => {
  expect(isNil(null)).toBeTruthy();
  expect(isNil(undefined)).toBeTruthy();
});

test('returns `false` for non-nullish values', () => {
  expect(isNil('')).toBeFalsy();
  expect(isNil('some text')).toBeFalsy();
  expect(isNil(0)).toBeFalsy();
  expect(isNil(1)).toBeFalsy();
  expect(isNil(NaN)).toBeFalsy();
  expect(isNil(true)).toBeFalsy();
  expect(isNil(false)).toBeFalsy();
  expect(isNil(new Date())).toBeFalsy();
  expect(isNil(new Error())).toBeFalsy();
  expect(isNil([1, 2, 3])).toBeFalsy();
});
