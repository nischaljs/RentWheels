import React, { useEffect, useState } from 'react';
import { User, Calendar, Clock, CreditCard, Check, X, Phone, Mail } from 'lucide-react';
import api from '../../services/api';

const AdminBookingManagement = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchAllBookings = async () => {
      try {
        const response = await api.get('/admin/bookings');
        setBookings(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllBookings();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-center sm:text-left">Booking Management</h1>
      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="min-w-full bg-white rounded-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="px-4 py-3 text-left">Booking ID</th>
              <th className="px-4 py-3 text-left">Renter Info</th>
              <th className="px-4 py-3 text-left">Vehicle</th>
              <th className="px-4 py-3 text-left">Dates</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-center w-20">Driver</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm font-light">
            {bookings.map((booking) => (
              <tr key={booking.id} className="border-b hover:bg-gray-100 transition duration-300 ease-in-out">
                <td className="px-2 py-1 whitespace-nowrap">{booking.id}</td>
                
                {/* Renter Info */}
                <td className="px-2 py-2 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-gray-500" />
                    <div>
                      <div>{booking.renter.fullName}</div>
                      <div className="text-xs text-gray-500">
                        <Mail className="inline w-3 h-3 mr-1" />
                        {booking.renter.email}
                      </div>
                      <div className="text-xs text-gray-500">
                        <Phone className="inline w-3 h-3 mr-1" />
                        {booking.renter.phone}
                      </div>
                    </div>
                  </div>
                </td>

                {/* Vehicle Info */}
                <td className="px-2 py-2 whitespace-nowrap">
                  <div>{booking.vehicle.name}</div>
                  <div className="text-xs text-gray-500">
                    Owner: {booking.vehicle.owner.fullName} <br />
                    <Mail className="inline w-3 h-3 mr-1" />{booking.vehicle.owner.email} <br />
                    <Phone className="inline w-3 h-3 mr-1" />{booking.vehicle.owner.phone}
                  </div>
                </td>

                {/* Booking Dates */}
                <td className="px-2 py-2 whitespace-nowrap">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                    {new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}
                  </div>
                </td>

                {/* Status */}
                <td className="px-2 py-2 whitespace-nowrap flex items-center">
                  {booking.status === 'PAID' ? (
                    <Check className="w-4 h-4 mr-2 text-green-500" />
                  ) : (
                    <X className="w-4 h-4 mr-2 text-red-500" />
                  )}
                  <span className={`font-semibold ${booking.status === 'PAID' ? 'text-green-500' : 'text-red-500'}`}>
                    {booking.status}
                  </span>
                </td>

                {/* Total Price */}
                <td className="px-2 py-2 text-center whitespace-nowrap flex items-center justify-center">
                  <CreditCard className="w-4 h-4 mr-2 text-gray-500" />
                  ${booking.totalPrice.toFixed(2)}
                </td>

                {/* Driver Requirement */}
                <td className="px-2 py-2 text-center whitespace-nowrap">
                  {booking.driverRequired ? (
                    <span className="text-blue-500 font-semibold">Required</span>
                  ) : (
                    <span className="text-gray-500">Not Required</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminBookingManagement;
