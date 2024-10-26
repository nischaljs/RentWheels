import React from 'react';
import VehicleProfileReviewItem from './VehicleProfileReviewItem';
import { useAuth } from '../../context/AuthContext';

const VehicleProfileReviews = ({ reviews }) => {
  const { user } = useAuth();
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-semibold">Customer Reviews</h2>
        <button
          disabled={user.role !== "USER"}
          className={`w-2/12 py-3 rounded-lg font-medium transition-colors ${user.role !== "USER" ? "bg-gray-400 text-gray-300 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
        >
          Write Review
        </button>
      </div>
      <div className="space-y-6">
        {reviews?.map((review) => (
          <VehicleProfileReviewItem key={review.id} review={review} />
        ))}
      </div>
    </div>
  )
};

export default VehicleProfileReviews;
