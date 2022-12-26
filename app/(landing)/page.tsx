import AppFooter from '@src/app-layout/AppFooter';
import AppLayoutRoot from '@src/app-layout/AppLayoutRoot';
import Center from '@src/common/Center';
import Hero from '@src/common/Hero';
import Categories from '@src/categories/Categories';

export default function LandingPage() {
  return (
    <AppLayoutRoot>
      <header>
        <Hero />
      </header>
      <main className="p-4 flex-grow">
        <Center maxWidth="xl">
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/* @ts-ignore */}
          <Categories />
        </Center>
      </main>
      <AppFooter />
    </AppLayoutRoot>
  );
}
