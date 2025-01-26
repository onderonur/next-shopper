import { twMerge } from 'tailwind-merge';

type CardProps = {
  className?: string;
  children: React.ReactNode;
};

export function Card({ className, children }: CardProps) {
  return (
    <div
      className={twMerge(
        'bg-background overflow-hidden rounded-lg border shadow-xs',
        className,
      )}
    >
      {children}
    </div>
  );
}

type CardHeaderProps = {
  id?: string;
  className?: string;
  children: React.ReactNode;
};

export function CardHeader({ id, className, children }: CardHeaderProps) {
  return (
    <div
      id={id}
      className={twMerge('bg-muted px-4 py-2 font-semibold', className)}
    >
      {children}
    </div>
  );
}

type CardContentProps = {
  className?: string;
  children: React.ReactNode;
};

export function CardContent({ className, children }: CardContentProps) {
  return <div className={twMerge('p-4', className)}>{children}</div>;
}

type CardFooterProps = {
  className?: string;
  children: React.ReactNode;
};

export function CardFooter({ className, children }: CardFooterProps) {
  return <div className={twMerge('border-t p-4', className)}>{children}</div>;
}
