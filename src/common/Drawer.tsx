import Button from './Button';
import { CloseIcon } from './Icons';
import Backdrop, { useBackdrop } from './Backdrop';
import classNames from 'classnames';
import Slide, { SlideProps } from '@/transitions/Slide';
import SectionTitle from './SectionTitle';

export const useDrawer = useBackdrop;

export type DrawerProps = Pick<SlideProps, 'from'> &
  React.PropsWithChildren<{
    title: string;
    isOpen: boolean;
    onClose: VoidFunction;
  }>;

export default function Drawer({
  from = 'left',
  title,
  isOpen,
  children,
  onClose,
}: DrawerProps) {
  return (
    <Backdrop<HTMLDivElement> isOpen={isOpen} onClick={onClose}>
      {({ focusRef }) => (
        <Slide
          from={from}
          isIn={isOpen}
          className={classNames(
            'h-full w-full max-w-xs fixed bg-background-main',
            from === 'left' && 'left-0',
            from === 'right' && 'right-0',
          )}
        >
          <section
            ref={focusRef}
            className="h-full flex flex-col"
            // To make "onKeyDown" work on this element
            tabIndex={-1}
            onKeyDown={(e) => {
              if (e.key === 'Escape') {
                onClose();
              }
            }}
          >
            <SectionTitle
              as="h2"
              // These `!important` usages are an escape hatch.
              // Otherwise, `p-0` in SectionTitle -> MobilePadding overrides these.
              className="!py-2 !px-4 shadow-sm"
              actions={
                <Button
                  aria-label="Close Drawer"
                  variant="transparent"
                  icon={<CloseIcon />}
                  onClick={onClose}
                />
              }
            >
              {title}
            </SectionTitle>
            <div className="p-4 h-full overflow-auto">
              <div className="relative h-full">{children}</div>
            </div>
          </section>
        </Slide>
      )}
    </Backdrop>
  );
}
