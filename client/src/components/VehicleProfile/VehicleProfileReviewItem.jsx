import React from 'react';
import { Star, User } from 'lucide-react';

const VehicleProfileReviewItem = ({ review }) => {
  const reviewDate = new Date(review.createdAt);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">
              {review.user?.fullName}
            </h3>
            <p className="text-sm text-gray-500">
              {reviewDate.toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          {Array.from({ length: review.rating }, (_, index) => (
            <Star key={index} className="w-5 h-5 text-yellow-400" />
          ))}
        </div>
      </div>
      <p className="text-gray-700 leading-relaxed">{review.comment}</p>
    </div>
  );
};

export default VehicleProfileReviewItem;