import Center from '@src/common/Center';

type AppContentProps = React.PropsWithChildren<{}>;

export default function AppContent({ children }: AppContentProps) {
  return (
    <main className="mt-app-header flex-grow p-2 md:p-6">
      <Center maxWidth="xl">{children}</Center>
    </main>
  );
}
