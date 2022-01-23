import React, { useContext, useState, useMemo } from 'react';
import { Maybe, Omit } from './CommonTypes';
import ConfirmModal, { ConfirmModalProps } from './ConfirmModal';

type AskConfirmArgs = Pick<
  ConfirmModalProps,
  'isOpen' | 'title' | 'confirmText'
> & {
  body: string;
};

interface ConfirmContextValue {
  askConfirm: (args: Omit<AskConfirmArgs, 'isOpen'>) => Promise<boolean>;
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
    useState<Maybe<ConfirmModalProps>>(null);

  const contextValue = useMemo<ConfirmContextValue>(() => {
    const askConfirm: ConfirmContextValue['askConfirm'] = ({
      title,
      body,
      confirmText,
    }) => {
      return new Promise<boolean>((resolve) => {
        setConfirmModalProps({
          isOpen: true,
          title,
          children: body,
          confirmText,
          onConfirm: () => {
            resolve(true);
          },
          onClose: () => {
            setConfirmModalProps(null);
            resolve(false);
          },
        });
      });
    };

    return { askConfirm };
  }, []);

  return (
    <>
      <ConfirmContext.Provider value={contextValue}>
        {children}
      </ConfirmContext.Provider>
      <ConfirmModal {...confirmModalProps}>
        <p>{confirmModalProps?.children}</p>
      </ConfirmModal>
    </>
  );
}

export default ConfirmProvider;
