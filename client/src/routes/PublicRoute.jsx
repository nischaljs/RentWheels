
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
    console.log("User is already logged in, redirecting to homepage...");
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PublicRoute;
