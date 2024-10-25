import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoadingPage from '../pages/Loading';

const ProtectedRoute = ({ allowedRoles, children }) => {
  const { user, loading } = useAuth();

  console.log("User:", user);

  if (loading) {
    return <LoadingPage />;
  }

  // Redirect if not logged in
  if (!user) {
    console.log("No user, redirecting to login...");
    return <Navigate to="/login" replace />;
  }

  // Redirect if user role is not allowed
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    console.log(`User role (${user.role}) not allowed. Redirecting to unauthorized...`);
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
