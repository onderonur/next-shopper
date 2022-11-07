'use client';

import { Provider } from 'react-redux';
import { makeStore } from './store';

const store = makeStore();

type StoreProvider = React.PropsWithChildren;

export default function StoreProvider({ children }: StoreProvider) {
  return <Provider store={store}>{children}</Provider>;
}
