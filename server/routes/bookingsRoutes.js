const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const bookingController = require('../controllers/bookingController');
const router = express.Router();

router.get('/bookings',authMiddleware("USER"),bookingController.getAllUserBookings);
router.get('/bookings/:id',authMiddleware("USER"),bookingController.getBookingById);

router.post('/bookings',authMiddleware("USER"),bookingController.bookVehicle);
router.put('/bookings/:id',authMiddleware("USER"),bookingController.updateBooking);
router.delete('/bookings/:id',authMiddleware("USER"),bookingController.cancelBooking);

//route that admin can use to cancel/ reject the booking 
router.put('/bookings/cancel/:id',authMiddleware("ADMIN"),bookingController.cancelBooking);


module.exports = router;