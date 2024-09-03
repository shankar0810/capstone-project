import React, { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = () => {
  const { auth } = useAuth();
  const location = useLocation();

  useEffect(() => {
    // This effect will run on every render, including when the route changes
    if (auth.isAuthenticated) {
      localStorage.setItem('lastPath', location.pathname);
    }
  }, [auth.isAuthenticated, location]);

  if (auth.loading) {
    return <div>Loading...</div>;
  }

  if (!auth.isAuthenticated) {
    // Redirect to signin, but remember where the user was trying to go
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  // User is authenticated, render the child routes
  return <Outlet />;
};

export default ProtectedRoute;