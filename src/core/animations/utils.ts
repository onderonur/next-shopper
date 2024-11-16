import type { AnimationProps } from 'motion/react';

export const fadeIn: AnimationProps = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};
