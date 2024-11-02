import React from 'react';
import { User, Settings, Heart, Calendar, Fuel } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CarCard = ({ car }) => {
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_IMG_URL;

  const handleCarCardClick = (carId) => {
    navigate(`/vehicle/${carId}`);
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
      {/* Image Container with Overlay */}
      <div className="relative">
        <div className="absolute top-4 left-4 z-10 flex gap-2">
          <span className="px-3 py-1 bg-white/90 text-black text-sm font-medium rounded-full">
            {car.type}
          </span>
          {car.available && (
            <span className="px-3 py-1 bg-green-500/90 text-white text-sm font-medium rounded-full">
              Available
            </span>
          )}
        </div>
        
        <button className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 hover:bg-white/75 transition-colors">
          <Heart className="w-5 h-5 text-gray-600 hover:text-red-500 transition-colors" />
        </button>
        
        <div className="relative h-48 overflow-hidden group">
          <img 
            src={baseUrl + car.image} 
            alt={car.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Car Name and Price */}
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold text-gray-900">{car.name}</h3>
          <div className="text-right">
            <p className="text-2xl font-bold text-blue-600">रु.{car.pricePerDay}</p>
            <p className="text-sm text-gray-500">per day</p>
          </div>
        </div>

        {/* Specifications Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex items-center gap-2 text-gray-600">
            <Settings className="w-4 h-4" />
            <span className="text-sm">{car.transmission}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <User className="w-4 h-4" />
            <span className="text-sm">{car.seater} Seats</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Calendar className="w-4 h-4" />
            <span className="text-sm">{new Date(car.createdAt).getFullYear()}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Fuel className="w-4 h-4" />
            <span className="text-sm">Petrol</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-4 border-t border-gray-100">
          <button 
            onClick={() => handleCarCardClick(car.id)}
            className="w-full py-2.5 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarCard;