import { Dialog } from '@headlessui/react';
import { lazy, Suspense, useState } from 'react';
import { Outlet, RouteObject, useRoutes, BrowserRouter } from 'react-router-dom';
import { ProtectedRoute } from '../shared/ProtectedRoutes';

const Loading = () => <p className="p-4 w-full h-full text-center">Loading...</p>;

const IndexScreen = lazy(() => import('~/components/screens/Index'));
const SignupScreen = lazy(() => import('~/components/screens/Signup'));
const Page404Screen = lazy(() => import('~/components/screens/404'));

export const Router = () => {
  return (
    <BrowserRouter>
      <InnerRouter />
    </BrowserRouter>
  );
};

const InnerRouter = () => {
  const routes: RouteObject[] = [
    {
      path: '/',
      element: <ProtectedRoute />,
      children: [
        {
          index: true,
          element: <IndexScreen />,
        },
      ],
    },
    {
      path: '/signup',
      element: <SignupScreen />,
    },
    {
      path: '*',
      element: <Page404Screen />,
    },
  ];
  const element = useRoutes(routes);
  return (
    <div>
      <Suspense fallback={<Loading />}>{element}</Suspense>
    </div>
  );
};
