import React from 'react';
import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { ModalProvider } from './context/ModalsContext.tsx';
import GlobalStyle from './styles/GlobalStyle.tsx';
import AppRouter from './router/AppRouter.tsx';
import LogIn from './components/common/Login/LogIn.tsx';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GlobalStyle />
    <RecoilRoot>
      <LogIn>
        <ModalProvider>
          <QueryClientProvider client={queryClient}>
            <AppRouter />
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </ModalProvider>
      </LogIn>
    </RecoilRoot>
  </React.StrictMode>,
);
