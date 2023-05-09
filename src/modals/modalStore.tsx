import { Maybe } from '@/common/CommonTypes';
import { produce } from 'immer';

type RegisteredModal<ModalProps, Data> = {
  modalKey: string;
  isOpen: boolean;
  ModalComponent: React.ElementType<ModalProps>;
  modalProps: ModalProps;
  promiseResolve: Maybe<(data: Data) => void>;
  promiseReject: Maybe<(reason?: unknown) => void>;
};

function createModalStore() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let modals: RegisteredModal<any, any>[] = [];
  let modalKeySeed = 0;
  const listeners = new Set<VoidFunction>();

  function callListeners() {
    listeners.forEach((listener) => listener());
  }

  function subscribe(onStoreChange: VoidFunction) {
    listeners.add(onStoreChange);

    return () => {
      listeners.delete(onStoreChange);
    };
  }

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

    modals = produce(modals, (draft) => {
      draft.push(registeredModal);
    });

    callListeners();

    function unregisterModal() {
      modals = modals.filter((modal) => modal.modalKey !== modalKey);
      callListeners();
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

    modals = produce(modals, (draft) => {
      const modalToShow = draft.find((modal) => modal.modalKey === modalKey);
      if (modalToShow) {
        modalToShow.isOpen = true;
        modalToShow.modalProps = modalProps;
        modalToShow.promiseResolve = promiseResolve;
        modalToShow.promiseReject = promiseReject;
      }
    });

    callListeners();

    return modalPromise;
  }

  function hideModal<Data>(modalKey: string, data: Data) {
    modals = produce(modals, (draft) => {
      const modalToHide = draft.find((modal) => modal.modalKey === modalKey);
      if (modalToHide) {
        modalToHide.isOpen = false;
        modalToHide.modalProps = {};
        modalToHide.promiseResolve?.(data);
      }
    });

    callListeners();
  }

  return {
    subscribe,
    getSnapshot: () => modals,
    getServerSnapshot: () => modals,
    registerModal,
    showModal,
    hideModal,
  };
}

export const modalStore = createModalStore();
