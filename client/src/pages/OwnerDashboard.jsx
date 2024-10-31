import React, { useEffect, useState } from 'react';
import BookingManagement from '../components/BookingManagement'; 
import ReviewManagement from '../components/ReviewManagement';
import DashboardStats from '../components/DashboardStats';
import VehicleUploadForm from '../components/VehicleUploadForm';
import { Plus,Pen } from 'lucide-react';
import OwnerVehicleGrid from '../components/OwnerVehicleGrid';
import ProfileEditForm from '../components/ProfileEditForm';
import api from '../services/api';

const OwnerDashboard = () => {
  const [activeTab, setActiveTab] = useState('vehicles');
  const [isUploadFormOpen, setUploadFormOpen] = useState(false);
  const [isEditProfileOpen, setisEditProfileOpen] = useState(false)
  const [ownerStats, setOwnerStats] = useState({
    totalUsers: 0,
    totalVehicles : 0,
    totalBookings : 0,
    totalPayments : 0,
  });

  useEffect(() => {
    // Fetch owner stats
    const fetchOwnerStats = async()=>{
      try {
        const response = await api.get('/owner/stats');
        console.log("owner stats" + response.data);
        setOwnerStats(response.data.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchOwnerStats();
  }, []);

  const tabs = [
    { id: 'vehicles', label: 'My Vehicles', component: OwnerVehicleGrid },
    { id: 'bookings', label: 'My Bookings', component: BookingManagement },
    { id: 'reviews', label: 'Reviews', component: ReviewManagement },
  ];

  const toggleUploadForm = () => {
    setUploadFormOpen(!isUploadFormOpen);
  };

  const toggleisEditProfileOpen = () => {
    setisEditProfileOpen(!isEditProfileOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50/50 p-6 space-y-6 mt-10">
      {/* Header */}
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Owner Dashboard
        </h1>
        <div className='w-full flex items-center justify-between px-5'>
        <p className="text-gray-500">
          Manage your vehicles, view bookings, and check reviews.
        </p>
        <div className='bg-gray-100 flex items-center justify-between gap-1  rounded-full p-3 text-sm cursor-pointer shadow-sm text-black'
        onClick={toggleisEditProfileOpen}
        >
          <span>Edit profile details</span><Pen size={18}/></div>
        </div>
      </div>

      {/* Statistics Card */}
      <div className="w-full bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">Overview Statistics</h2>
          <DashboardStats stats={ownerStats} />
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

       {/* Edit  Profile Edit Form */}
       <ProfileEditForm isOpen={isEditProfileOpen} onClose={toggleisEditProfileOpen} />
    </div>
  );
};

export default OwnerDashboard;
