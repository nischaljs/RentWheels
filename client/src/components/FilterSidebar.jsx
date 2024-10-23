import React, { useState } from 'react';

const FilterSidebar = () => {
  // To manage toggle for each filter
  const [filters, setFilters] = useState({
    carType: false,
    seatingCapacity: false,
    gearTransmission: false,
    priceRange: false,
    brands: false,
  });

  // To handle the check state of each filter
  const [selectedFilters, setSelectedFilters] = useState({
    carType: { SUVs: true, SuperCars: false, Coupes: false, Convertibles: false, Sedans: false, Hatchbacks: false },
    seatingCapacity: { '2 Seater': false, '4 Seater': false, '6 Seater': false },
    // Add more categories as needed
  });

  // Toggle for collapsing sections
  const toggleFilter = (filter) => {
    setFilters({ ...filters, [filter]: !filters[filter] });
  };

  // Handle checkbox changes
  const handleCheckboxChange = (category, option) => {
    setSelectedFilters({
      ...selectedFilters,
      [category]: {
        ...selectedFilters[category],
        [option]: !selectedFilters[category][option],
      },
    });
  };

  return (
    <div className="w-64 min-h-full p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Filters</h2>

      {/* Filter for Car Type */}
      <div className="mb-6">
        <button
          className="w-full flex justify-between items-center py-3 text-lg text-gray-800 font-semibold hover:text-red-600 transition-colors"
          onClick={() => toggleFilter('carType')}
        >
          Car Type
          <span>{filters.carType ? '–' : '+'}</span>
        </button>
        {filters.carType && (
          <div className="pl-4 mt-3 space-y-3">
            {Object.keys(selectedFilters.carType).map((type) => (
              <div key={type} className="flex items-center">
                <input
                  type="checkbox"
                  id={type}
                  checked={selectedFilters.carType[type]}
                  onChange={() => handleCheckboxChange('carType', type)}
                  className="form-checkbox h-5 w-5 text-red-500 transition duration-150 ease-in-out"
                />
                <label htmlFor={type} className="ml-3 text-gray-700 text-lg">
                  {type}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Seating Capacity */}
      <div className="mb-6">
        <button
          className="w-full flex justify-between items-center py-3 text-lg text-gray-800 font-semibold hover:text-red-600 transition-colors"
          onClick={() => toggleFilter('seatingCapacity')}
        >
          Seating Capacity
          <span>{filters.seatingCapacity ? '–' : '+'}</span>
        </button>
        {filters.seatingCapacity && (
          <div className="pl-4 mt-3 space-y-3">
            {Object.keys(selectedFilters.seatingCapacity).map((capacity) => (
              <div key={capacity} className="flex items-center">
                <input
                  type="checkbox"
                  id={capacity}
                  checked={selectedFilters.seatingCapacity[capacity]}
                  onChange={() => handleCheckboxChange('seatingCapacity', capacity)}
                  className="form-checkbox h-5 w-5 text-red-500 transition duration-150 ease-in-out"
                />
                <label htmlFor={capacity} className="ml-3 text-gray-700 text-lg">
                  {capacity}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Gear Transmission */}
      <div className="mb-6">
        <button
          className="w-full flex justify-between items-center py-3 text-lg text-gray-800 font-semibold hover:text-red-600 transition-colors"
          onClick={() => toggleFilter('gearTransmission')}
        >
          Gear Transmission
          <span>{filters.gearTransmission ? '–' : '+'}</span>
        </button>
        {filters.gearTransmission && (
          <div className="pl-4 mt-3 space-y-3">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="automatic"
                className="form-checkbox h-5 w-5 text-red-500"
              />
              <label htmlFor="automatic" className="ml-3 text-gray-700 text-lg">
                Automatic
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="manual"
                className="form-checkbox h-5 w-5 text-red-500"
              />
              <label htmlFor="manual" className="ml-3 text-gray-700 text-lg">
                Manual
              </label>
            </div>
          </div>
        )}
      </div>

      {/* Add more filters as needed, following the same structure */}
    </div>
  );
};

export default FilterSidebar;
