const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const reviewController = require('../controllers/reviewController');
const router = express.Router();

// Give a review
router.post('/give-review', authMiddleware("USER"), reviewController.postReview);

//Get all reviews for a specific vehicle
router.get('/vehicle/:vehicleId', reviewController.getVehicleReviews);

//Update a review by review ID
router.put('/update-review/:reviewId', authMiddleware("USER"), reviewController.updateReview);

//Get average rating for a specific vehicle
router.get('/vehicle/:vehicleId/average-rating', reviewController.getAverageRating);

//Get all reviews by a specific user
router.get('/user/reviews', authMiddleware("USER"), reviewController.getUserReviews);

// Delete a review by review ID
router.delete('/delete-review/:reviewId', authMiddleware("USER"), reviewController.deleteReview);

module.exports = router;
