// ReviewAndRatings.jsx
import React from 'react';
import { FaStar } from 'react-icons/fa';

const ReviewAndRatings = ({ reviews }) => {
  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Your Reviews</h2>
      <ul>
        {reviews.map(review => (
          <li key={review.id} className="border-b py-4 px-4">
            <div className="flex items-center mb-2">
              {[...Array(review.rating)].map((_, index) => (
                <FaStar key={index} className="text-yellow-500" />
              ))}
              {[...Array(5 - review.rating)].map((_, index) => (
                <FaStar key={index} className="text-gray-300" />
              ))}
            </div>
            <p className="text-sm text-gray-700">{review.comment}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReviewAndRatings;
