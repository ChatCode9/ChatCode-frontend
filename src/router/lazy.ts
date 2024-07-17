import { lazy } from 'react';

export const MainPage = lazy(() => import(/* webpackChunkName: "MainPage" */ '../pages/MainPage'));

export const LoginPage = lazy(() => import(/* webpackChunkName: "LoginPage" */ '../pages/LoginPage'));

export const SignupPage = lazy(() => import(/* webpackChunkName: "SignupPage" */ '../pages/SignupPage'));

export const MyPage = lazy(() => import(/* webpackChunkName: "MyPage" */ '../pages/Mypage'));

export const SettingPage = lazy(() => import(/* webpackChunkName: "SettingPage" */ '../pages/SettingPage'));

export const QuestionBoardPage = lazy(
  () => import(/* webpackChunkName: "QuestionBoardPage" */ '../pages/QuestionBoardPage'),
);

export const FreeBoardPage = lazy(() => import(/* webpackChunkName: "FreeBoardPage" */ '../pages/FreeBoardPage'));

export const PostWritePage = lazy(() => import(/* webpackChunkName: "PostWritePage" */ '../pages/PostWritePage'));

export const PostDetailPage = lazy(() => import(/* webpackChunkName: "PostDetailPage" */ '../pages/PostDetailPage'));
