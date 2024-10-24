import React, { useState, useEffect } from 'react';
import VehicleManagement from '../components/VehicleManagement'; // For managing owner's vehicles
import BookingManagement from '../components/BookingManagement'; 
import ReviewManagement from '../components/ReviewManagement'; // For managing reviews on their vehicles
import DashboardStats from '../components/DashboardStats'; // Overview statistics related to owner’s vehicles and bookings
import VehicleUploadForm from '../components/VehicleUploadForm';
import CarsGrid from '../components/CarsGrid'; // For uploading new vehicles
import { Plus } from 'lucide-react';

const OwnerDashboard = () => {
  const [activeTab, setActiveTab] = useState('vehicles');
  const [isUploadFormOpen, setUploadFormOpen] = useState(false);

  const tabs = [
    // { id: 'vehicles', label: 'My Vehicles', component: CarsGrid },
    { id: 'bookings', label: 'My Bookings', component: BookingManagement },
    { id: 'reviews', label: 'Reviews', component: ReviewManagement },
  ];

  const toggleUploadForm = () => {
    setUploadFormOpen(!isUploadFormOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50/50 p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Owner Dashboard
        </h1>
        <p className="text-gray-500">
          Manage your vehicles, view bookings, and check reviews.
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
                ${activeTab === tab.id ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
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
              <div key={tab.id} className={`${activeTab === tab.id ? 'block' : 'hidden'}`}>
                <tab.component />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Button to Upload Vehicle */}
      <button
        onClick={toggleUploadForm}
        className="bg-green-500 text-white rounded-2xl p-4 text-lg shadow-lg fixed bottom-4 right-4"
      >
        <Plus />
      </button>

      {/* Vehicle Upload Form */}
      <VehicleUploadForm isOpen={isUploadFormOpen} onClose={toggleUploadForm} />
    </div>
  );
};

export default OwnerDashboard;
