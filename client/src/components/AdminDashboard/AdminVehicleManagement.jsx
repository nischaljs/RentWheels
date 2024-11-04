import React, { useEffect, useState } from 'react'
import api from '../../services/api'
import { Loader2 } from 'lucide-react'
import AdminVehicleCard from './AdminVehicleCard' 

const AdminVehicleManagement = () => {
  const [vehicles, setVehicles] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchNotApprovedVehicles = async () => {
      try {
        const response = await api.get('/admin/notapprovedvehicles');
        setVehicles(response.data.data);
      } catch (error) {
        setError('Failed to fetch vehicles');
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchNotApprovedVehicles();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Vehicle Approval Management</h1>
      
      {vehicles.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600">No vehicles pending approval</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vehicles.map((vehicle) => (
            <AdminVehicleCard 
              key={vehicle.id} 
              vehicle={vehicle} 
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminVehicleManagement;