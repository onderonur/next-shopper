import produce from 'immer';
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Maybe } from './CommonTypes';
import ModalProvider from './ModalContext';

let modalKeySeed = 0;

type ModalRootContextValue = {
  registerModal: (ModalComponent: React.ElementType) => {
    modalKey: string;
    unregisterModal: VoidFunction;
  };
  showModal: <ModalProps, Data>(
    modalKey: string,
    modalProps: ModalProps,
  ) => Promise<Data>;
  hideModal: <Data>(modalKey: string, data: Data) => void;
};

const ModalRootContext = React.createContext<ModalRootContextValue>(
  {} as ModalRootContextValue,
);

export function useModalRootContext() {
  return useContext(ModalRootContext);
}

export function useModal<ModalProps, Data>(
  ModalComponent: React.ElementType<ModalProps>,
) {
  const { registerModal, showModal } = useModalRootContext();
  const modalKeyRef = useRef<string>('');

  useEffect(() => {
    const registeredModal = registerModal(ModalComponent);
    modalKeyRef.current = registeredModal.modalKey;
    return () => {
      registeredModal.unregisterModal();
    };
  }, [ModalComponent, registerModal]);

  const modal = useMemo(() => {
    function show(modalProps: ModalProps) {
      return showModal<ModalProps, Data>(modalKeyRef.current, modalProps);
    }

    return { show };
  }, [showModal]);

  return modal;
}

type RegisteredModal<ModalProps, Data> = {
  modalKey: string;
  isOpen: boolean;
  ModalComponent: React.ElementType<ModalProps>;
  modalProps: ModalProps;
  promiseResolve: Maybe<(data: Data) => void>;
  promiseReject: Maybe<(reason?: unknown) => void>;
};

type ModalRootProviderProps = React.PropsWithChildren<{}>;

function ModalRootProvider({ children }: ModalRootProviderProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [modals, setModals] = useState<RegisteredModal<any, any>[]>([]);

  const contextValue = useMemo(() => {
    function registerModal<ModalProps, Data>(
      ModalComponent: React.ElementType<ModalProps>,
    ) {
      const modalKey = (modalKeySeed++).toString();
      const registeredModal: RegisteredModal<ModalProps, Data> = {
        modalKey,
        isOpen: false,
        ModalComponent,
        modalProps: {} as ModalProps,
        promiseResolve: null,
        promiseReject: null,
      };
      setModals(
        produce((draft) => {
          draft.push(registeredModal);
        }),
      );

      function unregisterModal() {
        setModals((current) =>
          current.filter((modal) => modal.modalKey !== modalKey),
        );
      }

      return { modalKey, unregisterModal };
    }

    function showModal<ModalProps, Data>(
      modalKey: string,
      modalProps: ModalProps,
    ) {
      type CurrentModal = RegisteredModal<ModalProps, Data>;

      let promiseResolve: CurrentModal['promiseResolve'] = null;
      let promiseReject: CurrentModal['promiseReject'] = null;

      const modalPromise = new Promise<Data>((resolve, reject) => {
        promiseResolve = resolve;
        promiseReject = reject;
      });

      setModals(
        produce((draft) => {
          const modalToShow = draft.find(
            (modal) => modal.modalKey === modalKey,
          );
          if (modalToShow) {
            modalToShow.isOpen = true;
            modalToShow.modalProps = modalProps;
            modalToShow.promiseResolve = promiseResolve;
            modalToShow.promiseReject = promiseReject;
          }
        }),
      );

      return modalPromise;
    }

    function hideModal<Data>(modalKey: string, data: Data) {
      setModals(
        produce((draft) => {
          const modalToHide = draft.find(
            (modal) => modal.modalKey === modalKey,
          );
          if (modalToHide) {
            modalToHide.isOpen = false;
            modalToHide.modalProps = {};
            modalToHide.promiseResolve?.(data);
          }
        }),
      );
    }

    return { registerModal, showModal, hideModal };
  }, []);

  return (
    <ModalRootContext.Provider value={contextValue}>
      {children}
      {modals.map((modal) => {
        return (
          <ModalProvider
            key={modal.modalKey}
            modalKey={modal.modalKey}
            isOpen={modal.isOpen}
          >
            <modal.ModalComponent {...modal.modalProps} />
          </ModalProvider>
        );
      })}
    </ModalRootContext.Provider>
  );
}

export default ModalRootProvider;
