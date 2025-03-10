import * as React from 'react';
import { useLayoutEffect, useState } from 'react';
import './App.css';
import { BrowserHistory, createBrowserHistory } from 'history';
import { Navigate, Route, Router, Routes } from 'react-router-dom';
import { PRIVATE_ROUTERS, PUBLIC_ROUTERS, RouteItem, ROUTER_PATH } from '~/routes/router.ts';
import { AuthGuard } from '~/guard';

type Props = {
  basename?: string;
  children: React.ReactNode;
  history: BrowserHistory;
};
const history = createBrowserHistory();

function App() {
  const CustomRouter = ({ basename, children, history }: Props) => {
    const [state, setState] = useState({
      action: history.action,
      location: history.location,
    });

    useLayoutEffect(() => history.listen(setState), [history]);

    return (
      <Router
        basename={basename}
        location={state.location}
        navigator={history}
        navigationType={state.action}
      >
        {children}
      </Router>
    );
  };

  const renderRoutes = (routes: RouteItem[]) => {
    return routes.map((route, index) => {
      const Page = route.component;
      return (
        <Route key={index} path={route.path} element={<Page />}>
          {route.children && route.children.length > 0 && renderRoutes(route.children)}
        </Route>
      );
    });
  };

  return (
    <CustomRouter history={history} basename={import.meta.env.VITE_BASE_PATH}>
      <Routes>
        {PUBLIC_ROUTERS.length > 0 && renderRoutes(PUBLIC_ROUTERS)}
        {PRIVATE_ROUTERS.length > 0 && (
          <Route element={<AuthGuard />}>{renderRoutes(PRIVATE_ROUTERS)}</Route>
        )}
        <Route path="*" element={<Navigate to={ROUTER_PATH.notFound.extract} replace />} />
      </Routes>
    </CustomRouter>
  );
}

export default App;
