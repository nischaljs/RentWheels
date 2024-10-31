import React, { useEffect, useState } from 'react';
import api from '../services/api';

const BookingManagement = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        // Fetch bookings from the server
        const response = await api('/owner/bookings');
        console.log('Bookings:', response.data);
        setBookings(response.data.data);  
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div>
      <h2>Booking Management</h2>
      <ul>
        {bookings.map(booking => (
          <li key={booking.id}>{booking.vehicleName} - {booking.renterName} - {booking.status}</li>
        ))}
      </ul>
    </div>
  );
};

export default BookingManagement;
