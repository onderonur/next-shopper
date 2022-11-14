import Center from '@src/common/Center';

type AppContentProps = React.PropsWithChildren<{}>;

export default function AppContent({ children }: AppContentProps) {
  return (
    <main className="mt-app-header flex-grow py-2 md:p-4">
      <Center maxWidth="xl">{children}</Center>
    </main>
  );
}
