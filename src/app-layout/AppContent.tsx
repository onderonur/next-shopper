import Container from '@src/common/Container';

type AppContentProps = React.PropsWithChildren<{}>;

export default function AppContent({ children }: AppContentProps) {
  return (
    <main className="mt-app-header flex-grow p-2 md:p-6">
      <Container maxWidth="xl" className="p-2 md:p-6">
        {children}
      </Container>
    </main>
  );
}
