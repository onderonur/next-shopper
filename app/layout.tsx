import '@src/styling/global.css';
import '@src/styling/scrollbar.css';
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
      {/* Due to this issue, this empty head is added:
      https://github.com/vercel/next.js/issues/41953 */}
      {/* eslint-disable-next-line @next/next/no-head-element */}
      <head></head>
      <body>
        <StoreProvider>
          {children}
          <ModalRoot />
        </StoreProvider>
      </body>
    </html>
  );
}
