import { Button } from '@/common/button';
import { useOnRouteChange } from '@/routing/routing-hooks';
import * as RadixAlertDialog from '@radix-ui/react-alert-dialog';
import { AnimatePresence, motion } from 'framer-motion';
import { fadeIn } from '@/transitions/transition-utils';

type AlertModalProps = React.PropsWithChildren<{
  isOpen: boolean;
  trigger: React.ReactNode;
  onIsOpenChange: (isOpen: boolean) => void;
}>;

export function AlertModal({
  isOpen,
  trigger,
  children,
  onIsOpenChange,
}: AlertModalProps) {
  useOnRouteChange(() => {
    onIsOpenChange(false);
  });

  return (
    <RadixAlertDialog.Root open={isOpen} onOpenChange={onIsOpenChange}>
      {trigger}
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
                className="fixed left-1/2 top-1/2 z-20 w-full max-w-md focus:outline-none"
              >
                <div className="mx-2 rounded-md bg-white p-6 shadow-md ">
                  {children}
                </div>
              </motion.div>
            </RadixAlertDialog.Content>
          </RadixAlertDialog.Portal>
        )}
      </AnimatePresence>
    </RadixAlertDialog.Root>
  );
}

type AlertModalTitleProps = React.PropsWithChildren;

export function AlertModalTitle({ children }: AlertModalTitleProps) {
  return (
    <RadixAlertDialog.Title className="text-lg font-semibold">
      {children}
    </RadixAlertDialog.Title>
  );
}

type AlertModalBodyProps = React.PropsWithChildren;

export function AlertModalBody({ children }: AlertModalBodyProps) {
  return (
    <RadixAlertDialog.Description className="text-md mb-5 mt-4">
      {children}
    </RadixAlertDialog.Description>
  );
}

type AlertModalFooterProps = React.PropsWithChildren;

export function AlertModalFooter({ children }: AlertModalFooterProps) {
  return (
    <div className="flex justify-end gap-2">
      <RadixAlertDialog.Cancel asChild>
        <Button variant="transparent">Cancel</Button>
      </RadixAlertDialog.Cancel>
      {children}
    </div>
  );
}

export const AlertModalTrigger = RadixAlertDialog.Trigger;

export const AlertModalAction = RadixAlertDialog.Action;
