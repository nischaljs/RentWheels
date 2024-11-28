import React, { useState, useEffect } from 'react';
import api from '../services/api';
import VehicleProfileHero from '../components/VehicleProfile/VehicleProfileHero';
import VehicleProfileTabs from '../components/VehicleProfile/VehicleProfileTabs';
import VehicleProfileTabContent from '../components/VehicleProfile/VehicleProfileTabContent';
import VehicleProfileBookingWidget from '../components/VehicleProfile/VehicleProfileBookingWidget';
import { useParams } from 'react-router-dom';
import { Loader2, User } from 'lucide-react';
import OwnerAdminOptions from '../components/VehicleProfile/OwnerAdminOptions';
import { useAuth } from '../context/AuthContext';

const VehicleProfile = () => {
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('Details');
  const { user } = useAuth();

  const imgBaseUrl = import.meta.env.VITE_IMG_URL;
  const { vehicleId } = useParams();

  useEffect(() => {
    const fetchVehicleData = async () => {
      try {
        const response = await api.get(`/vehicles/${vehicleId}`);
        setVehicle(response.data.data);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchVehicleData();
  }, [vehicleId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-3">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin mx-auto" />
          <p className="text-gray-600">Loading vehicle details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-50 text-red-700 px-6 py-4 rounded-lg max-w-md text-center">
          <p className="font-medium">Error loading vehicle</p>
          <p className="text-sm mt-1">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className=" bg-white shadow-sm">
        <VehicleProfileHero vehicle={vehicle} imgBaseUrl={imgBaseUrl} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-xl shadow-sm">
              <div className="border-b border-gray-200">
                <VehicleProfileTabs
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                />
              </div>
              <div className="p-6">
                <VehicleProfileTabContent
                  activeTab={activeTab}
                  vehicle={vehicle}
                />
              </div>
            </div>
          </div>

          {/* Booking Widget - Fixed on Desktop */}

          <div className="lg:col-span-4 mt-6 lg:mt-0">
            <div className="lg:sticky lg:top-28">
              {user.role === 'USER' ? (<VehicleProfileBookingWidget vehicle={vehicle} />) : (<OwnerAdminOptions user={user} vehicle={vehicle} />)}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleProfile;