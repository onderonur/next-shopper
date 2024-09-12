import { twMerge } from 'tailwind-merge';

type CardProps = {
  className?: string;
  children: React.ReactNode;
};

export function Card({ className, children }: CardProps) {
  return (
    <div
      className={twMerge(
        'overflow-hidden rounded-lg border bg-background shadow-sm',
        className,
      )}
    >
      {children}
    </div>
  );
}

type CardHeaderProps = {
  className?: string;
  children: React.ReactNode;
};

export function CardHeader({ className, children }: CardHeaderProps) {
  return (
    <div className={twMerge('bg-muted p-3 font-semibold', className)}>
      {children}
    </div>
  );
}

type CardContentProps = {
  className?: string;
  children: React.ReactNode;
};

export function CardContent({ className, children }: CardContentProps) {
  return <div className={twMerge('p-3', className)}>{children}</div>;
}

type CardFooterProps = {
  className?: string;
  children: React.ReactNode;
};

export function CardFooter({ className, children }: CardFooterProps) {
  return <div className={twMerge('border-t p-3', className)}>{children}</div>;
}
