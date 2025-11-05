import { Navigate } from 'react-router-dom';
import useAuthStore from '../stores/authStore';
import { useEffect } from 'react';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loadUser, token } = useAuthStore();

  useEffect(() => {
    // Load user data if we have a token but no user data
    if (token && !useAuthStore.getState().user) {
      loadUser();
    }
  }, [token, loadUser]);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
