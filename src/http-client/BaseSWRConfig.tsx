'use client';

import { SWRConfig } from 'swr';
import { httpClient } from '@src/http-client/httpClient';

export default function BaseSWRConfig({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SWRConfig value={{ revalidateOnFocus: false, fetcher: httpClient.get }}>
      {children}
    </SWRConfig>
  );
}
