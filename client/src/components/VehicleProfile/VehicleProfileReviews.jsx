import React, { useState } from 'react';
import VehicleProfileReviewItem from './VehicleProfileReviewItem';
import { useAuth } from '../../context/AuthContext';
import VehicleReviewForm from './VehicleReviewForm';

const VehicleProfileReviews = ({ reviews,vehicle }) => {
  const[isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const { user } = useAuth();

  const handleReviewModalToggle =  () => {
    setIsReviewModalOpen(!isReviewModalOpen);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-semibold">Customer Reviews</h2>
        <button
          disabled={user.role !== "USER" || isReviewModalOpen}
          className={`w-2/12 py-3 rounded-lg font-medium transition-colors ${user.role !== "USER" || isReviewModalOpen ? "bg-gray-400 text-gray-300 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
            onClick={handleReviewModalToggle}
        >
          Write Review
        </button>
      </div>
      {isReviewModalOpen && (
        <VehicleReviewForm vehicle={vehicle} user={user} onClose={handleReviewModalToggle}/>)
        }
      <div className="space-y-6 h-[60vh] overflow-y-scroll">
        {reviews?.map((review) => (
          <VehicleProfileReviewItem key={review.id} review={review} />
        ))}
      </div>
    </div>
  )
};

export default VehicleProfileReviews;
