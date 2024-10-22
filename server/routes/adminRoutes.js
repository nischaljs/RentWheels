const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const adminController = require('../controllers/adminController');
const router = express.Router();

// Middleware to check if user is admin
router.use(authMiddleware("ADMIN"));

// Get all users
router.get('/users', adminController.getAllUsers);

// Get all vehicles
router.get('/vehicles', adminController.getAllVehicles);

// Get all bookings
router.get('/bookings', adminController.getAllBookings);

// Approve a vehicle
router.patch('/vehicles/:id/approve', adminController.approveVehicle);

// Reject a vehicle
router.patch('/vehicles/:id/reject', adminController.rejectVehicle);

// Delete a user
router.delete('/users/:id', adminController.deleteUser);

module.exports = router;
