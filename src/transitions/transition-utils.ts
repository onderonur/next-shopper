import type { AnimationProps } from 'framer-motion';

export const fadeIn: AnimationProps = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export type SlideArgs = { from: 'left' | 'right' };

export function slide({ from }: SlideArgs): AnimationProps {
  const initial = { x: from === 'left' ? '-100%' : '100%' };

  return {
    initial,
    animate: { x: 0 },
    exit: initial,
    transition: { duration: 0.3 },
  };
}
