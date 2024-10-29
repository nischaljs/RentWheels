import React from 'react';
import VehicleProfileOverview from './VehicleProfileOverview';
import VehicleProfileReviews from './VehicleProfileReviews';
import VehicleProfileAvailability from './VehicleProfileAvailability';

const VehicleProfileTabContent = ({ activeTab, vehicle }) => (
  <div className="bg-white rounded-xl shadow-sm p-8">
    {activeTab === 'Details' && <VehicleProfileOverview vehicle={vehicle} />}
    {activeTab === 'Reviews' && <VehicleProfileReviews reviews={vehicle?.reviews} vehicle={vehicle} />}
    {activeTab === 'Booking' && <VehicleProfileAvailability availabilitySlots={vehicle?.availabilitySlots} />}
  </div>
);

export default VehicleProfileTabContent;
