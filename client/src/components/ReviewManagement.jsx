import React, { useEffect, useState } from 'react';
import api from '../services/api';

const ReviewManagement = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        // Fetch reviews from the server
        const response = await api.get('/owner/reviews');
        console.log('Reviews:', response.data.data);
        setReviews(response.data.data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div>
      <h2>Review Management</h2>
      <ul>
        {reviews.map(review => (
          <li key={review.id}>{review.vehicleName} - Rating: {review.rating} - {review.comment}</li>
        ))}
      </ul>
    </div>
  );
};

export default ReviewManagement;
