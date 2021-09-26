import React, { useContext, useState, useMemo } from 'react';
import { Maybe, Omit } from './CommonTypes';
import ConfirmModal, { ConfirmModalProps } from './ConfirmModal';

type AskConfirmArgs = Pick<
  ConfirmModalProps,
  'isOpen' | 'title' | 'onConfirm' | 'confirmText'
> & {
  body: string;
};

interface ConfirmContextValue {
  askConfirm: (args: Omit<AskConfirmArgs, 'isOpen'>) => void;
}

const ConfirmContext = React.createContext<ConfirmContextValue>(
  {} as ConfirmContextValue,
);

export const useConfirm = () => {
  return useContext(ConfirmContext);
};

type ConfirmProviderProps = React.PropsWithChildren<{}>;

function ConfirmProvider({ children }: ConfirmProviderProps) {
  const [confirmModalProps, setConfirmModalProps] =
    useState<Maybe<AskConfirmArgs>>(null);

  const contextValue = useMemo<ConfirmContextValue>(() => {
    const askConfirm: ConfirmContextValue['askConfirm'] = (args) => {
      setConfirmModalProps({ ...args, isOpen: true });
    };

    return { askConfirm };
  }, []);

  return (
    <>
      <ConfirmContext.Provider value={contextValue}>
        {children}
      </ConfirmContext.Provider>
      <ConfirmModal
        isOpen={confirmModalProps?.isOpen}
        title={confirmModalProps?.title}
        confirmText={confirmModalProps?.confirmText}
        onConfirm={confirmModalProps?.onConfirm}
        onClose={() => setConfirmModalProps(null)}
      >
        <p>{confirmModalProps?.body}</p>
      </ConfirmModal>
    </>
  );
}

export default ConfirmProvider;
