import React from 'react';
import VehicleProfileTabButton from './VehicleProfileTabButton';

const VehicleProfileTabs = ({ activeTab, setActiveTab }) => {
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex space-x-4 mb-6">
      {['Details', 'Reviews', 'Booking'].map((tab) => (
        <VehicleProfileTabButton
          key={tab}
          tab={tab}
          isActive={activeTab === tab}
          onClick={() => handleTabChange(tab)}
        />
      ))}
    </div>
  );
};

export default VehicleProfileTabs;
