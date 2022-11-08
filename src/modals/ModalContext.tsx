import React, { useCallback, useContext, useMemo } from 'react';
import { modalStore } from './modalStore';

type ModalContextValue<Data> = {
  modalKey: string;
  isOpen: boolean;
  hide: (data: Data) => void;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ModalContext = React.createContext<ModalContextValue<any>>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  {} as ModalContextValue<any>,
);

export function useModalContext<Data>() {
  return useContext(ModalContext) as ModalContextValue<Data>;
}

type ModalProviderProps = React.PropsWithChildren<{
  modalKey: string;
  isOpen: boolean;
}>;

export default function ModalProvider<Data>({
  modalKey,
  isOpen,
  children,
}: ModalProviderProps) {
  const hide = useCallback(
    (data: Data) => {
      modalStore.hideModal(modalKey, data);
    },
    [modalKey],
  );

  const contextValue = useMemo(() => {
    return { modalKey, isOpen, hide };
  }, [hide, isOpen, modalKey]);

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
    </ModalContext.Provider>
  );
}
