import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ allowedRoles = ["USER"] }) => {
  const { user, loading } = useAuth();

  // Add console log to see what user and roles are
  console.log("User:", user);
  console.log("Allowed Roles:", allowedRoles);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    console.log("No user, redirecting to login...");
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    console.log(`User role (${user.role}) not allowed. Redirecting to unauthorized...`);
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
