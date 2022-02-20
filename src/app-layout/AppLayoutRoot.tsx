import BackToTopButton from './BackToTopButton';

type AppLayoutRootProps = React.PropsWithChildren<{}>;

function AppLayoutRoot({ children }: AppLayoutRootProps) {
  return (
    <>
      <div className="flex flex-col absolute inset-0">{children}</div>
      <BackToTopButton />
    </>
  );
}

export default AppLayoutRoot;
