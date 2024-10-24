import React from 'react'
import { Routes, Route } from "react-router-dom";
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register'
import NotFound from '../pages/NotFound';
import ProtectedRoute from './ProtectedRoute';
import AdminDashboard from '../pages/AdminDashboard'
import OwnerDashboard from '../pages/OwnerDashboard'
import UserDashboard from '../pages/UserDashboard'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register/>} />
      
      {/* Admin routes */}
      <Route 
        path="/admin/dashboard" 
        element={
          <ProtectedRoute >
            <AdminDashboard />UserDashboard
          </ProtectedRoute>
        } 
      />
      
      {/* Owner routes */}
      <Route 
        path="/owner/dashboard" 
        element={
          <ProtectedRoute >
            <OwnerDashboard />
          </ProtectedRoute>
        } 
      />
      
      {/* User routes */}
      <Route 
        path="/user/dashboard" 
        element={
          <ProtectedRoute >
            <UserDashboard />
          </ProtectedRoute>
        } 
      />
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
