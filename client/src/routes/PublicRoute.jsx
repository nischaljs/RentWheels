
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoadingPage from '../pages/Loading';

const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingPage />;
  }

  // Redirect authenticated users to the homepage
  if (user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PublicRoute;
