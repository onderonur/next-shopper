import { PreloadedState } from '@reduxjs/toolkit';
import ModalRootProvider from '@src/common/ModalRootContext';
import { createQueryClient } from '@src/query-client/QueryClientUtils';
import { makeStore, RootState } from '@src/store/store';
import { render } from '@testing-library/react';
import { useRouter } from 'next/router';
import { QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';

export function customRender(
  ui: React.ReactElement,
  config?: {
    router?: Partial<ReturnType<typeof useRouter>>;
    preloadedState?: PreloadedState<RootState>;
  },
) {
  const mockRouter = {
    isReady: true,
    back: jest.fn(),
    query: {},
    ...config?.router,
    events: {
      on: jest.fn(),
      off: jest.fn(),
      ...config?.router?.events,
    },
  };

  // TODO: Bundan daha iyi bi yöntem olabilir belki
  (useRouter as jest.Mock).mockImplementation(() => mockRouter);

  const queryClient = createQueryClient({ isTesting: true });

  const store = makeStore({}, { preloadedState: config?.preloadedState });

  const wrapper = ({ children }: React.PropsWithChildren) => (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <ModalRootProvider>{children}</ModalRootProvider>
      </Provider>
    </QueryClientProvider>
  );

  return { store, ...render(ui, { wrapper }), mockRouter };
}
