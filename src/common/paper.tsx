import { twMerge } from 'tailwind-merge';

type PaperProps = React.PropsWithChildren<{ className?: string }>;

export function Paper({ className, children }: PaperProps) {
  return (
    <div
      className={twMerge(
        'border bg-background p-4 shadow-sm md:rounded-lg md:p-6',
        className,
      )}
    >
      {children}
    </div>
  );
}

type PaperTitleProps = React.PropsWithChildren;

export function PaperTitle({ children }: PaperTitleProps) {
  return (
    <div className="mb-1 text-lg font-semibold text-muted-foreground">
      {children}
    </div>
  );
}
