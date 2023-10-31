'use client';

import { useBackdrop } from './backdrop';
import { createSafeContext } from './safe-context';

type DrawerContextValue = {
  isOpen: boolean;
  open: VoidFunction;
  close: VoidFunction;
};

const [DrawerContext, useDrawerContext] = createSafeContext<DrawerContextValue>(
  {
    displayName: 'DrawerContext',
  },
);

export { useDrawerContext };

type DrawerProviderProps = React.PropsWithChildren<{
  closeOnRouteChange?: boolean;
}>;

export default function DrawerProvider({
  closeOnRouteChange = true,
  children,
}: DrawerProviderProps) {
  const contextValue = useBackdrop({ closeOnRouteChange });

  return (
    <DrawerContext.Provider value={contextValue}>
      {children}
    </DrawerContext.Provider>
  );
}
