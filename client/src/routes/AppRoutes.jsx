import React from 'react';
import { Routes, Route } from "react-router-dom";
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import NotFound from '../pages/NotFound';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';
import AdminDashboard from '../pages/AdminDashboard';
import OwnerDashboard from '../pages/OwnerDashboard';
import UserDashboard from '../pages/UserDashboard';
import Layout from '../components/Global/Layout';
import VehicleProfile from '../pages/VehicleProfile';
import PaymentSuccess from '../pages/PaymentSuccess';
import PaymentSuccessHandler from '../pages/PaymentSuccessHandler';
import UserAllPaymentDetails from '../pages/UserAllPaymentDetails';
import AllVehiclesGrid from '../pages/AllVehiclesGrid';
import AboutPage from '../pages/AboutPage';
import ContactPage from '../pages/ContactPage';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes (Home, Login, Register) */}
      <Route path="/" element={<Home />} />

      {/* Login and Register as public routes with redirect if user is already logged in */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />

      {/* Routes with shared Layout (e.g., Navbar and Footer) */}
      <Route element={<Layout />}>
        {/* Admin routes */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Owner routes */}
        <Route
          path="/owner/dashboard"
          element={
            <ProtectedRoute allowedRoles={["OWNER"]}>
              <OwnerDashboard />
            </ProtectedRoute>
          }
        />

        {/* User routes */}
        <Route
          path="/user/dashboard"
          element={
            <ProtectedRoute allowedRoles={["USER"]}>
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        {/* Vehicle profile page */}
        <Route
          path="/vehicle/:vehicleId"
          element={<VehicleProfile />}
        />

        {/* {Payment Successful route} */}
        <Route
          path='/payment/success'
          element={<PaymentSuccessHandler />}
        />

        {/* Payment Verfied route */}
        <Route
          path='/payment/verified'
          element={<PaymentSuccess />}
        />

        {/* All user payment  route */}
        <Route
          path='/paymentdetails'
          element={<UserAllPaymentDetails />}
        />


        <Route
          path='/vehicles'
          element={<AllVehiclesGrid />}
        />

        <Route
          path='/about'
          element={<AboutPage />}
        />
        
        <Route
          path='/contact'
          element={<ContactPage />}
        />
      </Route>


      {/* 404 Not Found route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
