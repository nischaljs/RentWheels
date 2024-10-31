import React, { useState } from 'react';
import api from '../services/api';
import { X } from 'lucide-react';

const VehicleUploadForm = ({ isOpen, onClose }) => {
  const [vehicleData, setVehicleData] = useState({
    name: '',
    type: '',
    seater: '',
    transmission: 'AUTOMATIC', // Default value
    pricePerDay: '',
    driverAvailable: false,
    available: true,
  });
  const [vehicleImage, setVehicleImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setVehicleData({
      ...vehicleData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setVehicleImage(file);

    // Create image preview
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('vehicleImage', vehicleImage);

    // Convert types to match backend expectations
    formData.append('name', vehicleData.name);
    formData.append('type', vehicleData.type);
    formData.append('seater', Number(vehicleData.seater)); 
    formData.append('transmission', vehicleData.transmission); 
    formData.append('pricePerDay', Number(vehicleData.pricePerDay));
    formData.append('driverAvailable', vehicleData.driverAvailable); 
    formData.append('available', vehicleData.available); 

    try {
      const response = await api.post(`/vehicles/add`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      setVehicleData({
        name: '',
        type: '',
        seater: '',
        transmission: 'AUTOMATIC', // Default value
        pricePerDay: '',
        driverAvailable: false,
        available: true,
      })
      onClose();
    } catch (error) {
      console.error('Error uploading vehicle:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed w-full h-full -top-6 inset-0 flex items-start justify-center py-4 bg-black bg-opacity-50 z-50">
      <div className="flex bg-white rounded-lg shadow-lg w-full max-w-4xl p-6 relative">
      <X onClick={onClose} className="absolute top-4 right-4 cursor-pointer" />
        {/* Form Section */}
        <div className="w-2/3 pr-6">
          <h2 className="text-2xl font-bold mb-4 text-center">Upload Vehicle</h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-2">
              <label className="block text-gray-700 mb-1" htmlFor="name">Vehicle Name</label>
              <input
                type="text"
                name="name"
                id="name"
                className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="Enter vehicle name"
                value={vehicleData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-2">
              <label className="block text-gray-700 mb-1" htmlFor="type">Vehicle Type</label>
              <input
                type="text"
                name="type"
                id="type"
                className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="E.g. SUV, Sedan, etc."
                value={vehicleData.type}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-2">
              <label className="block text-gray-700 mb-1" htmlFor="seater">Seater Capacity</label>
              <input
                type="number"
                name="seater"
                id="seater"
                className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="Number of seats"
                value={vehicleData.seater}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-2">
              <label className="block text-gray-700 mb-1" htmlFor="transmission">Transmission</label>
              <select
                name="transmission"
                id="transmission"
                className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring focus:ring-blue-300"
                value={vehicleData.transmission}
                onChange={handleChange}
                required
              >
                <option value="AUTOMATIC">Automatic</option>
                <option value="MANUAL">Manual</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1" htmlFor="pricePerDay">Price Per Day</label>
              <input
                type="number"
                name="pricePerDay"
                id="pricePerDay"
                className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="Enter price per day"
                value={vehicleData.pricePerDay}
                onChange={handleChange}
                required
              />
            </div>
            <div className='flex items-center justify-start gap-6 mb-4'>
            <div className="flex items-center">
              <label className="block text-gray-700 mr-2" htmlFor="driverAvailable">Driver Available</label>
              <input
                type="checkbox"
                name="driverAvailable"
                id="driverAvailable"
                checked={vehicleData.driverAvailable}
                onChange={handleChange}
                className="w-4 h-4 border-gray-300 rounded"
              />
            </div>
            <div className="flex items-center justify-center">
              <label className="block text-gray-700 mr-2" htmlFor="available">Available</label>
              <input
                type="checkbox"
                name="available"
                id="available"
                checked={vehicleData.available}
                onChange={handleChange}
                className="w-4 h-4 border-gray-300 rounded"
              />
            </div>
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 mb-1" htmlFor="vehicleImage">Upload Vehicle Image</label>
              <input
                type="file"
                name="vehicleImage"
                id="vehicleImage"
                accept="image/*"
                onChange={handleImageChange}
                required
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border file:border-gray-300 file:text-sm file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
              />
            </div>
            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Upload Vehicle
              </button>
            </div>
          </form>
        </div>

        {/* Image Preview Section */}
        <div className="w-1/3 border-l pl-6 flex flex-col items-center justify-center">
          <h3 className="text-xl font-semibold mb-4">Image Preview</h3>
          {imagePreview ? (
            <div className="w-full h-64 flex items-center justify-center border rounded-lg overflow-hidden">
              <img 
                src={imagePreview} 
                alt="Vehicle Preview" 
                className="max-w-full max-h-full object-contain"
              />
            </div>
          ) : (
            <div className="w-full h-64 flex items-center justify-center border rounded-lg bg-gray-100 text-gray-500">
              No image selected
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VehicleUploadForm;