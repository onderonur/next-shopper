import Container from '@src/common/Container';

type AppContentProps = React.PropsWithChildren<{}>;

function AppContent({ children }: AppContentProps) {
  return (
    <Container
      maxWidth="xl"
      className="mt-app-header flex-grow w-full flex flex-col p-2 md:p-6"
    >
      <main className="flex-grow relative">{children}</main>
    </Container>
  );
}

export default AppContent;
