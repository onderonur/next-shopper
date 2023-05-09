import BackToTopButton from './BackToTopButton';

type AppLayoutRootProps = React.PropsWithChildren;

export default function AppLayoutRoot({ children }: AppLayoutRootProps) {
  return (
    <>
      <div className="grid min-h-screen grid-rows-[1fr_auto]">{children}</div>
      <BackToTopButton />
    </>
  );
}
