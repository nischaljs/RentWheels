import React from 'react';
import { CreditCard, User, Car, Star } from 'lucide-react';
import UserProfile from '../components/userDashboard/UserProfile';
import UsersRentals from '../components/userDashboard/UsersRentals';
import UserPaymentInformation from '../components/userDashboard/UserPaymentInformation';
import UserReviewAndRatings from '../components/userDashboard/UserReviewAndRatings';
import { useAuth } from '../context/AuthContext';

const DashboardCard = ({ children, className = '' }) => (
  <div className={`bg-white rounded-lg shadow-sm p-6 ${className}`}>
    {children}
  </div>
);

const UserDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back, {user.fullName || 'User'}
          </h1>
          <p className="text-gray-600">Manage your rentals, payments, and reviews all in one place.</p>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
          {/* Profile and Rentals */}
          <DashboardCard className="space-y-8 lg:col-span-2">
            <UserProfile user={user} />
          </DashboardCard>
          
          <DashboardCard className="lg:col-span-4 space-y-8">
            <UsersRentals rentals={user.bookings} />
          </DashboardCard>

          {/* Payment Information and Reviews */}
          <DashboardCard className="lg:col-span-3 space-y-8">
            <UserPaymentInformation payment={user.Payment[user.Payment.length - 1]} />
          </DashboardCard>
          
          <DashboardCard className="lg:col-span-3 space-y-8">
            <UserReviewAndRatings reviews={user.reviews} />
          </DashboardCard>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
