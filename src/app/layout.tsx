import '@/styles/global.css';
import { Inter } from 'next/font/google';
import ModalRoot from '@/modals/modal-root';
import { getMetadata } from '@/seo/seo-utils';
import classNames from 'classnames';
import BaseSWRConfig from '@/http-client/base-swr-config';
import type { Viewport } from 'next';

const inter = Inter({
  variable: '--font-inter',
  display: 'swap',
  subsets: ['latin'],
});

export const metadata = getMetadata({});

export const viewport: Viewport = {
  themeColor: '#fff',
};

type RootLayoutProps = React.PropsWithChildren;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={classNames(inter.variable, 'font-sans')}>
      <head />
      <body>
        <BaseSWRConfig>
          {children}
          <ModalRoot />
        </BaseSWRConfig>
      </body>
    </html>
  );
}
