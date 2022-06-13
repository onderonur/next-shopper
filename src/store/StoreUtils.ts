import { State, StoreApi, UseBoundStore } from 'zustand';

type Selectors<StoreType> = {
  [key in keyof StoreType]: (state: StoreType) => StoreType[key];
};

export function createSelectors<StoreType extends State>(
  store: UseBoundStore<StoreApi<StoreType>>,
) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const selectors: any = {};

  Object.keys(store.getState()).forEach((key) => {
    selectors[key] = (state: StoreType) => state[key as keyof StoreType];
  });

  return selectors as Selectors<StoreType>;
}
