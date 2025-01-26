'use client';

import * as RadixTooltip from '@radix-ui/react-tooltip';
import { motion } from 'motion/react';

export const TooltipProvider = RadixTooltip.Provider;

type TooltipProps = {
  content: React.ReactNode;
  children: React.ReactNode;
};

export function Tooltip({ content, children }: TooltipProps) {
  return (
    <RadixTooltip.Root>
      <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
      <RadixTooltip.Portal>
        <RadixTooltip.Content sideOffset={4} asChild>
          <motion.div
            initial={{ y: -2, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-muted text-muted-foreground z-50 rounded-md px-2 py-2 text-xs font-semibold shadow-md select-none"
          >
            {content}
            <RadixTooltip.Arrow className="fill-muted" />
          </motion.div>
        </RadixTooltip.Content>
      </RadixTooltip.Portal>
    </RadixTooltip.Root>
  );
}
