import BackToTopButton from './BackToTopButton';

type AppLayoutRootProps = React.PropsWithChildren<{}>;

function AppLayoutRoot({ children }: AppLayoutRootProps) {
  return (
    <>
      <div className="min-h-screen flex flex-col">{children}</div>
      <BackToTopButton />
    </>
  );
}

export default AppLayoutRoot;
