import classNames from 'classnames';

type ContainerProps = React.PropsWithChildren<{
  maxWidth: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  className?: string;
}>;

function Container({ maxWidth, className, children }: ContainerProps) {
  return (
    <div
      className={classNames(
        {
          'max-w-screen-sm': maxWidth === 'sm',
          'max-w-screen-md': maxWidth === 'md',
          'max-w-screen-lg': maxWidth === 'lg',
          'max-w-screen-xl': maxWidth === 'xl',
          'max-w-screen-2xl': maxWidth === '2xl',
        },
        'mx-auto',
        className,
      )}
    >
      {children}
    </div>
  );
}

export default Container;
