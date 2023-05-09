import { TRANSITION_DURATION_IN_SECONDS } from './TransitionUtils';
import { AnimatePresence, motion } from 'framer-motion';
import classNames from 'classnames';

type FadeInProps = React.PropsWithChildren<{
  isIn: boolean;
  className?: string;
}>;

export default function FadeIn({ isIn, className, children }: FadeInProps) {
  return (
    <AnimatePresence>
      {isIn ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: TRANSITION_DURATION_IN_SECONDS }}
          className={classNames('flex justify-center items-center', className)}
        >
          {children}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
