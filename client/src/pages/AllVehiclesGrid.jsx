import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CarCard from '../components/Home/CarCard';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';

const baseUrl = import.meta.env.VITE_API_URL;

const AllVehiclesGrid = () => {
  const [cars, setCars] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const carsPerPage = 6;

  useEffect(() => {
    const fetchCars = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${baseUrl}/vehicles/available`, {
          params: {
            page: currentPage,
            limit: carsPerPage,
          },
        });
        const { data, paginationDetails } = response.data;
        setCars(data);
        setTotalPages(Math.ceil(paginationDetails.total / carsPerPage));
      } catch (error) {
        console.error('Error fetching cars:', error);
        setError('Failed to load vehicles. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, [currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (error) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center p-6 max-w-md mx-auto">
          <div className="text-red-500 text-lg font-medium mb-2">Oops!</div>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto mt-10 px-4 sm:px-6 lg:px-8 py-12" id="vehicles">
      {/* Section Header */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Available Vehicles</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Explore our collection of premium vehicles available for your next journey
        </p>
      </div>

      {loading ? (
        <div className="min-h-[400px] flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
        </div>
      ) : (
        <>
          {/* Cars Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {cars.map((car) => (
              <div key={car.id} className="transform transition duration-300 hover:-translate-y-1">
                <CarCard car={car} />
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 mt-8">
            {/* Previous Button */}
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="flex items-center px-6 py-3 border border-gray-300 rounded-full text-sm font-medium transition-all duration-200 
                       disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent
                       hover:bg-gray-50 hover:border-gray-400 disabled:hover:border-gray-300"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous
            </button>

            {/* Page Info */}
            <div className="flex items-center space-x-2 text-sm">
              <span className="px-4 py-2 rounded-lg bg-gray-100 font-medium text-gray-700">
                {currentPage}
              </span>
              <span className="text-gray-500">of</span>
              <span className="px-4 py-2 rounded-lg bg-gray-100 font-medium text-gray-700">
                {totalPages}
              </span>
            </div>

            {/* Next Button */}
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="flex items-center px-6 py-3 border border-gray-300 rounded-full text-sm font-medium transition-all duration-200
                       disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent
                       hover:bg-gray-50 hover:border-gray-400 disabled:hover:border-gray-300"
            >
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AllVehiclesGrid;