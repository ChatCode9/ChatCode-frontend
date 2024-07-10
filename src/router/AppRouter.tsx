import { Suspense } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

// import PostsPage from '../pages/PostsPage.tsx';
import * as Lazy from './lazy';
import ErrorPage from '../pages/ErrorPage';

// TODO: 추후 논의
const AppRouter = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <Suspense>
          <Lazy.MainPage />
        </Suspense>
      ),
    },
    {
      path: '/login',
      element: (
        <Suspense>
          <Lazy.LoginPage />
        </Suspense>
      ),
    },
    {
      path: '/signup',
      element: (
        <Suspense>
          <Lazy.SignupPage />
        </Suspense>
      ),
    },
    {
      path: '/mypage',
      element: (
        <Suspense>
          <Lazy.MyPage />
        </Suspense>
      ),
    },
    {
      path: '/setting',
      element: (
        <Suspense>
          <Lazy.SettingPage />
        </Suspense>
      ),
    },
    {
      path: '/board/question',
      element: (
        <Suspense>
          <Lazy.QuestionBoardPage />
        </Suspense>
      ),
    },
    {
      path: '/board/free',
      element: (
        <Suspense>
          <Lazy.FreeBoardPage />
        </Suspense>
      ),
    },
    {
      path: '/write',
      element: (
        <Suspense>
          <Lazy.PostWritePage />
        </Suspense>
      ),
    },
    {
      path: '/edit/:postId',
      element: (
        <Suspense>
          <Lazy.PostWritePage />
        </Suspense>
      ),
    },
    {
      path: '/posts/:postId',
      element: (
        <Suspense>
          <Lazy.PostDetailPage />
        </Suspense>
      ),
    },
    {
      path: '/*',
      element: <ErrorPage />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRouter;
