import React from 'react';

const OwnerDocumentUploadPopup = ({ vehicleId, onClose }) => {
  return (
    <div className="bg-white rounded-lg p-6">
      <h2 className="text-lg font-bold mb-4">Upload Documents</h2>
      {/* Implement file upload logic here */}
      <button onClick={onClose} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Close</button>
    </div>
  );
};

export default OwnerDocumentUploadPopup;
