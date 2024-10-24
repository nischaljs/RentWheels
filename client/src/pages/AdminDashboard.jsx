import React, { useState } from 'react';
import UserManagement from '../components/UserManagement';
import VehicleManagement from '../components/VehicleManagement';
import BookingManagement from '../components/BookingManagement';
import PaymentManagement from '../components/PaymentManagement';
import ReviewManagement from '../components/ReviewManagement';
import DashboardStats from '../components/DashboardStats';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('users');

  const tabs = [
    { id: 'users', label: 'Users', component: UserManagement },
    { id: 'vehicles', label: 'Vehicles', component: VehicleManagement },
    { id: 'bookings', label: 'Bookings', component: BookingManagement },
    { id: 'payments', label: 'Payments', component: PaymentManagement },
    { id: 'reviews', label: 'Reviews', component: ReviewManagement },
  ];

  return (
    <div className="min-h-screen bg-gray-50/50 p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Admin Dashboard
        </h1>
        <p className="text-gray-500">
          Manage your application's users, vehicles, bookings, and more.
        </p>
      </div>

      {/* Statistics Card */}
      <div className="w-full bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">Overview Statistics</h2>
          <DashboardStats />
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-4" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-2 text-sm font-medium rounded-t-lg -mb-px 
                ${
                  activeTab === tab.id
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Content Area */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">
            {tabs.find(tab => tab.id === activeTab)?.label} Management
          </h2>
          <div className="mt-4">
            {tabs.map((tab) => (
              <div
                key={tab.id}
                className={`${activeTab === tab.id ? 'block' : 'hidden'}`}
              >
                <tab.component />
              </div>
            ))}
          </div>
        </div>
      </div>

     
    </div>
  );
};

export default AdminDashboard;