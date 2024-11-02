import React, { useEffect, useState } from 'react';
import { MessageSquare, Star, Clock, AlertCircle, User, Car, Calendar, MessageSquareX } from 'lucide-react';
import api from '../../services/api';

const ReviewManagement = () => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setIsLoading(true);
        const response = await api.get('/owner/reviews');
        setReviews(response.data.data);
        setError(null);
      } catch (error) {
        console.error('Error fetching reviews:', error);
        setError('Failed to load reviews. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchReviews();
  }, []);

  const StarRating = ({ rating }) => {
    return (
      <div className="flex items-center space-x-1">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            className={`w-4 h-4 ${
              index < rating 
                ? "fill-yellow-400 text-yellow-400" 
                : "fill-gray-200 text-gray-200"
            }`}
          />
        ))}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin">
          <Clock className="w-8 h-8 text-blue-600" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-red-600 space-y-4">
        <AlertCircle className="w-12 h-12" />
        <p className="text-lg font-medium">{error}</p>
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4 p-8">
        <div className="relative">
          <MessageSquareX className="w-16 h-16 text-gray-300" />
          <Star className="w-8 h-8 text-yellow-400 absolute -top-2 -right-2 fill-yellow-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-700">No Reviews Yet</h3>
        <p className="text-gray-500 text-center max-w-md">
          Your vehicles haven't received any reviews yet. When customers leave reviews for your vehicles, they'll appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center space-x-3 mb-8">
        <MessageSquare className="w-8 h-8 text-blue-600" />
        <h2 className="text-2xl font-semibold text-gray-800">Review Management</h2>
        <span className="text-gray-500">({reviews.length})</span>
      </div>

      <div className="grid gap-4">
        {reviews.map(review => (
          <div 
            key={review.id}
            className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 transition-all hover:shadow-md"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center space-x-4">
                  <Car className="w-6 h-6 text-gray-500" />
                  <div>
                    <h3 className="font-medium text-gray-900">{review.vehicleName}</h3>
                    <div className="flex items-center space-x-2 text-gray-500 text-sm">
                      <User className="w-4 h-4" />
                      <span>{review.userName}</span>
                      <span>•</span>
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(review.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                <StarRating rating={review.rating} />
              </div>

              <div className="pl-10">
                <p className="text-gray-600 whitespace-pre-wrap">{review.comment}</p>
              </div>

              <div className="pl-10 flex justify-end">
                <button 
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  onClick={() => {/* Handle response */}}
                >
                  Respond to Review
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewManagement;