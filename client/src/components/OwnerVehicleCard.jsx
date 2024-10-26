import React, { useState } from 'react';
import { Pen, Car, Users, Calendar, Upload, CheckCircle, XCircle, Shield } from 'lucide-react';
import api from '../services/api';
import OwnerEditVehicleForm from './OwnerEditVehicleForm';
import OwnerBookingPopup from './OwnerBookingPopup';
import OwnerDocumentUploadPopup from './OwnerDocumentUploadPopup';

const imgUrl = import.meta.env.VITE_IMG_URL;

const StatusBadge = ({ isActive, activeText, inactiveText, activeClass, inactiveClass }) => (
  <div className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 ${
    isActive ? activeClass : inactiveClass
  }`}>
    {isActive ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
    {isActive ? activeText : inactiveText}
  </div>
);

const ActionButton = ({ icon: Icon, label, onClick, variant = "secondary" }) => (
  <button
    onClick={onClick}
    className={`w-full px-4 py-2.5 rounded-lg flex items-center justify-center gap-2 transition-all
      ${variant === "primary" 
        ? "bg-blue-500 text-white hover:bg-blue-600" 
        : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
  >
    <Icon className="w-4 h-4" />
    <span className="text-sm font-medium">{label}</span>
  </button>
);

const OwnerVehicleCard = ({ vehicle, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isAvailable, setIsAvailable] = useState(vehicle.available);
  const [isBookingPopupOpen, setIsBookingPopupOpen] = useState(false);
  const [isDocumentUploadPopupOpen, setIsDocumentUploadPopupOpen] = useState(false);

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
      <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
        {/* Image Section */}
        <div className="relative h-56">
          <img
            src={`${imgUrl}/${vehicle.image}`}
            alt={vehicle.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4">
            <button
              onClick={() => setIsEditing(true)}
              className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
            >
              <Pen className="w-4 h-4 text-gray-700" />
            </button>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6">
          {/* Status Badges */}
          <div className="flex flex-wrap gap-2 mb-4">
            <StatusBadge
              isActive={vehicle.approved}
              activeText="Approved"
              inactiveText="Not Approved"
              activeClass="bg-green-100 text-green-700"
              inactiveClass="bg-red-100 text-red-700"
            />
            <StatusBadge
              isActive={isAvailable}
              activeText="Available"
              inactiveText="Unavailable"
              activeClass="bg-blue-100 text-blue-700"
              inactiveClass="bg-gray-100 text-gray-700"
            />
            <StatusBadge
              isActive={vehicle.driverAvailable}
              activeText="Driver Available"
              inactiveText="Self Drive"
              activeClass="bg-purple-100 text-purple-700"
              inactiveClass="bg-orange-100 text-orange-700"
            />
          </div>

          {/* Vehicle Details */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-800">{vehicle.name}</h3>
              <div className="text-lg font-semibold text-blue-600">
                ₹{vehicle.pricePerDay}/day
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center text-gray-600">
                <Car className="w-4 h-4 mr-2" />
                <span className="text-sm">{vehicle.type}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Users className="w-4 h-4 mr-2" />
                <span className="text-sm">{vehicle.seater} Seater</span>
              </div>
            </div>
          </div>

          {/* Availability Toggle */}
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg mb-4">
            <span className="text-sm font-medium text-gray-700">Quick Availability Toggle</span>
            <button
              onClick={handleAvailabilityToggle}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                isAvailable ? 'bg-green-500' : 'bg-gray-300'
              }`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                isAvailable ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 gap-3">
            <ActionButton
              icon={Calendar}
              label="Manage Availability"
              onClick={() => setIsBookingPopupOpen(true)}
              variant="primary"
            />
            <ActionButton
              icon={Upload}
              label="Upload Documents"
              onClick={() => setIsDocumentUploadPopupOpen(true)}
            />
          </div>
        </div>
      </div>

      {/* Modals */}
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <OwnerEditVehicleForm
            vehicle={vehicle}
            onClose={() => setIsEditing(false)}
            onUpdate={onUpdate}
          />
        </div>
      )}

      {isBookingPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <OwnerBookingPopup 
            vehicleId={vehicle.id} 
            onClose={() => setIsBookingPopupOpen(false)} 
          />
        </div>
      )}

      {isDocumentUploadPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <OwnerDocumentUploadPopup 
            vehicleId={vehicle.id} 
            onClose={() => setIsDocumentUploadPopupOpen(false)} 
          />
        </div>
      )}
    </>
  );
};

export default OwnerVehicleCard;