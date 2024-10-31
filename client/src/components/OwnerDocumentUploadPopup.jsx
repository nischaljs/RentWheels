import React, { useEffect, useState } from 'react';
import { X, Upload, AlertTriangle, FileText, Check } from 'lucide-react';
import api from '../services/api';


const OwnerDocumentUploadPopup = ({ vehicleId, onClose }) => {
  const [documentType, setDocumentType] = useState('');
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [InputDisabled, setInputDisabled] = useState(false);

  const imageBaseUrl = import.meta.env.VITE_IMG_URL;

  useEffect(() => {
    const fetchVehicleDocuments = async () => {
      try {
        const response = await api.get(`/documents/vehicle/${vehicleId}`);
        

        if(response.data.success){
          setInputDisabled(true);
          setDocumentType(response.data.data[0].type);
          setPreviewUrl(`${imageBaseUrl}/${response.data.data[0].fileUrl}`);
        }

        
      } catch (error) {
        console.error('Failed to fetch vehicle documents:', error);
      }
    };

    fetchVehicleDocuments();  
  }, []);

  const documentTypes = [
    { value: 'bluebook', label: 'Vehicle Blue Book' },
    { value: 'insurance', label: 'Vehicle Insurance' },
    { value: 'permit', label: 'Commercial Vehicle Permit' },
    { value: 'emission', label: 'Emission Test Certificate' },
    { value: 'registration', label: 'Vehicle Registration' },
    { value: 'other', label: 'Other Government Approved Document' }
  ];

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !documentType) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('document', file);
    formData.append('documentType', documentType);
    formData.append('vehicleId', vehicleId);


    try {
      await api.post('/documents/upload', formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data', // This header is important
          },
        }
      );
      onClose();
    } catch (error) {
      console.error('Error uploading document:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg w-[500px] my-2 max-w-[95vw]">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-500" />
            <h2 className="text-xl font-semibold text-gray-800">Upload Vehicle Documents</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
      </div>

      {/* Important Instructions */}
      <div className="p-4 m-4 bg-amber-50 rounded-lg border border-amber-200">
        <div className="flex gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-amber-700">
            <p className="font-semibold mb-1">Important Instructions:</p>
            <ul className="list-disc ml-4 space-y-1">
              <li>Documents can only be uploaded once and can't be edited</li>
              <li>Vehicle Blue Book is the preferred document for verification</li>
              <li>All documents must be clear, legible and valid</li>
              <li>Documents should be in PDF, JPG, or PNG format (max 5MB)</li>
              <li>Ensure all information is clearly visible without any blur</li>
              <li>Expired documents will not be accepted</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Upload Form */}
      <form onSubmit={handleSubmit} className="p-6">
        {/* Document Type Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Document Type
          </label>
          <select
            value={documentType}
            onChange={(e) => setDocumentType(e.target.value)}
            disabled={InputDisabled}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            required
          >
            <option value="">Select document type</option>
            {documentTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        {/* File Upload Area */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload Document
          </label>
          <div className="relative">
            <input
              type="file"
              onChange={handleFileChange}
              accept=".pdf,.jpg,.jpeg,.png"
              className="hidden"
              id="document-upload"
              disabled={InputDisabled}
              required
            />
            <label
              htmlFor="document-upload"
              className={`flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer
                ${previewUrl ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:bg-gray-50'}`}
            >
              {previewUrl ? (
                <div className="relative w-full h-full">
                  <img
                    src={previewUrl}
                    alt="Document preview"
                    className="w-full h-full object-contain p-2"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <p className="text-white text-sm">Click to change file</p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-12 h-12 text-gray-400 mb-3" />
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">PDF, JPG, or PNG (max 5MB)</p>
                </div>
              )}
            </label>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!file || !documentType || isUploading || InputDisabled}
            className={`px-4 py-2 text-white rounded-lg transition-colors flex items-center gap-2
              ${isUploading || !file || !documentType 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-500 hover:bg-blue-600'}`}
          >
            {isUploading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Check className="w-4 h-4" />
                Upload Document
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default OwnerDocumentUploadPopup;