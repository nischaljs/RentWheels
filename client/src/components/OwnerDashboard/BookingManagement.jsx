import React, { useEffect, useState } from 'react';
import { Calendar, Car, User, Clock, AlertCircle, CalendarX } from 'lucide-react';
import api from '../../services/api';

const BookingManagement = () => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setIsLoading(true);
        const response = await api('/owner/bookings');
        setBookings(response.data.data);
        setError(null);
      } catch (error) {
        console.error('Error fetching bookings:', error);
        setError('Failed to load bookings. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchBookings();
  }, []);

  const getStatusColor = (status) => {
    const statusColors = {
      PENDING: 'bg-yellow-100 text-yellow-800',
      CONFIRMED: 'bg-green-100 text-green-800',
      CANCELLED: 'bg-red-100 text-red-800',
      COMPLETED: 'bg-blue-100 text-blue-800'
    };
    return statusColors[status] || 'bg-gray-100 text-gray-800';
  };

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin">
          <Clock className="w-8 h-8 text-blue-600" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-red-600 space-y-4">
        <AlertCircle className="w-12 h-12" />
        <p className="text-lg font-medium">{error}</p>
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4 p-8">
        <div className="relative">
          <CalendarX className="w-16 h-16 text-gray-300" />
          <Car className="w-8 h-8 text-blue-500 absolute -top-2 -right-2" />
        </div>
        <h3 className="text-xl font-semibold text-gray-700">No Bookings Yet</h3>
        <p className="text-gray-500 text-center max-w-md">
          Your vehicles haven't received any bookings yet. When customers book your vehicles, they'll appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center space-x-3 mb-8">
        <Calendar className="w-8 h-8 text-blue-600" />
        <h2 className="text-2xl font-semibold text-gray-800">Booking Management</h2>
      </div>

      <div className="grid gap-4">
        {bookings.map(booking => (
          <div 
            key={booking.id}
            className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 transition-all hover:shadow-md"
          >
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center space-x-4">
                <Car className="w-6 h-6 text-gray-500" />
                <div>
                  <h3 className="font-medium text-gray-900">{booking.vehicleName}</h3>
                  <div className="flex items-center space-x-2 text-gray-500">
                    <User className="w-4 h-4" />
                    <span>{booking.renterName}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <span 
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}
                >
                  {booking.status}
                </span>
                <button 
                  className="text-blue-600 hover:text-blue-800 font-medium"
                  onClick={() => {/* Handle view details */}}
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingManagement;