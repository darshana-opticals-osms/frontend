import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { isCanonicalRole } from '../config/roles';

function ProtectedRoute({ allowedRoles }) {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles !== undefined) {
    const hasValidRestriction =
      Array.isArray(allowedRoles) &&
      allowedRoles.length > 0 &&
      Array.from(allowedRoles).every(isCanonicalRole);

    if (
      !hasValidRestriction ||
      !isCanonicalRole(user?.role) ||
      !allowedRoles.includes(user.role)
    ) {
      return <Navigate to="/" replace />;
    }
  }

  return <Outlet />;
}

export default ProtectedRoute;
