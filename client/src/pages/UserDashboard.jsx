import React from 'react';
import { CreditCard, User, Car, Star, ChevronRight, Clock } from 'lucide-react';
import UserProfile from '../components/UserProfile';
import MyRentals from '../components/MyRentals';
import PaymentInformation from '../components/PaymentInformation';
import ReviewAndRatings from '../components/ReviewAndRatings';

const SectionCard = ({ title, icon: Icon, children, className = '' }) => (
  <div className={`bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 ${className}`}>
    <div className="border-b border-gray-100 p-6">
      <div className="flex items-center space-x-3">
        <div className="rounded-lg bg-blue-50 p-2">
          <Icon className="w-5 h-5 text-blue-600" />
        </div>
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
      </div>
    </div>
    <div className="p-6">{children}</div>
  </div>
);

const UserDashboard = () => {
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

  const sampleUser = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '123-456-7890',
  };

  return (
    <div className="min-h-screen bg-gray-50/50 p-6 space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          Welcome back, {sampleUser.name}
        </h1>
        <p className="text-gray-500">
          Manage your rentals, payments, and reviews all in one place.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content - First Two Columns */}
        <div className="lg:col-span-2 space-y-6">
          {/* User Profile */}
          <SectionCard title="Profile" icon={User}>
            <UserProfile user={sampleUser} />
          </SectionCard>

          {/* Active Rentals */}
          <SectionCard title="Current Rentals" icon={Car}>
            <div className="space-y-2">
              <MyRentals rentals={sampleRentals} />
            </div>
          </SectionCard>
        </div>

        {/* Sidebar - Third Column */}
        <div className="space-y-6">
          {/* Payment Information */}
          <SectionCard title="Payment Information" icon={CreditCard}>
            <PaymentInformation payment={samplePayment} />
          </SectionCard>

          {/* Reviews & Ratings */}
          <SectionCard title="Recent Reviews" icon={Star}>
            <ReviewAndRatings reviews={sampleReviews} />
          </SectionCard>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;