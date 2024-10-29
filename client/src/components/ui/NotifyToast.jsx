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
    success: 'bg-green-100',
    warning: 'bg-yellow-100',
    error: 'bg-red-100',
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
        className={`flex items-center p-4 rounded-md shadow-md transition-opacity duration-500 ${backgroundColors[type]} ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {iconTypes[type]}
        <div className="text-sm font-medium text-gray-800">{message}</div>
      </div>
    )
  );
};

export default NotifyToast;