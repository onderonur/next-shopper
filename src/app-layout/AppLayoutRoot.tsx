import BackToTopButton from './BackToTopButton';

type AppLayoutRootProps = React.PropsWithChildren<{}>;

function AppLayoutRoot({ children }: AppLayoutRootProps) {
  return (
    <>
      <div className="flex flex-col min-h-screen">{children}</div>
      <BackToTopButton />
    </>
  );
}

export default AppLayoutRoot;
