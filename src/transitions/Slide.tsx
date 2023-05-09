import { TRANSITION_DURATION_IN_SECONDS } from './TransitionUtils';
import { motion } from 'framer-motion';

export type SlideProps = React.PropsWithChildren<{
  className?: string;
  from?: 'left' | 'right';
  isIn: boolean;
}>;

export default function Slide({
  className,
  from = 'left',
  isIn,
  children,
}: SlideProps) {
  const outTransform = { x: from === 'left' ? '-100%' : '100%' };

  // AnimatePresence is not working when it's nested into another one.
  // (Or at least I couldn't make it work yet.)
  // So, because that we use Slide only inside a Backdrop (FadeIn),
  // we don't use a AnimatePresence here.
  return isIn ? (
    <motion.div
      className={className}
      initial={outTransform}
      animate={{ x: 0 }}
      exit={outTransform}
      transition={{ duration: TRANSITION_DURATION_IN_SECONDS }}
    >
      {children}
    </motion.div>
  ) : null;
}
