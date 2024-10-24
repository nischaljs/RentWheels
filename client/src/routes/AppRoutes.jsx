import React from 'react';
import { Routes, Route } from "react-router-dom";
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import NotFound from '../pages/NotFound';
import ProtectedRoute from './ProtectedRoute';
import AdminDashboard from '../pages/AdminDashboard';
import OwnerDashboard from '../pages/OwnerDashboard';
import UserDashboard from '../pages/UserDashboard';
import Layout from '../components/Layout';
import VehicleProfile from '../pages/VehicleProfile';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes (Login, Register, etc.) */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      {/* Routes with shared Layout (Navbar and Footer) */}
      <Route element={<Layout />}>
        {/* Admin routes */}
        <Route 
          path="/admin/dashboard" 
          element={
            // <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminDashboard />
            // </ProtectedRoute>
          } 
        />
        {/* Owner routes */}
        <Route 
          path="/owner/dashboard" 
          element={
            // <ProtectedRoute allowedRoles={["OWNER"]}>
              <OwnerDashboard />
            // </ProtectedRoute>
          } 
        />
        
        {/* User routes */}
        <Route 
          path="/user/dashboard" 
          element={
            // <ProtectedRoute allowedRoles={["USER"]}>
              <UserDashboard />
            // </ProtectedRoute>
          } 
        />
        
        {/* Vehicle profile page */}
        <Route 
          path="/vehicle/:vehicleId" 
          element={
            // <ProtectedRoute allowedRoles={["OWNER"]}>
              <VehicleProfile />
            // </ProtectedRoute>
          } 
        />
      </Route>

      {/* 404 Not Found route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
