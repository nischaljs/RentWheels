import React, { useEffect, useState } from 'react';
import axios from 'axios';

const VehicleManagement = () => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        // Uncomment the line below to fetch data from the API
        // const response = await axios.get('/api/vehicles');
        // setVehicles(response.data);

        // Sample data for now
        const sampleVehicles = [
          { id: 1, name: 'Land Rover Defender', type: 'SUV', available: true },
          { id: 2, name: 'Tesla Model X', type: 'SUV', available: false },
        ];
        setVehicles(sampleVehicles);
      } catch (error) {
        console.error('Error fetching vehicles:', error);
      }
    };

    fetchVehicles();
  }, []);

  return (
    <div>
      <h2>Vehicle Management</h2>
      <ul>
        {vehicles.map(vehicle => (
          <li key={vehicle.id}>{vehicle.name} - {vehicle.type} - {vehicle.available ? 'Available' : 'Not Available'}</li>
        ))}
      </ul>
    </div>
  );
};

export default VehicleManagement;
