import { twMerge } from 'tailwind-merge';

type ContainerProps = React.PropsWithChildren<{
  as?: keyof React.JSX.IntrinsicElements;
  maxWidth: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  className?: string;
}>;

export function Container({
  as = 'div',
  maxWidth,
  className,
  children,
}: ContainerProps) {
  const As = as;

  const classNameByMaxWidth: Record<typeof maxWidth, string> = {
    sm: 'max-w-screen-sm',
    md: 'max-w-screen-md',
    lg: 'max-w-screen-lg',
    xl: 'max-w-screen-xl',
    '2xl': 'max-w-screen-2xl',
  };

  return (
    <As
      className={twMerge(
        classNameByMaxWidth[maxWidth],
        'mx-auto w-full',
        className,
      )}
    >
      {children}
    </As>
  );
}
