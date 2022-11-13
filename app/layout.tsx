import '@src/styling/global.css';
import { Roboto } from '@next/font/google';
import ModalRoot from '@src/modals/ModalRoot';
import StoreProvider from '@src/store/StoreProvider';

const roboto = Roboto({ weight: ['400', '500', '700'], subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={roboto.className}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#fff" />
      </head>
      <body>
        <StoreProvider>
          {children}
          <ModalRoot />
        </StoreProvider>
      </body>
    </html>
  );
}
