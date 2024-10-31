const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const paymentController = require('../controllers/paymentController'); 
const router = express.Router();

// Route to initiate a payment
router.post('/create', authMiddleware("USER"), paymentController.createPayment);

// Route to fetch payment details by payment ID
router.get('/:paymentId', authMiddleware("USER"), paymentController.getPaymentDetails);

router.post('/verify-payment', paymentController.verifyPayment);

// Route to fetch all payments for a user
router.get('/user/getpaymentDetails', authMiddleware("USER"), paymentController.getUserPayments);

// Route to refund a payment
router.post('/refund/:paymentId', authMiddleware("USER"), paymentController.refundPayment);

module.exports = router;
