import React, { useState } from 'react';
import AdminUserManagement from '../components/AdminDashboard/AdminUserManagement';
import AdminVehicleManagement from '../components/AdminDashboard/AdminVehicleManagement';
import AdminBookingManagement from '../components/AdminDashboard/AdminBookingManagement';
import AdminDashboardStats from '../components/AdminDashboard/AdminDashboardStats';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('users');

  const tabs = [
    { id: 'users', label: 'Users', component: AdminUserManagement },
    { id: 'vehicles', label: 'Vehicles', component: AdminVehicleManagement },
    { id: 'bookings', label: 'Bookings', component: AdminBookingManagement },
  ];

  return (
    <div className="min-h-screen bg-gray-50/50 p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-2 mt-12">
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
          <AdminDashboardStats />
        </div>
      </div>
      {/* Tabs Navigation */}
      <div className="border-b border-gray-200 bg-gray-50">
        <nav className="flex space-x-4 px-4 py-2" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative px-4 py-2 text-sm font-medium rounded-t-md transition-colors duration-200 ease-out
          ${activeTab === tab.id
                  ? 'text-blue-600 bg-white border-t-2 border-l-2 border-r-2 border-blue-500'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <span className="absolute inset-x-0 bottom-0 h-1 bg-blue-500 rounded-t-md" />
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Content Area */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div>
          <div>
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