import AppFooter from '@src/app-layout/AppFooter';
import AppLayoutRoot from '@src/app-layout/AppLayoutRoot';
import Center from '@src/common/Center';
import Hero from '@src/common/Hero';
import Categories from '@src/categories/Categories';

export default function LandingPage() {
  return (
    <AppLayoutRoot className="grid-rows-[auto_1fr_auto]">
      <header>
        <Hero />
      </header>
      <Center as="main" maxWidth="xl" className="p-4">
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-ignore */}
        <Categories />
      </Center>
      <AppFooter />
    </AppLayoutRoot>
  );
}
