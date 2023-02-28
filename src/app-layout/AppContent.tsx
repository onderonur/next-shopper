import Center from '@/common/Center';
import classNames from 'classnames';

type AppContentProps = React.PropsWithChildren<{
  className?: string;
}>;

export default function AppContent({ className, children }: AppContentProps) {
  return (
    <Center
      as="main"
      maxWidth="xl"
      className={classNames('mt-app-header py-2 md:p-4', className)}
    >
      {children}
    </Center>
  );
}
