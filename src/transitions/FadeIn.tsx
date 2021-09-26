import React from 'react';
import { CSSTransition } from 'react-transition-group';
import { TRANSITION_DURATION_IN_MS } from './TransitionUtils';

type FadeInProps = React.PropsWithChildren<{
  isIn: boolean;
  onExited?: VoidFunction;
}>;

function FadeIn({ isIn, children, onExited }: FadeInProps) {
  return (
    <>
      <CSSTransition
        in={isIn}
        timeout={TRANSITION_DURATION_IN_MS}
        classNames="fade-in"
        onExited={onExited}
        unmountOnExit
      >
        <div className="flex justify-center items-center">{children}</div>
      </CSSTransition>
      <style jsx>{`
        .fade-in-enter {
          opacity: 0;
        }
        .fade-in-enter-active {
          opacity: 1;
          transition: opacity ease-in-out ${TRANSITION_DURATION_IN_MS}ms;
        }
        .fade-in-exit {
          opacity: 1;
        }
        .fade-in-exit-active {
          opacity: 0;
          transition: opacity ease-in-out ${TRANSITION_DURATION_IN_MS}ms;
        }
      `}</style>
    </>
  );
}

export default FadeIn;
