import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Users, Car, Calendar, CreditCard } from 'lucide-react';

const StatsCard = ({ title, value, icon: Icon, trend }) => {
  if(value === undefined) return null;
  else return(
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between">
      <div className="flex flex-col">
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-2xl font-bold mt-1 text-gray-900">{value}</p>
      </div>
      <div className="rounded-full bg-blue-50 p-3">
        <Icon className="w-6 h-6 text-blue-600" />
      </div>
    </div>
    {trend && (
      <div className="mt-4 flex items-center">
        <span className={`text-sm ${trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}%
        </span>
        <span className="text-sm text-gray-500 ml-2">vs last month</span>
      </div>
    )}
  </div>
  )
};

const DashboardStats = ({stats}) => {
  
  const statsConfig = [
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: Users,
      trend: 12,
    },
    {
      title: 'Total Vehicles',
      value: stats.totalVehicles,
      icon: Car,
      trend: -5,
    },
    {
      title: 'Total Bookings',
      value: stats.totalBookings,
      icon: Calendar,
      trend: 8,
    },
    {
      title: 'Total Payments',
      value: stats.totalPayments,
      icon: CreditCard,
      trend: 15,
    },
  ];

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsConfig.map((stat, index) => (
          <StatsCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            trend={stat.trend}
          />
        ))}
      </div>
    </div>
  );
};

export default DashboardStats;