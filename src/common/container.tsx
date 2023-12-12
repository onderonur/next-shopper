import { twMerge } from 'tailwind-merge';

type ContainerProps = React.PropsWithChildren<{
  maxWidth: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  className?: string;
}>;

export function Container({ maxWidth, className, children }: ContainerProps) {
  const classNamesByMaxWidth: Record<typeof maxWidth, string> = {
    sm: 'max-w-screen-sm',
    md: 'max-w-screen-md',
    lg: 'max-w-screen-lg',
    xl: 'max-w-screen-xl',
    '2xl': 'max-w-screen-2xl',
  };

  return (
    <div
      className={twMerge(
        classNamesByMaxWidth[maxWidth],
        'mx-auto w-full',
        className,
      )}
    >
      {children}
    </div>
  );
}
