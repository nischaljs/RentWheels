import React, { useState } from 'react';
import { X, Car, Check } from 'lucide-react';
import api from '../../services/api';

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

    return (
        <div className="bg-white rounded-lg shadow-lg w-[500px] max-w-[95vw]">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <Car className="w-5 h-5 text-blue-500" />
                    <h2 className="text-xl font-semibold text-gray-800">Edit Vehicle Details</h2>
                </div>
                <button 
                    onClick={onClose}
                    className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                >
                    <X className="w-5 h-5 text-gray-500" />
                </button>
            </div>

            {/* Form Content */}
            <form onSubmit={handleSubmit} className="p-6">
                <div className="grid grid-cols-2 gap-4 mb-6">
                    {/* Name Field */}
                    <div className="col-span-2 sm:col-span-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Vehicle Name
                        </label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                            placeholder="Enter vehicle name"
                        />
                    </div>

                    {/* Type Field */}
                    <div className="col-span-2 sm:col-span-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Vehicle Type
                        </label>
                        <input
                            type="text"
                            value={formData.type}
                            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                            placeholder="Enter vehicle type"
                        />
                    </div>

                    {/* Seater Field */}
                    <div className="col-span-2 sm:col-span-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Number of Seats
                        </label>
                        <input
                            type="number"
                            value={formData.seater}
                            onChange={(e) => setFormData({ ...formData, seater: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                            placeholder="Enter number of seats"
                        />
                    </div>

                    {/* Transmission Field */}
                    <div className="col-span-2 sm:col-span-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Transmission
                        </label>
                        <select
                            value={formData.transmission}
                            onChange={(e) => setFormData({ ...formData, transmission: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white"
                        >
                            <option value="Automatic">Automatic</option>
                            <option value="Manual">Manual</option>
                        </select>
                    </div>

                    {/* Price Per Day Field */}
                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Price Per Day
                        </label>
                        <div className="relative">
                            <span className="absolute left-3 top-2 text-gray-500">$</span>
                            <input
                                type="number"
                                value={formData.pricePerDay}
                                onChange={(e) => setFormData({ ...formData, pricePerDay: e.target.value })}
                                className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                placeholder="Enter price per day"
                            />
                        </div>
                    </div>

                    {/* Driver Available Toggle */}
                    <div className="col-span-2 flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center gap-2">
                            <Check className="w-5 h-5 text-gray-600" />
                            <span className="text-sm font-medium text-gray-700">Driver Available</span>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={formData.driverAvailable}
                                onChange={(e) => setFormData({ ...formData, driverAvailable: e.target.checked })}
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                        </label>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
                    >
                        <Check className="w-4 h-4" />
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
};

export default OwnerEditVehicleForm;