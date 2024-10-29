import React, { useState } from 'react';
import { Star, AlertCircle, X } from 'lucide-react';
import api from '../../services/api';
import NotifyToast from '../ui/NotifyToast';

const Button = ({ children, className, ...props }) => (
  <button
    className={`px-4 py-2 rounded-md text-white font-medium bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
    {...props}
  >
    {children}
  </button>
);

const Textarea = ({ className, ...props }) => (
  <textarea
    className={`px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
    {...props}
  />
);

const VehicleReviewForm = ({ user, vehicle, onClose }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  const [showToast, setShowToast] = useState(false);

  const handleShowToast = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (rating === 0) {
      setError('Please provide a rating.');
      return;
    }

    try {
      const response = await api.post('reviews/give-review', {
        vehicleId: vehicle.id,
        rating,
        comment,
      });

      if (!response.data.success) {
        setError('There was an error submitting your review. Please try again later.');
        return;
      }
      handleShowToast();

      // Reset form after successful submission
      setRating(0);
      setComment('');
      setError('');
    } catch (err) {
      setError('There was an error submitting your review. Please try again later.');
    }
  };

  const handleRatingClick = (value) => {
    setRating(value);
    setError('');
  };

  return (
    <div className="bg-white shadow-md rounded-md p-6 relative">
      <h3 className="text-xl font-bold mb-4">Share Your Experience with {vehicle.name}</h3>
      <X
        size={24}
        className="absolute top-4 right-4 cursor-pointer hover:text-gray-600 focus:outline-none"
        onClick={onClose}
      />

      {/* Warning Message */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
        <div className="flex items-center">
          <AlertCircle className="w-5 h-5 text-yellow-600 mr-2" />
          <p className="text-sm text-yellow-700">
            Please provide respectful, constructive feedback. Avoid using inappropriate language, and focus on your experience with the vehicle.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center space-x-2">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              type="button"
              className={`p-2 rounded-full focus:outline-none hover:scale-110 transition-transform ${
                value <= rating ? 'bg-yellow-400 hover:bg-yellow-500' : 'bg-gray-200 hover:bg-gray-300'
              }`}
              onClick={() => handleRatingClick(value)}
            >
              <Star size={24} className={`${value <= rating ? 'text-white' : 'text-gray-400'}`} />
            </button>
          ))}
          <span className="text-gray-600">{rating} out of 5</span>
        </div>

        <Textarea
          placeholder="Leave a review..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={3}
          className="w-full resize-none"
        />

        {error && (
          <div className="flex items-center text-red-500">
            <AlertCircle size={20} className="mr-2" />
            {error}
          </div>
        )}

        <Button type="submit" className="w-full">
          Submit Review
        </Button>
      </form>

      {showToast && (
        <NotifyToast
          type="success"
          message="Review submitted successfully!"
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
};

export default VehicleReviewForm;
