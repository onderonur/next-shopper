export const APP_URL = 'https://next-shopper.vercel.app';
export const APP_TITLE = 'next-shopper';
export const APP_DESCRIPTION = `A fullstack e-commerce website demo built with Next.js to showcase various tech tools`;
export const APP_REPOSITORY_URL = 'https://github.com/onderonur/next-shopper';

export function createMockArray(length: number) {
  // eslint-disable-next-line unicorn/prefer-spread
  return Array.from(Array.from({ length }).keys());
}

export function getDateString(date: Date) {
  return `${date.getFullYear()}-${date.getMonth().toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
}
