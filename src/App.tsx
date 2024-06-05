import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ModalProvider } from './context/ModalsContext.tsx';
import { GoogleOAuthProvider } from "@react-oauth/google";

const queryClient = new QueryClient();

// import App from './App.tsx';
import GlobalStyle from './styles/GlobalStyle.tsx';
import ErrorPage from './pages/ErrorPage.tsx';
import PostWritePage from './pages/PostWritePage.tsx';
import QuestionBoardPage from './pages/QuestionBoardPage.tsx';
import FreeBoardPage from './pages/FreeBoardPage.tsx';
import PostDetailPage from './pages/PostDetailPage.tsx';
// import PostsPage from './pages/PostsPage.tsx';
import LoginPage from './pages/LoginPage.tsx';
import SignupPage from './pages/SignupPage.tsx';
import Mypage from './pages/Mypage.tsx';

// TODO: 추후 논의
const router = createBrowserRouter([
  {
    path: '/',
    // element: <App />,
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
    element: <LoginPage />,
  },
  {
    path: '/signup',
    element: <SignupPage />,
  },
  {
    path: '/mypage',
    element: <Mypage />,
  },
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
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <GoogleOAuthProvider clientId="729869699887-ibpfhnhjju75b3qkg6i9tr25bhc6kfbs.apps.googleusercontent.com">
    <React.StrictMode>
        <GlobalStyle />
        <RecoilRoot>
          <ModalProvider>
            <QueryClientProvider client={queryClient}>
              <RouterProvider router={router} />
            </QueryClientProvider>
          </ModalProvider>
        </RecoilRoot>
    </React.StrictMode>
  </GoogleOAuthProvider>

);
