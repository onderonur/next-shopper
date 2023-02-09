import BackToTopButton from './BackToTopButton';
import classNames from 'classnames';

type AppLayoutRootProps = React.PropsWithChildren<{
  className?: string;
}>;

export default function AppLayoutRoot({
  className,
  children,
}: AppLayoutRootProps) {
  return (
    <>
      <div className={classNames('grid min-h-screen', className)}>
        {children}
      </div>
      <BackToTopButton />
    </>
  );
}
