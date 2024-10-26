import React, { useState } from 'react';
import api from '../services/api';

const OwnerEditVehicleForm = ({ vehicle, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: vehicle.name,
    type: vehicle.type,
    seater: vehicle.seater,
    transmission: vehicle.transmission,
    pricePerDay: vehicle.pricePerDay,
    driverAvailable: vehicle.driverAvailable,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/vehicles/${vehicle.id}`, formData);
      onUpdate();
      onClose();
    } catch (error) {
      console.error('Error updating vehicle:', error);
    }
  };

  const handleCheckboxChange = (e) => {
    setFormData({ ...formData, driverAvailable: e.target.checked });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white w-4/12 px-6 rounded-lg py-2">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Edit Vehicle Details</h2>
        <button type="button" onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
      </div>

      {/* Name Field */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Type Field */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Type</label>
        <input
          type="text"
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Seater Field */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Seater</label>
        <input
          type="number"
          value={formData.seater}
          onChange={(e) => setFormData({ ...formData, seater: e.target.value })}
          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Transmission Dropdown */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Transmission</label>
        <select
          value={formData.transmission}
          onChange={(e) => setFormData({ ...formData, transmission: e.target.value })}
          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="Automatic">Automatic</option>
          <option value="Manual">Manual</option>
        </select>
      </div>

      {/* Price Per Day Field */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Price Per Day</label>
        <input
          type="number"
          value={formData.pricePerDay}
          onChange={(e) => setFormData({ ...formData, pricePerDay: e.target.value })}
          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Driver Available Checkbox */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 flex items-center">
          <input
            type="checkbox"
            checked={formData.driverAvailable}
            onChange={handleCheckboxChange} // Call the handleCheckboxChange function
            className="mr-2"
          />
          Driver Available
        </label>
      </div>

      {/* Buttons */}
      <div className="flex justify-end space-x-2 mt-6">
        <button type="button" onClick={onClose} className="px-4 py-2 border rounded-md hover:bg-gray-50">Cancel</button>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Save Changes</button>
      </div>
    </form>
  );
};

export default OwnerEditVehicleForm;
