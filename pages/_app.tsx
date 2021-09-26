import type { AppProps } from 'next/app';
import PageProgressBar from '@src/common/PageProgressBar';
import BaseQueryClientProvider from '@src/query-client/BaseQueryClientProvider';
import CartProvider from '@src/cart/CartContext';
import BaseDefaultSeo from '@src/seo/BaseDefaultSeo';
import Head from 'next/head';
import React from 'react';
import ConfirmProvider from '@src/common/ConfirmContext';
import ThemeProvider from '@src/styling/ThemeProvider';
import '@src/styling/global.css';
import '@src/styling/scrollbar.css';

function MyApp({ Component, pageProps }: AppProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Layout = (Component as any).Layout ?? React.Fragment;

  return (
    <>
      <Head>
        <meta name="theme-color" content="#fff" />
      </Head>
      <BaseQueryClientProvider dehydratedState={pageProps.dehydratedState}>
        <BaseDefaultSeo />
        <ThemeProvider>
          <PageProgressBar />
          <ConfirmProvider>
            <CartProvider>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </CartProvider>
          </ConfirmProvider>
        </ThemeProvider>
      </BaseQueryClientProvider>
    </>
  );
}

export default MyApp;
