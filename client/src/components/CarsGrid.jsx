import React, { useState } from 'react';
import CarCard from './CarCard';

const CarsGrid = ({ cars }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const carsPerPage = 6; // Adjust the number of cars displayed per page

  // Calculate total number of pages
  const totalPages = Math.ceil(cars.length / carsPerPage);

  // Slice the cars array for the current page
  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = cars.slice(indexOfFirstCar, indexOfLastCar);

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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {currentCars.map((car) => (
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
