'use client';

import { useSyncExternalStore } from 'react';
import ModalProvider from './ModalContext';
import { modalStore } from './modalStore';

function ModalRoot() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const modals = useSyncExternalStore(
    modalStore.subscribe,
    modalStore.getSnapshot,
    modalStore.getServerSnapshot,
  );

  return (
    <>
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
    </>
  );
}

export default ModalRoot;
