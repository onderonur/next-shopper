'use client';

import { Button } from '@/common/button';
import { ArrowUpIcon } from '@/common/icons';
import { AnimatePresence } from '@/common/motion';
import { fadeIn } from '@/transitions/transition-utils';
import { motion } from 'framer-motion';
import { useSyncExternalStore } from 'react';

const MotionButton = motion(Button);

const thresholdY = 800;

const scrollStore = {
  subscribe: (onStoreChange: VoidFunction) => {
    window.addEventListener('scroll', onStoreChange);

    return () => {
      window.removeEventListener('scroll', onStoreChange);
    };
  },
  getSnapshot: () => window.scrollY,
  getServerSnapshot: () => 0,
};

export function BackToTopButton() {
  const scrollY = useSyncExternalStore(
    scrollStore.subscribe,
    scrollStore.getSnapshot,
    scrollStore.getServerSnapshot,
  );

  return (
    <AnimatePresence>
      {scrollY >= thresholdY && (
        <MotionButton
          {...fadeIn}
          aria-label="Back to Top"
          className="fixed bottom-16 right-6 bg-background-main opacity-80"
          icon={<ArrowUpIcon />}
          onClick={() => {
            window.scrollTo({ behavior: 'smooth', top: 0 });
          }}
        />
      )}
    </AnimatePresence>
  );
}
