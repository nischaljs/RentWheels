import React from 'react';
import { useAuth } from '../../context/AuthContext';

const VehicleProfileBookingWidget = ({ vehicle }) => {
  const {user} = useAuth();
  const handleBooking = () => {
    // Implement booking logic here
    alert(`Booking for ${vehicle?.name} initiated!`);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-2xl font-semibold mb-4">Book this Vehicle</h2>
      <button
        disabled={user.role !== "USER"}
        className={`w-full py-3 rounded-lg font-medium transition-colors ${user.role !== "USER" ? "bg-gray-400 text-gray-300 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
      >
        Book Now
      </button>

    </div>
  );
};

export default VehicleProfileBookingWidget;
