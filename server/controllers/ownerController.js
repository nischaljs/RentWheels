const { handleErrors } = require("../middlewares/errorHandler");
const ownerService = require('../services/ownerService');

exports.getVehicles = async (req, res) => {
    try {
        
        const vehicles = await ownerService.getVehicles(req);
        res.status(200).json({ success: true, data: vehicles });
    } catch (error) {
        handleErrors(res, error);
    }
}


exports.getStats = async (req, res) => {
    try {
        const stats = await ownerService.getStats(req);
        res.status(200).json({ success: true, data: stats });
    } catch (error) {
        handleErrors(res, error);
    }
}


exports.getBookings = async (req, res) => {
    try {
        const bookings = await ownerService.getBookings(req);
        res.status(200).json({ success: true, data: bookings });
    } catch (error) {
        handleErrors(res, error);
    }
}

exports.getReviews = async (req, res) => {
    try {
        const reviews = await ownerService.getReviews(req);
        res.status(200).json({ success: true, data: reviews });
    } catch (error) {
        handleErrors(res, error);
    }
}