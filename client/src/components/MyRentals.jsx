// MyRentals.jsx
import React from 'react';

const MyRentals = ({ rentals }) => {
  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-4">My Rentals</h2>
      <ul>
        {rentals.map(rental => (
          <li key={rental.id} className="border-b py-4 px-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-semibold">{rental.vehicleName}</p>
                <p className="text-sm text-gray-600">Status: {rental.status}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Rental Dates:</p>
                <p className="text-sm text-gray-700">{rental.startDate} to {rental.endDate}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyRentals;
