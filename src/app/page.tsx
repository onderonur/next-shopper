import { Categories } from '@/categories/categories';
import { Container } from '@/common/container';
import { Hero } from '@/common/hero';
import { getMetadata } from '@/seo/seo-utils';
import { ServiceWorker } from '@/service-worker';

export const metadata = getMetadata({ title: 'Home', pathname: '/' });

export default function LandingPage() {
  return (
    <main>
      {/* <ServiceWorker /> */}
      <Hero />
      <Container maxWidth="xl" className="p-4">
        <Categories />
      </Container>
    </main>
  );
}
