'use client';

import { SWRConfig } from 'swr';
import { httpClient } from '@/http-client/httpClient';

type BaseSWRConfigProps = React.PropsWithChildren;

export default function BaseSWRConfig({ children }: BaseSWRConfigProps) {
  return (
    <SWRConfig
      value={{
        fetcher: httpClient.get,
        revalidateOnFocus: false,
        dedupingInterval: 60 * 1000,
      }}
    >
      {children}
    </SWRConfig>
  );
}
