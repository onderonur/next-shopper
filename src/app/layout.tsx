import '@src/styling/global.css';
import { Inter } from '@next/font/google';
import ModalRoot from '@src/modals/ModalRoot';
import StoreProvider from '@src/store/StoreProvider';
import BaseSWRConfig from '@src/http-client/BaseSWRConfig';
import { getMetadata } from '@src/seo/SeoUtils';

const font = Inter({ subsets: ['latin'] });

export const metadata = getMetadata();

type RootLayoutProps = React.PropsWithChildren;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={font.className}>
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
