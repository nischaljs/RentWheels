const { reviewSchema } = require("../schemas/reviewSchemas");
const validateSchema = require("../utils/validateSchema");
const reviewService = require("../services/reviewService"); 
const handleErrors = require("../utils/handleErrors"); 

// Controller to post a review by a verified user
exports.postReview = async (req, res) => {
    try {
        const data = validateSchema(reviewSchema, req.body);
        const review = await reviewService.postReview(data, req.user.id); 
        res.status(201).json({ success: true, data: review });
    } catch (error) {
        handleErrors(res, error);
    }
};

// Controller to get all reviews for a specific vehicle
exports.getVehicleReviews = async (req, res) => {
    try {
        const { vehicleId } = req.params;
        const reviews = await reviewService.getVehicleReviews(vehicleId);
        res.status(200).json({ success: true, data: reviews });
    } catch (error) {
        handleErrors(res, error);
    }
};

// Controller to update a review by a verified user
exports.updateReview = async (req, res) => {
    try {
        const { reviewId } = req.params;
        const data = validateSchema(reviewSchema, req.body);
        const updatedReview = await reviewService.updateReview(reviewId, data);
        res.status(200).json({ success: true, data: updatedReview });
    } catch (error) {
        handleErrors(res, error);
    }
};

// Controller to get the average rating for a vehicle
exports.getAverageRating = async (req, res) => {
    try {
        const { vehicleId } = req.params;
        const averageRating = await reviewService.getAverageRating(vehicleId);
        res.status(200).json({ success: true, averageRating });
    } catch (error) {
        handleErrors(res, error);
    }
};

// Controller to get all reviews by a user
exports.getUserReviews = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming the user ID is stored in req.user
        const reviews = await reviewService.getUserReviews(userId);
        res.status(200).json({ success: true, data: reviews });
    } catch (error) {
        handleErrors(res, error);
    }
};

// Controller to delete a review by a verified user
exports.deleteReview = async (req, res) => {
    try {
        const { reviewId } = req.params;
        const userId = req.user.id; 
        const deletedReview = await reviewService.deleteReview(reviewId, userId);
        res.status(200).json({ success: true, message: "Review deleted successfully", data: deletedReview });
    } catch (error) {
        handleErrors(res, error);
    }
};
