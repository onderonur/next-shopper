import { Nil } from './CommonTypes';

export const APP_TITLE = 'Next-Shopper';
export const APP_DESCRIPTION = `${APP_TITLE} is a simple fullstack e-commerce website demo built with Next.js`;
export const APP_REPOSITORY_URL = 'https://github.com/onderonur/next-shopper';

export const createMockArray = (length: number) => {
  return Array.from(Array(length).keys());
};

export const isNil = (val: unknown): val is Nil => {
  return val === null || val === undefined;
};
