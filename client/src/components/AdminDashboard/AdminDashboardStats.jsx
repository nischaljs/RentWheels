import React, { useEffect, useState } from 'react';
import { Users, Car, Calendar, DollarSign, CheckCircle, XCircle } from 'lucide-react';
import api from '../../services/api';

const StatCard = ({ title, value, icon: Icon, className }) => (
  <div className="bg-white rounded-md shadow-sm hover:shadow-md transition-shadow p-4 flex items-center">
    <div className={`rounded-full p-2 ${className}`}>
      <Icon className="w-5 h-5" />
    </div>
    <div className="ml-3">
      <p className="text-xs font-medium text-gray-500">{title}</p>
      <h3 className="text-xl font-bold">{value}</h3>
    </div>
  </div>
);

const AdminDashboardStats = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const response = await api.get('/admin/getstats');
        setStats(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDashboardStats();
  }, []);

  if (!stats) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-gray-600">Loading...</div>
    </div>
  );

  return (
    <div className="p-6 bg-gray-50">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
        <StatCard
          title="Total Users"
          value={stats.users}
          icon={Users}
          className="bg-blue-100 text-blue-600"
        />
        
        <StatCard
          title="Total Vehicles"
          value={stats.vehicles}
          icon={Car}
          className="bg-green-100 text-green-600"
        />
        
        <StatCard
          title="Total Bookings"
          value={stats.bookings}
          icon={Calendar}
          className="bg-purple-100 text-purple-600"
        />
        
        <StatCard
          title="Total Revenue"
          value={`रु.${stats.totalRevenue}`}
          icon={DollarSign}
          className="bg-yellow-100 text-yellow-600"
        />
        
        <StatCard
          title="Approved Vehicles"
          value={stats.approvedVehicles}
          icon={CheckCircle}
          className="bg-emerald-100 text-emerald-600"
        />
        
        <StatCard
          title="Pending Approval"
          value={stats.notapprovedVehicles}
          icon={XCircle}
          className="bg-red-100 text-red-600"
        />
      </div>
    </div>
  );
};

export default AdminDashboardStats;
