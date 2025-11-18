import { twMerge } from 'tailwind-merge';
import { Skeleton } from './skeleton';

type IconButtonSkeletonProps = {
  className?: string;
};

export function IconButtonSkeleton({ className }: IconButtonSkeletonProps) {
  return <Skeleton className={twMerge('size-9', className)} />;
}
