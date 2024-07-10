import React from 'react';
import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { ModalProvider } from './context/ModalsContext.tsx';
import GlobalStyle from './styles/GlobalStyle.tsx';
import AppRouter from './router/AppRouter.tsx';
import LogIn from './components/common/Login/LogIn.tsx';
import { queryClient } from './hooks/api/queryClient.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
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
  </React.StrictMode>,
);
