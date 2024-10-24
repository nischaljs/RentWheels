
import React from 'react';

const BookingHistory = ({ bookings }) => {
  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Booking History</h2>
      <ul>
        {bookings.map(booking => (
          <li key={booking.id} className="border-b py-2 px-4">
            <p className="text-gray-700">{booking.vehicleName} - {booking.date}</p>
            <p className="text-gray-700">Total Cost: ${booking.totalCost}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookingHistory;
