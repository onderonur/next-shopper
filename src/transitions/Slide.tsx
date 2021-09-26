import { CSSTransition } from 'react-transition-group';
import { TRANSITION_DURATION_IN_MS } from './TransitionUtils';

export type SlideProps = React.PropsWithChildren<{
  from?: 'left' | 'right';
  isIn: boolean;
}>;

function Slide({ from = 'left', isIn, children }: SlideProps) {
  const outTransform =
    from === 'left' ? 'translateX(-100%)' : 'translateX(100%)';

  return (
    <>
      <CSSTransition
        in={isIn}
        timeout={TRANSITION_DURATION_IN_MS}
        classNames="slide"
        unmountOnExit
      >
        <div>{children}</div>
      </CSSTransition>
      <style jsx>{`
        .slide-enter {
          transform: ${outTransform};
        }
        .slide-enter-active {
          transform: translateX(0);
          transition: transform ease-in-out ${TRANSITION_DURATION_IN_MS}ms;
        }
        .slide-exit {
          transform: translateX(0);
        }
        .slide-exit-active {
          transform: ${outTransform};
          transition: transform ease-in-out ${TRANSITION_DURATION_IN_MS}ms;
        }
      `}</style>
    </>
  );
}

export default Slide;
