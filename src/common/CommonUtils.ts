import { Maybe, Nil } from './CommonTypes';

export const APP_TITLE = 'Next-Shopper';
export const APP_DESCRIPTION = `${APP_TITLE} is a simple fullstack e-commerce website demo built with Next.js`;
export const APP_REPOSITORY_URL = 'https://github.com/onderonur/next-shopper';

export const createMockArray = (length: number) => {
  return new Array(length).fill(0);
};

export const parseNumber = (val: Maybe<unknown>) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const parsed = val ? parseInt(val as any) : null;
  return Number.isFinite(parsed) ? parsed : null;
};

export const isNil = (val: unknown): val is Nil => {
  return val === null || val === undefined;
};

export const IS_SERVER = typeof window === 'undefined';
