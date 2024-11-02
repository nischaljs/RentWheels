import {
  AlertCircle,
  Calendar,
  Car,
  Clock,
  MessageSquare,
  MessageSquareX,
  Star,
  User
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
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
            className={`w-5 h-5 transition-colors ${
              index < rating 
                ? "fill-yellow-400 text-yellow-400" 
                : "fill-gray-200 text-gray-200"
            }`}
          />
        ))}
        <span className="ml-2 text-sm font-medium text-gray-600">
          {rating}/5
        </span>
      </div>
    );
  };

  const getRatingColor = (rating) => {
    if (rating >= 4) return 'bg-green-50 text-green-700 border-green-200';
    if (rating >= 3) return 'bg-yellow-50 text-yellow-700 border-yellow-200';
    return 'bg-red-50 text-red-700 border-red-200';
  };

  const LoadingState = () => (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <Clock className="w-12 h-12 text-blue-600 animate-spin" />
        <p className="text-gray-600 font-medium">Loading reviews...</p>
      </div>
    </div>
  );

  const ErrorState = () => (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-red-600 space-y-4">
      <AlertCircle className="w-16 h-16" />
      <p className="text-lg font-medium">{error}</p>
      <button 
        onClick={() => window.location.reload()}
        className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
      >
        Try Again
      </button>
    </div>
  );

  const EmptyState = () => (
    <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-6 p-8">
      <div className="relative animate-bounce">
        <MessageSquareX className="w-20 h-20 text-gray-300" />
        <Star className="w-10 h-10 text-yellow-400 absolute -top-2 -right-2 fill-yellow-400" />
      </div>
      <div className="text-center space-y-2">
        <h3 className="text-2xl font-bold text-gray-700">No Reviews Yet</h3>
        <p className="text-gray-500 max-w-md">
          Your vehicles haven't received any reviews yet. When customers leave reviews for your vehicles, they'll appear here.
        </p>
      </div>
    </div>
  );

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState />;
  if (reviews.length === 0) return <EmptyState />;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center space-x-4 mb-8">
        <div className="bg-blue-100 p-3 rounded-lg">
          <MessageSquare className="w-8 h-8 text-blue-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Review Management</h2>
          <p className="text-gray-500">Managing {reviews.length} customer reviews</p>
        </div>
      </div>

      <div className="grid gap-6">
        {reviews.map(review => (
          <div 
            key={review.id}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 transition-all hover:shadow-lg"
          >
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-lg ${getRatingColor(review.rating)}`}>
                    <Car className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {review.vehicle?.name || 'Vehicle Name'}
                    </h3>
                    <div className="flex items-center space-x-2 text-gray-500 text-sm mt-1">
                      <User className="w-4 h-4" />
                      <span>{review.user?.fullName}</span>
                      <span>•</span>
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(review.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}</span>
                    </div>
                  </div>
                </div>
                <StarRating rating={review.rating} />
              </div>

              {/* Review Content */}
              <div className="pl-14">
                <p className="text-gray-600 whitespace-pre-wrap">{review.comment}</p>
              </div>

             
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewManagement;