import {
  DehydratedState,
  Hydrate,
  QueryClientProvider,
} from '@tanstack/react-query';
import { useState } from 'react';
import { createQueryClient } from './QueryClientUtils';

type BaseQueryClientProviderProps = React.PropsWithChildren<{
  dehydratedState: DehydratedState;
}>;

function BaseQueryClientProvider({
  dehydratedState,
  children,
}: BaseQueryClientProviderProps) {
  const [queryClient] = useState(() => createQueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {/* Using hydration:
       https://@tanstack/react-query.tanstack.com/guides/ssr#using-hydration */}
      <Hydrate state={dehydratedState}>{children}</Hydrate>
    </QueryClientProvider>
  );
}
export default BaseQueryClientProvider;
