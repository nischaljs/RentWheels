const paymentService = require('../services/paymentService'); // Import your payment service
const handleErrors = require('../utils/handleErrors'); // Import your error handling utility

// Controller to create a new payment
exports.createPayment = async (req, res) => {
    try {
        const data = req.body;
        const userId = req.user.userId; 
        const payment = await paymentService.createPayment({ userId, ...data });
        console.log("just before sending response in payment we have",payment);
        res.status(201).json({ success: true, data: payment });
    } catch (error) {
        handleErrors(res, error);
    }
};

exports.verifyPayment = async (req, res) => {
    try {
        const data = req.body;
        console.log("data in verify payment",data);
        const payment = await paymentService.verifyPayment(data);
        console.log("payment in verify payment",payment);
        res.status(200).json({ success: true, data: payment });
    } catch (error) {
        handleErrors(res, error);
    }
};

// Controller to fetch payment details by payment ID
exports.getPaymentDetails = async (req, res) => {
    try {
        const paymentId = req.params.paymentId; 
        const payment = await paymentService.getPaymentDetails(paymentId);
        
        if (!payment) {
            return res.status(404).json({ success: false, message: 'Payment not found' });
        }
        
        res.status(200).json({ success: true, data: payment });
    } catch (error) {
        handleErrors(res, error);
    }
};

// Controller to fetch all payments for a user
exports.getUserPayments = async (req, res) => {
    try {
        const userId = req.params.userId; 
        const payments = await paymentService.getUserPayments(userId);
        res.status(200).json({ success: true, data: payments });
    } catch (error) {
        handleErrors(res, error);
    }
};

// Controller to refund a payment
exports.refundPayment = async (req, res) => {
    try {
        const paymentId = req.params.paymentId; 
        const refund = await paymentService.refundPayment(paymentId);

        if (!refund) {
            return res.status(404).json({ success: false, message: 'Payment not found or refund failed' });
        }
        
        res.status(200).json({ success: true, message: 'Payment refunded successfully', data: refund });
    } catch (error) {
        handleErrors(res, error);
    }
};
