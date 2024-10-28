import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import VehicleBookingForm from '../vehicleBooking/VehicleBookingForm';

const VehicleProfileBookingWidget = ({ vehicle }) => {
  const [isBookingFormOpen, setisBookingFormOpen] = useState(false);
  const {user} = useAuth();
  const handleBooking = () => {
   setisBookingFormOpen(true);
  };

  const handleFormClose = () => {
    setisBookingFormOpen(false);
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-2xl font-semibold mb-4">Book this Vehicle</h2>
      <button
        disabled={user.role !== "USER"}
        className={`w-full py-3 rounded-lg font-medium transition-colors ${user.role !== "USER" ? "bg-gray-400 text-gray-300 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
          onClick={handleBooking}
      >
        Book Now
      </button>
      {isBookingFormOpen && <VehicleBookingForm vehicleId={vehicle.id} vehicle={vehicle} onClose={handleFormClose} />}
    </div>
  );
};

export default VehicleProfileBookingWidget;
