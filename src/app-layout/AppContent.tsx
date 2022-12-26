import Center from '@src/common/Center';
import classNames from 'classnames';

type AppContentProps = React.PropsWithChildren<{
  className?: string;
}>;

export default function AppContent({ className, children }: AppContentProps) {
  return (
    <Center
      as="main"
      maxWidth="xl"
      className={classNames(
        'mt-app-header flex-grow py-2 md:p-4 flex flex-col',
        className,
      )}
    >
      {children}
    </Center>
  );
}
