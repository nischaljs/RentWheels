import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ReviewManagement = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        // Uncomment the line below to fetch data from the API
        // const response = await axios.get('/api/reviews');
        // setReviews(response.data);

        // Sample data for now
        const sampleReviews = [
          { id: 1, vehicleName: 'Tesla Model X', rating: 5, comment: 'Great experience!' },
          { id: 2, vehicleName: 'Land Rover Defender', rating: 4, comment: 'Very comfortable.' },
        ];
        setReviews(sampleReviews);
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
