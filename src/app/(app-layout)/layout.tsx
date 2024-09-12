import { Container } from '@/core/ui/components/container';

type AppLayoutProps = {
  children: React.ReactNode;
};

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <Container maxWidth="xl" className="p-2 md:p-4">
      {children}
    </Container>
  );
}
