import React, { useState, useEffect } from 'react';
import { CheckCircle, Calendar, Car, Clock, Download, MapPin, Users, Gauge, Key } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import api from '../services/api';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const bookingId = searchParams.get('bookingId');
  const [bookingData, setBookingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();


  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short', // Mon, Tue, etc.
      month: 'short',   // Jan, Feb, etc.
      day: 'numeric',   // 1, 2, etc.
      hour: 'numeric',  // 1, 2, etc.
      minute: '2-digit', // 01, 02, etc.
      hour12: true,      // AM/PM
      year: 'numeric',
    });
  };
  


  useEffect(() => {
    const fetchBookingDetails = async () => {
      if (!bookingId) {
        setError('No booking ID found');
        setLoading(false);
        return;
      }

      try {
        const response = await api.get(`/bookings/${bookingId}`);
        
        setBookingData(response.data.data);
      } catch (error) {
        console.error('Error fetching booking details:', error);
        setError('Failed to fetch booking details');
      } finally {
        setLoading(false);
      }
    };

    fetchBookingDetails();
  }, [bookingId]);

  const calculateDuration = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = Math.abs(endDate - startDate);
    const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);
    const remainingHours = diffHours % 24;
    
    if (diffDays === 0) {
      return `${remainingHours} hours`;
    }
    return `${diffDays} days ${remainingHours > 0 ? `${remainingHours} hours` : ''}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-md p-6 text-center max-w-sm">
          <div className="text-red-500 mb-3">
            <svg className="w-12 h-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">{error}</h2>
          <button 
            onClick={() => navigate('/')}
            className="bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors text-sm"
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }

  if (!bookingData) return null;

  const { vehicle, startDate, endDate, totalPrice, driverRequired, id: bookingReference } = bookingData;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-md overflow-hidden">
        {/* Success Header */}
        <div className="bg-green-500 p-4 flex items-center gap-3">
          <CheckCircle className="w-6 h-6 text-white" />
          <div>
            <h1 className="text-lg font-semibold text-white">Booking Confirmed!</h1>
            <p className="text-green-100 text-sm">Ref: {bookingReference}</p>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Vehicle Info */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-3">
              <Car className="w-5 h-5 text-gray-400" />
              <h3 className="text-lg font-medium">{vehicle.name}</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">{vehicle.seater} Seater</span>
              </div>
              <div className="flex items-center gap-2">
                <Gauge className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">{vehicle.transmission}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">{vehicle.type}</span>
              </div>
              <div className="flex items-center gap-2">
                <Key className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">
                  {driverRequired ? 'With Driver' : 'Self Drive'}
                </span>
              </div>
            </div>
          </div>

          {/* Rental Details */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Calendar className="w-4 h-4" />
                <span>Start Date</span>
              </div>
              <p className="font-medium">{formatDate(new Date(startDate))}</p> {/* wrapped in new Date */}
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Calendar className="w-4 h-4" />
                <span>End Date</span>
              </div>
              <p className="font-medium">{formatDate(new Date(endDate))}</p> {/* wrapped in new Date */}
            </div>
            <div className="col-span-2 space-y-1">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Clock className="w-4 h-4" />
                <span>Duration</span>
              </div>
              <p className="font-medium">{calculateDuration(startDate, endDate)}</p>
            </div>
          </div>

          {/* Price */}
          <div className="space-y-2 pt-4 border-t border-gray-100">
            <div className="flex justify-between text-sm text-gray-500">
              <span>Daily Rate</span>
              <span>रु.{vehicle.pricePerDay}/day</span>
            </div>
            {driverRequired && (
              <div className="flex justify-between text-sm text-gray-500">
                <span>Driver Service</span>
                <span>Included</span>
              </div>
            )}
            <div className="flex justify-between items-center pt-2">
              <p className="font-medium">Total Amount</p>
              <p className="text-xl font-bold text-green-600">रु.{totalPrice}</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button 
              onClick={() => window.print()}
              className="flex-1 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center gap-2 text-sm"
            >
              <Download className="w-4 h-4" />
              Download Details
            </button>
            <button 
              onClick={() => navigate('/')}
              className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors text-sm"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;