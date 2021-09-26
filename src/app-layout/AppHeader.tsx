import CartInfo from '@src/cart/CartInfo';
import NextLink from '@src/routing/NextLink';
import { APP_TITLE } from '@src/common/CommonUtils';

function AppHeader() {
  return (
    <header className="fixed w-full h-app-header z-10 bg-background-main flex items-center px-6 shadow-sm">
      <NextLink href="/">
        <h1 className="font-bold text-2xl text-primary-main">{APP_TITLE}</h1>
      </NextLink>
      <div className="flex-grow" />
      <CartInfo />
    </header>
  );
}

export default AppHeader;
