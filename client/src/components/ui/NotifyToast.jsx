import React, { useEffect, useState } from 'react';
import { CheckCircle, AlertCircle, XCircle } from 'lucide-react';

const NotifyToast = ({ type, message, duration = 3000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  const iconTypes = {
    success: <CheckCircle className="text-green-500 mr-2" />,
    warning: <AlertCircle className="text-yellow-500 mr-2" />,
    error: <XCircle className="text-red-500 mr-2" />,
  };

  const backgroundColors = {
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    error: 'bg-red-100 text-red-800',
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onClose) onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    isVisible && (
      <div
        className={`fixed bottom-4 right-4 max-w-md w-full flex items-center p-4 rounded-md shadow-md transition-opacity duration-500 ${backgroundColors[type]} ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {iconTypes[type]}
        <div className="flex-1 text-sm font-medium">{message}</div>
        <button
          className="text-gray-500 hover:text-gray-700 focus:outline-none"
          onClick={() => {
            setIsVisible(false);
            if (onClose) onClose();
          }}
        >
          <XCircle className="h-5 w-5" />
        </button>
      </div>
    )
  );
};

export default NotifyToast;