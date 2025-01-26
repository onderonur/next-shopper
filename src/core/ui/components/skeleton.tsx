import { twMerge } from 'tailwind-merge';

type SkeletonProps = {
  className?: string;
};

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div className={twMerge('bg-muted animate-pulse rounded-md', className)} />
  );
}
