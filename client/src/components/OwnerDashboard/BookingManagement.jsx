import { AlertCircle, Banknote, Calendar, CalendarX, Car, Clock, Mail, Phone, User } from 'lucide-react';
import React, { useEffect, useState } from 'react';
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
        setError('Failed to load bookings. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchBookings();
  }, []);


  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

 
  const getStatusStyle = (status) => {
    switch (status) {
      case 'PAID':
        return 'bg-green-100 text-green-800';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'CANCELLED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
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
    <div className="max-w-7xl mx-auto p-4">
    <div className="mb-6 flex items-center gap-2">
      <Calendar className="w-6 h-6 text-blue-600" />
      <h1 className="text-2xl font-bold text-gray-800">Current Bookings</h1>
    </div>

    <div className="space-y-4">
      {bookings.map((booking) => (
        <div key={booking.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <Car className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-semibold text-gray-800">
                  {booking.vehicle.name}
                </h2>
              </div>
              
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusStyle(booking.status)}`}>
                {booking.status}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Customer Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-gray-600">
                <User className="w-4 h-4" />
                <span className="font-medium">{booking.renter.fullName}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Mail className="w-4 h-4" />
                <span>{booking.renter.email}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Phone className="w-4 h-4" />
                <span>{booking.renter.phone}</span>
              </div>
            </div>

            {/* Booking Details */}
            <div className="space-y-3">
              <div className="flex items-center justify-center gap-12 text-gray-600">
                <Clock className="w-4 h-4" />
                <div className='flex items-center justify-center flex-col'>
                  <p>Start: {formatDate(booking.startDate)}</p>
                  <div class="flex-1 w-full my-1 px-4 bg-white border border-gray-200 rounded-lg shadow-md"> </div>
                  <p>End: {formatDate(booking.endDate)}</p>
                </div>
                {booking.driverRequired && (
                <div className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  Driver Required
                </div>
              )}
              </div>
              <div className="flex items-center gap-2 mt-6 text-gray-600">
                <Banknote className="w-4 h-4" />
                <span>Total Price: रु. {booking.totalPrice}</span>
              </div>

            </div>
          </div>
        </div>
      ))}
      </div>
      </div>
  );
};

export default BookingManagement;