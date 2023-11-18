'use client';

import { SWRConfig } from 'swr';
import { httpClient } from '@/http-client/http-client';

type BaseSWRConfigProps = React.PropsWithChildren;

export function BaseSWRConfig({ children }: BaseSWRConfigProps) {
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