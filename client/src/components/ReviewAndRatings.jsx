// Updated ReviewAndRatings Component

import { Star } from 'lucide-react';
import React from 'react';

const ReviewAndRatings = ({ reviews }) => {
  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Your Reviews</h2>
      <ul>
        {reviews.map((review) => (
          <li key={review.id} className="border-b py-4 px-4">
            <div className="flex justify-between">
              <p className="text-lg font-semibold">{review.vehicleName}</p>
              <div className="flex items-center">
                {[...Array(review.rating)].map((_, index) => (
                  <Star key={index} className="text-yellow-500" />
                ))}
                {[...Array(5 - review.rating)].map((_, index) => (
                  <Star key={index} className="text-gray-300" />
                ))}
              </div>
            </div>
            <p className="text-sm text-gray-700 mt-2">{review.comment}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReviewAndRatings;

