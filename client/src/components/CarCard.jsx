import React from 'react';
import { User, Settings, Heart } from 'lucide-react';

const CarCard = ({ car }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 mb-6">
      <img src={car.image} alt={car.name} className="w-full h-48 object-cover rounded-lg" />

      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-1">{car.name}</h3>

        <div className="flex items-center text-gray-500 mb-2">
          <Settings className="w-4 h-4 mr-2" />
          <span className="mr-4">{car.transmission}</span>
          <User className="w-4 h-4 mr-2" />
          <span>{car.capacity} Person</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xl font-bold">${car.price}/D</span>
          <button className="text-gray-500 hover:text-red-500 transition">
            <Heart className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
