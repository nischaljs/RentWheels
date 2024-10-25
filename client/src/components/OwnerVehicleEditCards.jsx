import React, { useState } from 'react';
import { Pen, Car, Users, Calendar } from 'lucide-react';
import api from '../services/api';

const imgUrl = import.meta.env.VITE_IMG_URL;

const VehicleCard = ({ vehicle }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isAvailable, setIsAvailable] = useState(vehicle.available);

  const handleAvailabilityToggle = async () => {
    try {
      await api.put(`/vehicles/available/${vehicle.id}`, {
        available: !isAvailable
      });
      setIsAvailable(!isAvailable);
    } catch (error) {
      console.error('Error updating availability:', error);
    }
  };

  return (
    <>
      <div className="w-full max-w-sm bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 relative overflow-hidden">
        {/* Status Badge */}
        <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {isAvailable ? 'Available' : 'Unavailable'}
        </div>

        {/* Vehicle Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={imgUrl+"/"+vehicle.image}
            alt={vehicle.name}
            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
          />
        </div>

        <div className="p-6">
          {/* Vehicle Name */}
          <h3 className="text-xl font-bold text-gray-800 mb-2">{vehicle.name}</h3>

          {/* Vehicle Details */}
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
          </div>

          {/* Actions */}
          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {/* Custom Toggle Switch */}
              <button
                onClick={handleAvailabilityToggle}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                  isAvailable ? 'bg-green-500' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    isAvailable ? 'translate-x-6' : 'translate-x-1'
                  }`}
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

      {/* Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <EditVehicleForm
              vehicle={vehicle}
              onClose={() => setIsEditing(false)}
              onUpdate={onUpdate}
            />
          </div>
        </div>
      )}
    </>
  );
};

const EditVehicleForm = ({ vehicle, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: vehicle.name,
    type: vehicle.type,
    seater: vehicle.seater,
    transmission: vehicle.transmission,
    pricePerDay: vehicle.pricePerDay,
    driverAvailable: vehicle.driverAvailable
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.patch(`/vehicles/${vehicle.id}`, formData);
      onUpdate();
      onClose();
    } catch (error) {
      console.error('Error updating vehicle:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Edit Vehicle Details</h2>
        <button
          type="button"
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>
      
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Type</label>
        <input
          type="text"
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Seater</label>
        <input
          type="number"
          value={formData.seater}
          onChange={(e) => setFormData({ ...formData, seater: parseInt(e.target.value) })}
          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Price per Day</label>
        <input
          type="number"
          value={formData.pricePerDay}
          onChange={(e) => setFormData({ ...formData, pricePerDay: parseInt(e.target.value) })}
          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="flex justify-end space-x-2 mt-6">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 border rounded-md hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
};

const VehicleGrid = ({ vehicles }) => {

    if (!vehicles || vehicles.length === 0) {
        return <div>No vehicles available.</div>; 
      }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {vehicles.map((vehicle) => (
        <VehicleCard key={vehicle.id} vehicle={vehicle} />
      ))}
    </div>
  );
};

export default VehicleGrid;
