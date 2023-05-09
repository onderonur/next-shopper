import CartInfo from '@/cart/CartInfo';
import NextLink from '@/routing/NextLink';
import { APP_TITLE } from '@/common/CommonUtils';
import Center from '@/common/Center';

export default function AppHeader() {
  return (
    <header className="fixed w-full h-app-header z-10 bg-background-main px-6 shadow-sm">
      <Center
        maxWidth="xl"
        className="h-full flex items-center justify-between"
      >
        <NextLink href="/" className="font-bold text-2xl text-primary-main">
          {APP_TITLE}
        </NextLink>
        <CartInfo />
      </Center>
    </header>
  );
}
