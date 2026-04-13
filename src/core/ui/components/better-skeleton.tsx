'use client';

import { Slot } from '@/core/ui/components/slot';
import { createContext, use } from 'react';
import { twMerge } from 'tailwind-merge';

const BetterSkeletonContext = createContext(false);

export function useIsSkeleton() {
  return use(BetterSkeletonContext);
}

type BetterSkeletonProps = {
  children: React.ReactNode;
};

export function BetterSkeleton({ children }: BetterSkeletonProps) {
  return (
    <BetterSkeletonContext value={true}>
      <Slot
        inert
        aria-hidden
        className={twMerge(
          '**:data-[slot=skeleton-text]:skeleton-bg **:data-[slot=skeleton-text]:rounded-sm **:data-[slot=skeleton-text]:box-decoration-clone **:data-[slot=skeleton-text]:text-transparent **:data-[slot=skeleton-text]:text-shadow-none',
          "**:[img]:skeleton-bg **:[img]:content-['']",
          '**:[svg]:invisible',
          '**:[button]:skeleton-bg **:[button]:text-transparent',
        )}
      >
        {children}
      </Slot>
    </BetterSkeletonContext>
  );
}

type SkeletonTextProps = {
  children: React.ReactNode;
};

export function SkeletonText({ children }: SkeletonTextProps) {
  return <span data-slot="skeleton-text">{children}</span>;
}
