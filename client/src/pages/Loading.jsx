import React, { useEffect, useState } from 'react';
import { Car, Bike, Bus, Truck, MapPin, Package } from 'lucide-react';

const LoadingScreen = ({ 
  fullScreen = true, 
  message = "", 
  theme = "blue" // blue, indigo, purple
}) => {
  const [progress, setProgress] = useState(0);
  const [currentVehicle, setCurrentVehicle] = useState(0);

  const themes = {
    blue: {
      bg: "from-blue-50 to-blue-100",
      primary: "text-blue-600",
      secondary: "text-blue-400",
      progress: "bg-blue-600",
      dot: "bg-blue-600"
    },
    indigo: {
      bg: "from-indigo-50 to-indigo-100",
      primary: "text-indigo-600",
      secondary: "text-indigo-400",
      progress: "bg-indigo-600",
      dot: "bg-indigo-600"
    },
    purple: {
      bg: "from-purple-50 to-purple-100",
      primary: "text-purple-600",
      secondary: "text-purple-400",
      progress: "bg-purple-600",
      dot: "bg-purple-600"
    }
  };

  const vehicles = [
    { 
      icon: Car, 
      text: message || "Finding the perfect ride...",
      animation: "animate-bounce"
    },
    { 
      icon: Bike, 
      text: message || "Checking availability...",
      animation: "animate-pulse"
    },
    { 
      icon: Bus, 
      text: message || "Getting the best rates...",
      animation: "animate-bounce"
    },
    { 
      icon: Truck, 
      text: message || "Almost there...",
      animation: "animate-pulse"
    },
    { 
      icon: Package, 
      text: message || "Preparing your journey...",
      animation: "animate-bounce"
    }
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
  const currentTheme = themes[theme];

  const ContentWrapper = ({ children }) => (
    fullScreen ? (
      <div className={`fixed inset-0 bg-gradient-to-br ${currentTheme.bg} flex items-center justify-center z-50`}>
        {children}
      </div>
    ) : (
      <div className={`w-full h-full min-h-[300px] bg-gradient-to-br ${currentTheme.bg} flex items-center justify-center rounded-2xl`}>
        {children}
      </div>
    )
  );

  return (
    <ContentWrapper>
      <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl w-[340px] flex flex-col items-center space-y-8">
        {/* Vehicle Animation Container */}
        <div className="relative w-full h-32 overflow-hidden">
          {/* Road with animated dashes */}
          <div className="absolute bottom-0 w-full h-3">
            <div className="relative h-full bg-gray-100 rounded-full overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-around animate-slide">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="w-8 h-1 bg-gray-300 rounded-full" />
                ))}
              </div>
            </div>
          </div>

          {/* Animated landmarks */}
          <div className="absolute bottom-6 w-full flex justify-between px-4">
            {[...Array(3)].map((_, i) => (
              <MapPin 
                key={i} 
                className={`${currentTheme.secondary} w-5 h-5 transform transition-transform duration-500 hover:scale-110`}
                style={{
                  animation: `landmarkPulse 1.5s ease-in-out ${i * 0.3}s infinite`
                }}
              />
            ))}
          </div>

          {/* Moving vehicle */}
          <div
            className="absolute bottom-8"
            style={{
              left: `${progress}%`,
              transform: `translateX(-50%)`,
              transition: 'left 0.3s ease-out'
            }}
          >
            <CurrentVehicleIcon
              className={`w-12 h-12 ${currentTheme.primary} ${vehicles[currentVehicle].animation}`}
              strokeWidth={1.5}
            />
          </div>
        </div>

        {/* Loading Message */}
        <div className="text-center space-y-3">
          <p className={`${currentTheme.primary} font-medium text-lg tracking-wide`}>
            {vehicles[currentVehicle].text}
          </p>
          
          {/* Progress Percentage */}
          <p className="text-gray-500 text-sm font-medium">
            {Math.round(progress)}%
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className={`h-full ${currentTheme.progress} rounded-full transition-all duration-300 ease-out`}
            style={{ 
              width: `${progress}%`,
              boxShadow: '0 0 10px rgba(0,0,0,0.1)'
            }}
          />
        </div>

        {/* Animated dots */}
        <div className="flex space-x-3">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                progress % 3 === i ? currentTheme.dot : 'bg-gray-200'
              }`}
              style={{
                transform: progress % 3 === i ? 'scale(1.2)' : 'scale(1)',
                transition: 'all 0.3s ease-in-out'
              }}
            />
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes landmarkPulse {
          0% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
          100% { transform: translateY(0); }
        }
        
        @keyframes slide {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        
        .animate-slide {
          animation: slide 1s linear infinite;
        }
      `}</style>
    </ContentWrapper>
  );
};

export default LoadingScreen;