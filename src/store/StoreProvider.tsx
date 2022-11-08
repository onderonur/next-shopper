'use client';

import { Provider } from 'react-redux';
import { store } from './store';

type StoreProvider = React.PropsWithChildren;

export default function StoreProvider({ children }: StoreProvider) {
  return <Provider store={store}>{children}</Provider>;
}
