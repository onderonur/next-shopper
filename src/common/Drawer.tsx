import Button from './Button';
import { CloseIcon } from './Icons';
import Backdrop, { useBackdrop } from './Backdrop';
import classNames from 'classnames';
import Slide, { SlideProps } from '@src/transitions/Slide';
import Section from './Section';

export const useDrawer = useBackdrop;

export type DrawerProps = Pick<SlideProps, 'from'> &
  React.PropsWithChildren<{
    title: string;
    isOpen: boolean;
    onClose: VoidFunction;
  }>;

function Drawer({
  from = 'left',
  title,
  isOpen,
  children,
  onClose,
}: DrawerProps) {
  return (
    <Backdrop<HTMLDivElement> isOpen={isOpen} onClick={onClose}>
      {({ focusRef, contentClassName }) => (
        <Slide
          from={from}
          isIn={isOpen}
          className={classNames(
            'h-full w-full max-w-xs fixed',
            from === 'left' && 'left-0',
            from === 'right' && 'right-0',
            contentClassName,
          )}
        >
          <Section
            ref={focusRef}
            className="h-full flex flex-col"
            title={title}
            titleAs="h2"
            headerClassName="py-2 px-4 shadow-sm"
            headerActions={
              <Button
                aria-label="Close Drawer"
                variant="transparent"
                icon={<CloseIcon />}
                onClick={onClose}
              />
            }
            // To make "onKeyDown" work on this element
            tabIndex={-1}
            onKeyDown={(e) => {
              if (e.key === 'Escape') {
                onClose();
              }
            }}
          >
            <div className="p-4 h-full">
              <div className="relative h-full">{children}</div>
            </div>
          </Section>
        </Slide>
      )}
    </Backdrop>
  );
}

export default Drawer;
