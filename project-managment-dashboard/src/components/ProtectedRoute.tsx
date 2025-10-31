import { Navigate } from 'react-router-dom';
import ROUTES from '../router/routes';
import { isAuthenticated } from '../utils/auth';

interface ProtectedRouteProps {
  children: React.ReactElement;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  if (!isAuthenticated()) {
    return <Navigate to={ROUTES.AUTH} replace />;
  }

  return children;
};

export default ProtectedRoute;

