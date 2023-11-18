import Button from '@/common/button';
import { useOnRouteChange } from '@/routing/routing-hooks';
import { useModalContext } from './modal-context';
import { useModal } from './modal-hooks';
import * as RadixAlertDialog from '@radix-ui/react-alert-dialog';
import { AnimatePresence, motion } from 'framer-motion';
import { fadeIn } from '@/transitions/transition-utils';

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
    <RadixAlertDialog.Root
      open={isOpen}
      onOpenChange={(newIsOpen) => {
        if (!newIsOpen) {
          handleCancel();
        }
      }}
    >
      <AnimatePresence>
        {isOpen && (
          <RadixAlertDialog.Portal
            // To make `framer-motion` exit animation work.
            forceMount
          >
            <RadixAlertDialog.Overlay asChild>
              <motion.div
                {...fadeIn}
                className="fixed inset-0 z-20 bg-black/20 backdrop-blur-md"
              />
            </RadixAlertDialog.Overlay>
            <RadixAlertDialog.Content asChild>
              <motion.div
                initial={{ y: '-80%', x: '-50%', scale: 0.8 }}
                animate={{ y: '-50%', scale: 1 }}
                exit={{ y: '-80%', scale: 0.8, opacity: 0 }}
                className="fixed left-1/2 top-1/2 z-20 w-full max-w-md rounded-md bg-white p-6 shadow-md focus:outline-none"
              >
                <RadixAlertDialog.Title className="text-lg font-semibold">
                  {title}
                </RadixAlertDialog.Title>
                <RadixAlertDialog.Description className="text-md mb-5 mt-4">
                  {body}
                </RadixAlertDialog.Description>
                <div className="flex justify-end gap-2">
                  <RadixAlertDialog.Cancel asChild>
                    <Button variant="transparent">Cancel</Button>
                  </RadixAlertDialog.Cancel>
                  <RadixAlertDialog.Action asChild>
                    <Button
                      variant="primary"
                      onClick={() => {
                        hide({ isConfirmed: true });
                      }}
                    >
                      {confirmText}
                    </Button>
                  </RadixAlertDialog.Action>
                </div>
              </motion.div>
            </RadixAlertDialog.Content>
          </RadixAlertDialog.Portal>
        )}
      </AnimatePresence>
    </RadixAlertDialog.Root>
  );
}
