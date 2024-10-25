import React, { useEffect, useState } from 'react';

const BookingManagement = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        // Uncomment the line below to fetch data from the API
        // const response = await axios.get('/api/bookings');
        // setBookings(response.data);

        // Sample data for now
        const sampleBookings = [
          { id: 1, vehicleName: 'Tesla Model X', renterName: 'John Doe', status: 'CONFIRMED' },
          { id: 2, vehicleName: 'Land Rover Defender', renterName: 'Jane Smith', status: 'COMPLETED' },
        ];
        setBookings(sampleBookings);
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
