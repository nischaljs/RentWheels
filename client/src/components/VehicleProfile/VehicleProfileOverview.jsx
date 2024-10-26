import React from 'react';
import { Car, User, Settings, Shield, Mail, Phone } from 'lucide-react';

const VehicleProfileOverview = ({ vehicle }) => (
    console.log("vehicle details received", vehicle),
  <div className="space-y-8">
    <div>
      <h2 className="text-2xl font-semibold mb-6">Vehicle Features</h2>
      <div className="grid grid-cols-2 gap-6">
        <FeatureItem icon={Car} title="Vehicle Type" description={vehicle?.type} />
        <FeatureItem icon={User} title="Capacity" description={`${vehicle?.seater} Persons`} />
        <FeatureItem icon={Settings} title="Transmission" description={vehicle?.transmission} />
        <FeatureItem
          icon={Shield}
          title="Driver Service"
          description={vehicle?.driverAvailable ? "Available" : "Not Available"}
          status={vehicle?.driverAvailable}
        />
      </div>
    </div>

    {/* Owner Information */}
    <div>
      <h2 className="text-2xl font-semibold mb-6">Vehicle Owner</h2>
      <OwnerInfo owner={vehicle?.owner} />
    </div>
  </div>
);

const FeatureItem = ({ icon: Icon, title, description }) => (
  <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
    <div className="bg-blue-100 p-3 rounded-lg">
      <Icon className="w-6 h-6 text-blue-600" />
    </div>
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <p className="font-semibold">{description}</p>
    </div>
  </div>
);

const OwnerInfo = ({ owner }) => (
    console.log("owner details received", owner),
  <div className="bg-gray-50 rounded-xl p-6">
    <div className="flex items-center space-x-6">
      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
        <User className="w-8 h-8 text-blue-600" />
      </div>
      <div className="space-y-2">
        <h3 className="text-xl font-semibold">{owner?.fullName}</h3>
        <div className="flex space-x-4 text-gray-600">
          <div className="flex items-center space-x-2">
            <Mail className="w-4 h-4" />
            <span>{owner?.email}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Phone className="w-4 h-4" />
            <span>{owner?.phone}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default VehicleProfileOverview;
