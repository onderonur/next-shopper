import type { AppProps } from 'next/app';
import PageProgressBar from '@src/common/PageProgressBar';
import BaseQueryClientProvider from '@src/query-client/BaseQueryClientProvider';
import BaseDefaultSeo from '@src/seo/BaseDefaultSeo';
import Head from 'next/head';
import React from 'react';
import ThemeProvider from '@src/styling/ThemeProvider';
import { ReactQueryDevtools } from 'react-query/devtools';
import '@src/styling/global.css';
import '@src/styling/scrollbar.css';
import ModalRootProvider from '@src/common/ModalRootContext';

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
        <ReactQueryDevtools />
        <ThemeProvider>
          <PageProgressBar />
          <ModalRootProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ModalRootProvider>
        </ThemeProvider>
      </BaseQueryClientProvider>
    </>
  );
}

export default MyApp;
