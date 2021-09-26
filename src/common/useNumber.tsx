import { Maybe } from './CommonTypes';
import { parseNumber } from './CommonUtils';

export const useNumber = (val: Maybe<string>) => {
  return parseNumber(val);
};
