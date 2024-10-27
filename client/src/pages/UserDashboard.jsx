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
  
  const sampleRentals = [
    {
      id: 1,
      vehicleName: 'Land Rover Defender Sports',
      status: 'Active',
      startDate: '2023-10-01',
      endDate: '2023-10-10',
    },
    {
      id: 2,
      vehicleName: 'Tesla Model X',
      status: 'Completed',
      startDate: '2023-09-15',
      endDate: '2023-09-20',
    },
  ];

  const samplePayment = {
    id: 1,
    amount: 299.99,
    status: 'COMPLETED',
    token: 'abc123xyz',
    createdAt: '2023-10-10T08:55:12.000Z',
  };

  const sampleReviews = [
    {
      id: 1,
      vehicleName: 'Tesla Model X',
      rating: 5,
      comment: 'Great experience!',
      createdAt: '2023-10-11T08:55:12.000Z',
    },
    {
      id: 2,
      vehicleName: 'Land Rover Defender',
      rating: 4,
      comment: 'Very comfortable.',
      createdAt: '2023-10-12T08:55:12.000Z',
    },
  ];

  const stats = [
    { icon: Car, label: 'Active Rentals', value: '2' },
    { icon: Star, label: 'Average Rating', value: '4.5' },
    { icon: CreditCard, label: 'Total Spent', value: '$599.98' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col space-y-2">
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome back, {user.fullName}
            </h1>
            <p className="text-gray-600">
              Manage your rentals, payments, and reviews all in one place.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
          {/* Main Content */}

            <DashboardCard className="space-y-8 lg:col-span-2">
              <UserProfile user={user} />
            </DashboardCard>
            
            <DashboardCard className="lg:col-span-4 space-y-8" >
              <UsersRentals rentals={sampleRentals} />
            </DashboardCard>
        

          {/* Sidebar */}
      
            <DashboardCard className="lg:col-span-3 space-y-8">
              <UserPaymentInformation payment={samplePayment} />
            </DashboardCard>
            
            <DashboardCard  className="space-y-8 lg:col-span-3">
              <UserReviewAndRatings reviews={sampleReviews} />
            </DashboardCard>

        </div>
      </div>
    </div>
  );
};

export default UserDashboard;