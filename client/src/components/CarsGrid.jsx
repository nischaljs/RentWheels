import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CarCard from './CarCard';

const baseUrl = import.meta.env.VITE_API_URL;

const CarsGrid = () => {
  const [cars, setCars] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const carsPerPage = 6; // Number of cars to fetch per page

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get(`${baseUrl}/vehicles/available`, {
          params: {
            page: currentPage,
            limit: carsPerPage, // Number of cars per page
          },
        });

        const { data, paginationDetails } = response.data;
        setCars(data);
        console.log(data);
        
        setTotalPages(Math.ceil(paginationDetails.total / carsPerPage)); // Calculate total pages based on backend response
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    };

    fetchCars();
  }, [currentPage]); // Re-fetch cars when currentPage changes

  // Pagination handlers
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="w-full">
      {/* Cars Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-2 p-6">
        {cars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center space-x-4 mt-6">
        {/* Previous Button */}
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded ${
            currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          Previous
        </button>

        {/* Page Info */}
        <span className="text-gray-700">
          Page {currentPage} of {totalPages}
        </span>

        {/* Next Button */}
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded ${
            currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CarsGrid;
