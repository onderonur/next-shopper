'use client';

import { useSyncExternalStore } from 'react';
import ModalProvider from './ModalContext';
import { modalStore } from './modalStore';

export default function ModalRoot() {
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
