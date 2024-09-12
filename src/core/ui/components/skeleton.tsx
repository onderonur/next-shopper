import { twMerge } from 'tailwind-merge';

type SkeletonProps = {
  className?: string;
};

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div className={twMerge('animate-pulse rounded-md bg-muted', className)} />
  );
}
