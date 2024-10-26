import React from 'react';
import { Star } from 'lucide-react';

const VehicleProfileReviewItem = ({ review }) => (
  <div className="bg-gray-50 rounded-xl p-6">
    <div className="flex justify-between items-start mb-4">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
          <User className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h3 className="font-semibold">{review.user?.fullName}</h3>
          <p className="text-sm text-gray-500">
            {new Date(review.createdAt).toLocaleDateString()}
            </p>
          <p className="text-sm text-gray-500">
            {new Date(review.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
      <div className="flex items-center">
        {Array.from({ length: review.rating }, (_, index) => (
          <Star key={index} className="w-4 h-4 text-yellow-400" />
        ))}
      </div>
    </div>
    <p className="text-gray-700">{review.comment}</p>
  </div>
);

export default VehicleProfileReviewItem;
