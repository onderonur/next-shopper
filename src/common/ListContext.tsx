'use client';

import React, { useContext } from 'react';

type ListContextValue = {
  isAnimated?: boolean;
};

const ListContext = React.createContext<ListContextValue>(
  {} as ListContextValue,
);

export function useListContext() {
  return useContext(ListContext);
}

type ListProviderProps = React.PropsWithChildren<ListContextValue>;

export default function ListProvider({ children, ...rest }: ListProviderProps) {
  return <ListContext.Provider value={rest}>{children}</ListContext.Provider>;
}
