import NextLink from '@/routing/next-link';
import { APP_TITLE } from '@/common/common-utils';
import Container from '@/common/container';

type AppHeaderProps = React.PropsWithChildren;

export default function AppHeader({ children }: AppHeaderProps) {
  return (
    <header className="fixed z-10 h-app-header w-full bg-background-main px-6 shadow-sm">
      <Container
        maxWidth="xl"
        className="flex h-full items-center justify-between"
      >
        <NextLink href="/" className="text-2xl font-bold text-primary-main">
          {APP_TITLE}
        </NextLink>
        {children}
      </Container>
    </header>
  );
}
