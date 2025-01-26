import { AnimatePresence } from '@/core/animations/components/animate-presence';
import { fadeIn } from '@/core/animations/utils';
import { Button } from '@/core/ui/components/button';
import * as RadixAlertDialog from '@radix-ui/react-alert-dialog';
import { motion } from 'motion/react';
import { twJoin } from 'tailwind-merge';

type AlertModalProps = {
  isOpen: boolean;
  trigger: React.ReactNode;
  children: React.ReactNode;
  onIsOpenChange: (isOpen: boolean) => void;
};

export function AlertModal({
  isOpen,
  trigger,
  children,
  onIsOpenChange,
}: AlertModalProps) {
  return (
    <RadixAlertDialog.Root open={isOpen} onOpenChange={onIsOpenChange}>
      {trigger}
      <AnimatePresence>
        {isOpen && (
          <RadixAlertDialog.Portal
            // To make `motion/react` exit animation work.
            forceMount
          >
            <RadixAlertDialog.Overlay asChild>
              <motion.div
                {...fadeIn}
                className="bg-overlay/20 fixed inset-0 z-20 backdrop-blur-sm"
              />
            </RadixAlertDialog.Overlay>
            <RadixAlertDialog.Content asChild>
              <motion.div
                // Responsive Framer Motion with Tailwind CSS:
                // https://www.youtube.com/watch?v=xSuxsfn13xg
                className={twJoin(
                  'fixed bottom-0 left-1/2 z-20 w-full p-6 focus:outline-hidden md:top-1/2 md:bottom-auto md:max-w-md md:p-2',
                  '[--y-from:30%] [--y-to:0%] md:[--y-from:-80%] md:[--y-to:-50%]',
                )}
                initial={{
                  y: 'var(--y-from)',
                  x: '-50%',
                  scale: 0.8,
                  opacity: 0,
                }}
                animate={{ y: 'var(--y-to)', scale: 1, opacity: 1 }}
                exit={{ y: 'var(--y-from)', scale: 0.8, opacity: 0 }}
              >
                <div className="bg-background rounded-md border p-6 shadow-md">
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

type AlertModalTitleProps = {
  children: React.ReactNode;
};

export function AlertModalTitle({ children }: AlertModalTitleProps) {
  return (
    <RadixAlertDialog.Title className="text-lg font-semibold">
      {children}
    </RadixAlertDialog.Title>
  );
}

type AlertModalBodyProps = {
  children: React.ReactNode;
};

export function AlertModalBody({ children }: AlertModalBodyProps) {
  return (
    <RadixAlertDialog.Description className="text-md mt-4 mb-5">
      {children}
    </RadixAlertDialog.Description>
  );
}

type AlertModalFooterProps = {
  children: React.ReactNode;
};

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
