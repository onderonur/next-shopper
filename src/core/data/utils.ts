// https://nextjs.org/docs/app/building-your-application/data-fetching/fetching#preloading-data
export function preload<Args extends unknown[], Result>(
  fn: (...args: Args) => Promise<Result>,
) {
  return (...args: Args) => {
    void fn(...args);
  };
}
