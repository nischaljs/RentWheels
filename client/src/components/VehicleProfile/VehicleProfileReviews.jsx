import React, { useState } from 'react';
import { MessageSquare, MessageSquarePlus, Stars } from 'lucide-react';
import VehicleProfileReviewItem from './VehicleProfileReviewItem';
import { useAuth } from '../../context/AuthContext';
import VehicleReviewForm from './VehicleReviewForm';

const VehicleProfileReviews = ({ reviews, vehicle }) => {
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const { user } = useAuth();

  const handleReviewModalToggle = () => {
    setIsReviewModalOpen(!isReviewModalOpen);
  };

  const WriteReviewButton = () => (
    <button
      disabled={isReviewModalOpen || user?.role != "USER"}
      className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-medium transition-colors ${
        isReviewModalOpen || user?.role != "USER"
          ? "bg-gray-400 text-gray-300 cursor-not-allowed"
          : "bg-blue-600 text-white hover:bg-blue-700"
      }`}
      onClick={handleReviewModalToggle}
    >
      <MessageSquarePlus className="w-5 h-5" />
      <span>Write Review</span>
    </button>
  );

  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center h-[40vh] space-y-4 bg-gray-50 rounded-lg p-8">
      <div className="relative">
        <MessageSquare className="w-16 h-16 text-gray-300" />
        <Stars className="w-8 h-8 text-yellow-400 absolute -top-2 -right-2" />
      </div>
      <h3 className="text-xl font-semibold text-gray-700">No Reviews Yet</h3>
      <p className="text-gray-500 text-center max-w-md">
        {`Be the first to share your experience with this ${vehicle.name}. Your review helps others make informed decisions.`}
      </p>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <MessageSquare className="w-6 h-6 text-gray-600" />
          <h2 className="text-2xl font-semibold">Customer Reviews</h2>
          <span className="text-gray-500">({reviews.length})</span>
        </div>
        
     <WriteReviewButton />
      </div>

      {isReviewModalOpen && (
        <VehicleReviewForm 
          vehicle={vehicle} 
          user={user} 
          onClose={handleReviewModalToggle}
        />
      )}

      {reviews.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="space-y-6 h-[60vh] overflow-y-auto pr-4">
          {reviews.map((review) => (
            <VehicleProfileReviewItem key={review.id} review={review} />
          ))}
        </div>
      )}
    </div>
  );
};

export default VehicleProfileReviews;