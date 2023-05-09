import '@/styling/global.css';
import { Inter } from 'next/font/google';
import ModalRoot from '@/modals/ModalRoot';
import StoreProvider from '@/store/StoreProvider';
import BaseSWRConfig from '@/http-client/BaseSWRConfig';
import { getMetadata } from '@/seo/SeoUtils';
import classNames from 'classnames';

const inter = Inter({
  variable: '--font-inter',
  display: 'swap',
  subsets: ['latin'],
});

export const metadata = getMetadata();

type RootLayoutProps = React.PropsWithChildren;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={classNames(inter.variable, 'font-sans')}>
      <head />
      <body>
        <BaseSWRConfig>
          <StoreProvider>
            {children}
            <ModalRoot />
          </StoreProvider>
        </BaseSWRConfig>
      </body>
    </html>
  );
}
