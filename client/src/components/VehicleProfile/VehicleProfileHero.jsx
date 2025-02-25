import React from 'react';
import { DollarSign, User, Settings, Star, IndianRupee } from 'lucide-react';

const VehicleProfileHero = ({ vehicle, imgBaseUrl }) => (
  <div className="relative h-[500px] bg-gray-900">
    <img
      src={`${imgBaseUrl}${vehicle?.image}`}
      alt={vehicle?.name}
      className="w-full h-full object-cover opacity-85"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50" />
    <div className="absolute bottom-0 left-0 right-0 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center space-x-4 text-white/80 mb-4">
          <span className="px-3 py-1 bg-blue-600/90 rounded-full text-sm">
            {vehicle?.type}
          </span>
          <span className="px-3 py-1 bg-green-500/90 rounded-full text-sm">
            {vehicle?.available ? 'Available' : 'Not Available'}
          </span>
        </div>
        <h1 className="text-5xl font-bold text-white mb-4">{vehicle?.name}</h1>
        <div className="flex items-center space-x-6 text-white">
          <div className="flex items-center space-x-2">
            <IndianRupee className="w-5 h-5" />
            <span className="text-xl font-semibold">{vehicle?.pricePerDay}/day</span>
          </div>
          <div className="flex items-center space-x-2">
            <User className="w-5 h-5" />
            <span>{vehicle?.seater} Seats</span>
          </div>
          <div className="flex items-center space-x-2">
            <Settings className="w-5 h-5" />
            <span>{vehicle?.transmission}</span>
          </div>
          {vehicle?.reviews?.length > 0 && (
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              <span>{vehicle?.reviews?.length} reviews</span>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
);

export default VehicleProfileHero;
