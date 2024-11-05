import React, { useState, useEffect } from 'react';
import { Search, Calendar, Clock } from 'lucide-react';
import api from '../services/api';
import CarCard from '../components/Home/CarCard';
import { Loader2 } from 'lucide-react';

const VehicleSearch = () => {
  const [searchParams, setSearchParams] = useState({
    date: '',
    timeFrom: '',
    timeTo: '',
  });
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get('/vehicles/available');
        setVehicles(response.data.data);
      }
      catch (error) {
        console.error('Failed to fetch vehicles:', error);
        setError('Failed to fetch vehicles. Please try again.');
      }
      finally {
        setLoading(false);
      }
    }
    fetchInitialData();
    },[]);



  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await api.get(`/vehicles/search`, {
        params: {
          date: searchParams.date,
          timeFrom: searchParams.timeFrom,
          timeTo: searchParams.timeTo
        }
      });
      console.log(response.data);
      setVehicles(response.data.data);
    } catch (error) {
      console.error('Search error:', error);
      setError('Failed to search vehicles. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mt-10 mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Search Form */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <form onSubmit={handleSearch} className="space-y-4 sm:space-y-0 sm:flex sm:space-x-4">
          <div className="flex-1">
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="date"
                value={searchParams.date}
                onChange={(e) => setSearchParams({ ...searchParams, date: e.target.value })}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>

          <div className="flex-1">
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="time"
                value={searchParams.timeFrom}
                onChange={(e) => setSearchParams({ ...searchParams, timeFrom: e.target.value })}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>

          <div className="flex-1">
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="time"
                value={searchParams.timeTo}
                onChange={(e) => setSearchParams({ ...searchParams, timeTo: e.target.value })}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
          >
            <Search className="h-5 w-5 inline-block mr-2" />
            Search
          </button>
        </form>
      </div>

      {/* Results Section */}
      {loading ? (
        <div className="min-h-[400px] flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
        </div>
      ) : error ? (
        <div className="text-center text-red-500 py-8">{error}</div>
      ) : vehicles.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {vehicles.map((vehicle) => (
            <div key={vehicle.id} className="transform transition duration-300 hover:-translate-y-1">
              <CarCard car={vehicle} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 py-8">
          {searchParams.date ? 'No vehicles available for the selected time slot.' : 'Search for available vehicles by selecting date and time.'}
        </div>
      )}
    </div>
  );
};

export default VehicleSearch;