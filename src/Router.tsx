import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import routerMeta, { IRouterMeta } from '@/lib/routerMeta';
import Loading from '@/components/Loading';
import ProtectedRoute from '@/components/HOC/ProtectedRoute';

const lazyImport = (pageName: string) => lazy(() => import(`@/pages/${pageName}`));

const assignRouter = Object.keys(routerMeta).map((componentKey: string) => {
  const props: IRouterMeta = routerMeta[componentKey];

  return {
    Component: lazyImport(componentKey),
    props,
  };
});

const Router = () => (
  <Routes>
    {assignRouter.map(({ Component, props }) => (
      <Route
        key={props.path}
        path={props.path}
        element={
          <ProtectedRoute path={props.path}>
            <Suspense fallback={<Loading />}>
              <Component />
            </Suspense>
          </ProtectedRoute>
        }
      />
    ))}
  </Routes>
);

export default Router;
