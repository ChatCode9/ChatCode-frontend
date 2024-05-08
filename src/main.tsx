import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

import App from './App.tsx';
import GlobalStyle from './styles/GlobalStyle.tsx';
import ErrorPage from './pages/ErrorPage.tsx';
import PostWritePage from './pages/PostWritePage.tsx';
import QuestionBoardPage from './pages/QuestionBoardPage.tsx';
import FreeBoardPage from './pages/FreeBoardPage.tsx';
import PostDetailPage from './pages/PostDetailPage.tsx';

// TODO: 추후 논의
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/board/question',
        element: <QuestionBoardPage />,
      },
      {
        path: '/board/free',
        element: <FreeBoardPage />,
      },
      {
        path: '/write',
        element: <PostWritePage />,
      },
      {
        path: '/posts/:postId',
        element: <PostDetailPage />,
      },
    ],
  },
  {
    path: '/login',
    element: <div>로그인</div>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GlobalStyle />
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </RecoilRoot>
  </React.StrictMode>,
);
