import React from 'react';

const VehicleProfileTabButton = ({ tab, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`py-2 px-4 font-semibold rounded-lg transition-colors duration-300 
        ${isActive ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
    >
      {tab}
    </button>
  );
};

export default VehicleProfileTabButton;
