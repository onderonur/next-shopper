import Button from '@/common/button';
import { useOnRouteChange } from '@/routing/routing-hooks';
import Modal from './modal';
import { useModalContext } from './modal-context';
import { useModal } from './modal-hooks';

type ConfirmModalProps = {
  title: string;
  body: React.ReactNode;
  confirmText?: string;
};

type ConfirmModalData = { isConfirmed: boolean };

export const useConfirmModal = () => {
  const confirmModal = useModal<ConfirmModalProps, ConfirmModalData>(
    ConfirmModal,
  );

  return confirmModal;
};

function ConfirmModal({ title, confirmText = 'OK', body }: ConfirmModalProps) {
  const { isOpen, hide } = useModalContext<ConfirmModalData>();

  function handleCancel() {
    hide({ isConfirmed: false });
  }

  useOnRouteChange(handleCancel);

  return (
    <Modal
      isOpen={isOpen}
      className="max-w-sm"
      title={title}
      onClose={handleCancel}
    >
      <div>{body}</div>
      <div className="flex justify-end gap-2 mt-2">
        <Button variant="transparent" onClick={handleCancel}>
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            hide({ isConfirmed: true });
          }}
        >
          {confirmText}
        </Button>
      </div>
    </Modal>
  );
}
