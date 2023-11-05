'use client';

import Button from './button';
import { CloseIcon } from './icons';
import Backdrop from './backdrop';
import classNames from 'classnames';
import type { SlideProps } from '@/transitions/slide';
import Slide from '@/transitions/slide';
import SectionTitle from './section-title';
import { useDrawerContext } from './drawer-context';
import BaseFocusTrap from './base-focus-trap';

type DrawerProps = Pick<SlideProps, 'from'> &
  React.PropsWithChildren<{
    title: string;
  }>;

export default function Drawer({
  from = 'left',
  title,
  children,
}: DrawerProps) {
  const { isOpen, close } = useDrawerContext();

  return (
    <Backdrop isOpen={isOpen} onClick={close}>
      <Slide
        from={from}
        isIn={isOpen}
        className={classNames(
          'h-full w-full max-w-xs fixed bg-background-main',
          from === 'left' && 'left-0',
          from === 'right' && 'right-0',
        )}
      >
        <BaseFocusTrap onClose={close}>
          {(trappedProps) => {
            return (
              <section className="h-full flex flex-col" {...trappedProps}>
                <SectionTitle
                  as="h2"
                  // These `!important` usages are an escape hatch.
                  // Otherwise, `p-0` in SectionTitle -> MobilePadding overrides these.
                  className="py-8 px-6 md:py-2 md:px-2 shadow-sm"
                  actions={
                    <Button
                      aria-label="Close Drawer"
                      variant="transparent"
                      icon={<CloseIcon />}
                      onClick={close}
                    />
                  }
                >
                  {title}
                </SectionTitle>
                <div className="p-4 h-full overflow-auto">
                  <div className="relative h-full">{children}</div>
                </div>
              </section>
            );
          }}
        </BaseFocusTrap>
      </Slide>
    </Backdrop>
  );
}
