import React from 'react';
import { Star, Calendar, Clock, ThumbsUp } from 'lucide-react';

const UserReviewAndRatings = ({ reviews }) => {
  // Function to format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Calculate average rating
  const averageRating = reviews.length 
    ? (reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length).toFixed(1)
    : 0;

  return (
    <div className="bg-white rounded-lg h-[60vh] overflow-y-scroll">
      {/* Header Section */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Your Reviews</h2>
          <div className="flex items-center space-x-2 bg-blue-50 px-3 py-1 rounded-full">
            <Star className="w-4 h-4 text-blue-600 fill-current" />
            <span className="text-blue-600 font-medium">{averageRating} Average</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <div className="flex items-center">
            <ThumbsUp className="w-4 h-4 mr-2" />
            <span>{reviews.length} Reviews</span>
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-2" />
            <span>Last 30 days</span>
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="divide-y divide-gray-100">
        {reviews.map((review) => (
          <div key={review.id} className="p-6 transition duration-150 hover:bg-gray-50">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  {review.vehicle?.name || review.vehicleName}
                </h3>
                <div className="flex items-center space-x-2 mt-1">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-500">
                    {formatDate(review.createdAt)}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    className={`w-5 h-5 ${
                      index < review.rating
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-200 fill-current'
                    }`}
                  />
                ))}
              </div>
            </div>

            {review.comment && (
              <div className="mt-3">
                <p className="text-gray-600 text-sm leading-relaxed">
                  {review.comment}
                </p>
              </div>
            )}
            
            {/* Tags/Metadata */}
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700">
                Verified Rental
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                {review.vehicle?.type || 'Vehicle Review'}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {reviews.length === 0 && (
        <div className="p-6 text-center">
          <div className="text-gray-400 mb-2">
            <Star className="w-12 h-12 mx-auto mb-2" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">No reviews yet</h3>
          <p className="text-gray-500">Your reviews will appear here after you complete rentals.</p>
        </div>
      )}
    </div>
  );
};

export default UserReviewAndRatings;