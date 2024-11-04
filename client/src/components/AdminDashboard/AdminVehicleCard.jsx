import React, { useState } from 'react';
import { 
  FileText, 
  Check, 
  X, 
  Car, 
  Users, 
  Settings, 
  DollarSign,
  Loader2,
  Calendar,
  Banknote
} from 'lucide-react';

import api from '../../services/api';
import NotifyToast from '../ui/NotifyToast';

const AdminVehicleCard = ({ vehicle }) => {
  const [documents, setDocuments] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isApproving, setIsApproving] = useState(false);
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [toastType, setToastType] = useState('success');
  const [toastMessage, setToastMessage] = useState('');

  const fetchDocuments = async (vehicleId) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.get(`/documents/vehicle/${vehicleId}`);
      setDocuments(response.data.data);
    } catch (err) {
      setError('Failed to fetch documents');
    } finally {
      setIsLoading(false);
    }
  };

  const handleApproval = async (vehicleId, isApprove) => {
    setIsApproving(true);
    try {
      await api.patch(`admin/vehicles/${vehicleId}/${isApprove ? 'approve' : 'reject'}`);
      showToast(isApprove ? 'success' : 'error', isApprove ? 'Vehicle approved successfully' : 'Vehicle rejected');
    } catch (err) {
      setError('Failed to update vehicle status');
      showToast('error', 'Failed to update vehicle status');
    } finally {
      setIsApproving(false);
    }
  };

  const showToast = (type, message) => {
    setToastType(type);
    setToastMessage(message);
    setIsToastVisible(true);
  };

  const handleToastClose = () => {
    setIsToastVisible(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Vehicle Image */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={`${import.meta.env.VITE_IMG_URL}${vehicle.image}`}
          alt={vehicle.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 px-3 py-1 bg-blue-500 text-white rounded-full text-sm">
          {vehicle.transmission}
        </div>
      </div>

      {/* Vehicle Info */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold text-gray-800">{vehicle.name}</h3>
          <span className="text-lg font-bold text-blue-600">
            <Banknote className="inline h-5 w-5" />
            रु. {vehicle.pricePerDay}/day
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex items-center text-gray-600">
            <Car className="h-5 w-5 mr-2" />
            <span>{vehicle.type}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Users className="h-5 w-5 mr-2" />
            <span>{vehicle.seater} Seats</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Settings className="h-5 w-5 mr-2" />
            <span>{vehicle.transmission}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Calendar className="h-5 w-5 mr-2" />
            <span>{new Date(vehicle.createdAt).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Owner Info */}
        <div className="border-t border-gray-200 pt-4 mb-4">
          <p className="text-sm text-gray-600">Owner: {vehicle.owner.fullName}</p>
          <p className="text-sm text-gray-600">Email: {vehicle.owner.email}</p>
        </div>

        {/* Documents Section */}
        <div className="border-t border-gray-200 pt-4">
          {!documents ? (
            <button
              onClick={() => fetchDocuments(vehicle.id)}
              className="w-full flex items-center justify-center px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  <FileText className="h-5 w-5 mr-2" />
                  View Documents
                </>
              )}
            </button>
          ) : (
            <div className="space-y-4">
              {documents.map((doc, index) => (
                <a
                  key={index}
                  href={`${import.meta.env.VITE_IMG_URL}${doc.fileUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                >
                  <FileText className="h-5 w-5 inline mr-2" />
                  {doc.type} {index + 1}
                </a>
              ))}

              {/* Approval Buttons */}
              <div className="flex gap-4 mt-4">
                <button
                  onClick={() => handleApproval(vehicle.id, true)}
                  disabled={isApproving}
                  className="flex-1 flex items-center justify-center px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors duration-200 disabled:opacity-50"
                >
                  {isApproving ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <>
                      <Check className="h-5 w-5 mr-2" />
                      Approve
                    </>
                  )}
                </button>
                <button
                  onClick={() => handleApproval(vehicle.id, false)}
                  disabled={isApproving}
                  className="flex-1 flex items-center justify-center px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-200 disabled:opacity-50"
                >
                  {isApproving ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <>
                      <X className="h-5 w-5 mr-2" />
                      Reject
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
          
          {error && (
            <p className="mt-2 text-sm text-red-500">{error}</p>
          )}
        </div>
      </div>

      {isToastVisible && (
        <NotifyToast
          type={toastType}
          message={toastMessage}
          duration={3000}
          onClose={handleToastClose}
        />
      )}
    </div>
  );
};

export default AdminVehicleCard;