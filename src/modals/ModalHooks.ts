import { useEffect, useMemo, useRef } from 'react';
import { modalStore } from './modalStore';

export function useModal<ModalProps, Data>(
  ModalComponent: React.ElementType<ModalProps>,
) {
  const modalKeyRef = useRef<string>('');

  useEffect(() => {
    const registeredModal = modalStore.registerModal(ModalComponent);
    modalKeyRef.current = registeredModal.modalKey;
    return () => {
      registeredModal.unregisterModal();
    };
  }, [ModalComponent]);

  const modal = useMemo(() => {
    function show(modalProps: ModalProps) {
      return modalStore.showModal<ModalProps, Data>(
        modalKeyRef.current,
        modalProps,
      );
    }

    return { show };
  }, []);

  return modal;
}
