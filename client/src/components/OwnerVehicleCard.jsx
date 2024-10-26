import React, { useState } from 'react';
import { Pen, Car, Users, Calendar, CheckCircle, XCircle } from 'lucide-react'; // Importing new icons
import api from '../services/api';
import OwnerEditVehicleForm from './OwnerEditVehicleForm';

const imgUrl = import.meta.env.VITE_IMG_URL;

const OwnerVehicleCard = ({ vehicle, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isAvailable, setIsAvailable] = useState(vehicle.available);

  const handleAvailabilityToggle = async () => {
    try {
      await api.put(`/vehicles/available/${vehicle.id}`, {
        available: !isAvailable,
      });
      setIsAvailable(!isAvailable);
    } catch (error) {
      console.error('Error updating availability:', error);
    }
  };

  return (
    <>
      <div className="w-full max-w-sm bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 relative overflow-hidden">
        <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {isAvailable ? 'Available' : 'Unavailable'}
        </div>
        
        <div className="relative h-48 overflow-hidden">
          <img
            src={`${imgUrl}/${vehicle.image}`}
            alt={vehicle.name}
            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
          />
        </div>

        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-2">{vehicle.name}</h3>

          <div className="space-y-3">
            <div className="flex items-center text-gray-600">
              <Car className="w-4 h-4 mr-2" />
              <span>{vehicle.type}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Users className="w-4 h-4 mr-2" />
              <span>{vehicle.seater} Seater</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Calendar className="w-4 h-4 mr-2" />
              <span>₹{vehicle.pricePerDay}/day</span>
            </div>

            {/* Driver Availability Indicator */}
            <div className="flex items-center text-gray-600">
              {vehicle.driverAvailable ? (
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
              ) : (
                <XCircle className="w-4 h-4 text-red-500 mr-2" />
              )}
              <span>{vehicle.driverAvailable ? 'Driver Available' : 'Driver Unavailable'}</span>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <button
                onClick={handleAvailabilityToggle}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${isAvailable ? 'bg-green-500' : 'bg-gray-300'}`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isAvailable ? 'translate-x-6' : 'translate-x-1'}`}
                />
              </button>
              <span className="text-sm text-gray-600">Toggle Availability</span>
            </div>
            <button
              onClick={() => setIsEditing(true)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Pen className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <OwnerEditVehicleForm
            vehicle={vehicle}
            onClose={() => setIsEditing(false)}
            onUpdate={onUpdate}
          />
        </div>
      )}
    </>
  );
};

export default OwnerVehicleCard;
