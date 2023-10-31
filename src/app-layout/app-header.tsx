import NextLink from '@/routing/next-link';
import { APP_TITLE } from '@/common/common-utils';
import Container from '@/common/container';

type AppHeaderProps = React.PropsWithChildren;

export default function AppHeader({ children }: AppHeaderProps) {
  return (
    <header className="fixed w-full h-app-header z-10 bg-background-main px-6 shadow-sm">
      <Container
        maxWidth="xl"
        className="h-full flex items-center justify-between"
      >
        <NextLink href="/" className="font-bold text-2xl text-primary-main">
          {APP_TITLE}
        </NextLink>
        {children}
      </Container>
    </header>
  );
}
