import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import PostWritePage from '../pages/PostWritePage.tsx';
import QuestionBoardPage from '../pages/QuestionBoardPage.tsx';
import FreeBoardPage from '../pages/FreeBoardPage.tsx';
import PostDetailPage from '../pages/PostDetailPage.tsx';
import PostsPage from '../pages/PostsPage.tsx';
import LoginPage from '../pages/LoginPage.tsx';
import SignupPage from '../pages/SignupPage.tsx';
import Mypage from '../pages/Mypage.tsx';
import SettingPage from '../pages/SettingPage.tsx';
import MainPage from '../pages/MainPage.tsx';

// TODO: 추후 논의
const AppRouter = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <MainPage />,
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
      path: '/setting',
      element: <SettingPage />,
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
      path: '/edit/:postId',
      element: <PostWritePage />,
    },
    {
      path: '/posts/:postId',
      element: <PostDetailPage />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRouter;
