'use client';

import Button from '@/common/Button';
import { ArrowUpIcon } from '@/common/Icons';
import FadeIn from '@/transitions/FadeIn';
import { useSyncExternalStore } from 'react';

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

export default function BackToTopButton() {
  const scrollY = useSyncExternalStore(
    scrollStore.subscribe,
    scrollStore.getSnapshot,
    scrollStore.getServerSnapshot,
  );

  return (
    <FadeIn isIn={scrollY >= thresholdY}>
      <Button
        aria-label="Back to Top"
        className="fixed bottom-16 right-6 bg-background-main opacity-80"
        icon={<ArrowUpIcon />}
        onClick={() => window.scrollTo({ behavior: 'smooth', top: 0 })}
      />
    </FadeIn>
  );
}
