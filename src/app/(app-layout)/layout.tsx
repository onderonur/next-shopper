import { LayoutContent } from '@/layout/layout';

type AppLayoutProps = React.PropsWithChildren;

export default function AppLayout({ children }: AppLayoutProps) {
  return <LayoutContent>{children}</LayoutContent>;
}
