import React from 'react';
import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import { QueryClientProvider, QueryErrorResetBoundary } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ErrorBoundary } from 'react-error-boundary';

import { ModalProvider } from './context/ModalsContext.tsx';
import GlobalStyle from './styles/GlobalStyle.tsx';
import AppRouter from './router/AppRouter.tsx';
import LogIn from './components/common/Login/LogIn.tsx';
import { queryClient } from './hooks/api/queryClient.ts';
import ErrorFallback from './components/common/Error/ErrorFallback.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary onReset={reset} FallbackComponent={ErrorFallback}>
          <GlobalStyle />
          <RecoilRoot>
            <ModalProvider>
              <QueryClientProvider client={queryClient}>
                <LogIn>
                  <AppRouter />
                  <ReactQueryDevtools initialIsOpen={false} />
                </LogIn>
              </QueryClientProvider>
            </ModalProvider>
          </RecoilRoot>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  </React.StrictMode>,
);
