import React from 'react';
import { Car, Calendar, ArrowRight, Clock } from 'lucide-react';

const UsersRentals = ({ rentals }) => {
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-50 text-green-700 border-green-100';
      case 'completed':
        return 'bg-gray-50 text-gray-700 border-gray-100';
      case 'pending':
        return 'bg-yellow-50 text-yellow-700 border-yellow-100';
      case 'paid':
        return 'bg-blue-50 text-blue-700 border-yellow-100';
      case 'cancelled':
        return 'bg-red-50 text-red-700 border-red-100';

      default:
        return 'bg-gray-50 text-gray-700 border-gray-100';
    }
  };

  return (
    <div className="bg-white rounded-xl h-[80vh] overflow-y-scroll border border-gray-200 shadow-sm">
      <div className="border-b border-gray-100 p-6 ">
        <div className="flex items-center space-x-3">
          <div className="rounded-lg bg-blue-50 p-2">
            <Car className="w-5 h-5 text-blue-600" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900">My Rentals</h2>
        </div>
      </div>

      <div className="divide-y divide-gray-100">
        {rentals.map(rental => (
          <div 
            key={rental.id} 
            className="p-6 hover:bg-gray-50 transition-colors duration-150"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-4 sm:space-y-0">
              {/* Left side - Vehicle info */}
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center">
                    <Car className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{rental.vehicleName}</h3>
                  <div className="flex items-center mt-1 space-x-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(rental.status)}`}>
                      {rental.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right side - Dates */}
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1.5" />
                  {rental.startDate}
                </div>
                <ArrowRight className="w-4 h-4" />
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1.5" />
                  {rental.endDate}
                </div>
              </div>
            </div>

            {/* Optional: Add a footer with actions */}
            <div className="mt-4 flex items-center justify-end space-x-4">
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                View Details
              </button>
              <button className="text-sm text-gray-500 hover:text-gray-700 font-medium">
                Download Receipt
              </button>
            </div>
          </div>
        ))}
      </div>

      {rentals.length === 0 && (
        <div className="p-6 text-center text-gray-500">
          No rentals found
        </div>
      )}
    </div>
  );
};

export default UsersRentals;