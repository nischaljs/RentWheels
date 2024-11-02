// VehicleSearch.jsx
import React from 'react';

const VehicleSearch = ({ onSearch }) => {
  const handleSearch = (e) => {
    e.preventDefault();
    const query = e.target.elements.query.value;
    onSearch(query);
  };

  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Search Vehicles</h2>
      <form onSubmit={handleSearch} className="flex items-center">
        <input type="text" name="query" className="border p-2 flex-1 rounded-md" placeholder="Search for vehicles..." />
        <button type="submit" className="bg-blue-600 text-white p-2 ml-2 rounded-md hover:bg-blue-700 transition duration-300">Search</button>
      </form>
    </div>
  );
};

export default VehicleSearch;
