import { Navigate, Outlet } from 'react-router-dom';
import { ROUTER_PATH } from '~/routes';

interface AuthGuardProps {
}

export const AuthGuard: React.FC<AuthGuardProps> = () => {
  const isLoggedIn = () => {
    // TODO: check logic login
    return true;
  }
  return isLoggedIn() ? <Outlet /> : <Navigate to={ROUTER_PATH.login.extract} />
}