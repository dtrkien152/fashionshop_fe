import { Navigate, Outlet } from 'react-router-dom';
import { ROUTER_PATH } from '~/routes/router.ts';

interface AuthGuardProps {
}

export const AuthGuard: React.FC<AuthGuardProps> = () => {
  const isLoggedIn = () => {
    return true;
  }
  return isLoggedIn() ? <Outlet /> : <Navigate to={ROUTER_PATH.login.extract} />
}