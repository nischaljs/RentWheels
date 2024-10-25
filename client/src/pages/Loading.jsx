import React, { useEffect, useState } from 'react';
import { Car, Bike, Bus, Truck, MapPin } from 'lucide-react';

const LoadingPage = () => {
  const [progress, setProgress] = useState(0);
  const [currentVehicle, setCurrentVehicle] = useState(0);

  const vehicles = [
    { icon: Car, text: "Finding the perfect ride..." },
    { icon: Bike, text: "Checking availability..." },
    { icon: Bus, text: "Getting the best rates..." },
    { icon: Truck, text: "Almost there..." }
  ];

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(prev => (prev >= 100 ? 0 : prev + 1));
    }, 30);

    const vehicleInterval = setInterval(() => {
      setCurrentVehicle(prev => (prev + 1) % vehicles.length);
    }, 2000);

    return () => {
      clearInterval(progressInterval);
      clearInterval(vehicleInterval);
    };
  }, []);

  const CurrentVehicleIcon = vehicles[currentVehicle].icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-80 flex flex-col items-center space-y-6">
        {/* Moving vehicle with road */}
        <div className="relative w-full h-24 overflow-hidden">
          <div className="absolute bottom-0 w-full h-2 bg-gray-200">
            <div className="absolute bottom-1 w-full flex justify-center space-x-3">
              <MapPin className="text-gray-400 w-4 h-4" />
              <MapPin className="text-gray-400 w-4 h-4" />
              <MapPin className="text-gray-400 w-4 h-4" />
              <MapPin className="text-gray-400 w-4 h-4" />
              <MapPin className="text-gray-400 w-4 h-4" />
            </div>
          </div>
          
          <div 
            className="absolute transform -translate-y-1/2"
            style={{
              left: `${progress}%`,
              transform: `translateX(-50%) translateY(0)`,
              transition: 'left 0.3s ease-in-out'
            }}
          >
            <CurrentVehicleIcon 
              className="w-10 h-10 text-indigo-600 animate-bounce"
              strokeWidth={1.5}
            />
          </div>
        </div>

        {/* Loading text */}
        <div className="text-center">
          <p className="text-indigo-600 font-medium text-lg">
            {vehicles[currentVehicle].text}
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-indigo-600 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Loading dots */}
        <div className="flex space-x-2">
          <div className={`w-2 h-2 rounded-full ${progress % 3 === 0 ? 'bg-indigo-600' : 'bg-gray-200'} transition-colors duration-300`} />
          <div className={`w-2 h-2 rounded-full ${progress % 3 === 1 ? 'bg-indigo-600' : 'bg-gray-200'} transition-colors duration-300`} />
          <div className={`w-2 h-2 rounded-full ${progress % 3 === 2 ? 'bg-indigo-600' : 'bg-gray-200'} transition-colors duration-300`} />
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;