const prisma = require("../prismaClient"); 
const CustomError = require('../utils/customError'); 

const axios = require('axios');

// Controller to create a new payment

exports.createPayment = async ({ userId, amount, bookingId, token }) => {
    try {
        // First, create a pending payment record
        const payment = await prisma.payment.create({
            data: {
                userId,
                amount,
                bookingId,
                status: 'PENDING', 
            },
            select: {
                id: true,
                amount: true,
                status: true,
                createdAt: true,
            }
        });

        // Now verify the payment with Khalti
        const response = await axios.post('https://khalti.com/api/v2/payment/verify/', {
            token: token,
            amount: amount * 100,  // Khalti expects the amount in paisa 
        }, {
            headers: {
                Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`
            }
        });

        // Check if the payment is successful
        if (response.data.state.name === 'Completed') {
            // Update payment status to 'COMPLETED' after successful verification
            const updatedPayment = await prisma.payment.update({
                where: { id: payment.id },
                data: { status: 'COMPLETED' }
            });

            return updatedPayment;
        } else {
            throw new CustomError('Payment verification failed', 400);
        }
    } catch (error) {
        console.error('Payment creation error:', error);
        throw new CustomError('Khalti payment verification failed', 500);
    }
};

// Service to fetch payment details by payment ID
exports.getPaymentDetails = async (paymentId) => {
    const payment = await prisma.payment.findUnique({
        where: { id: paymentId },
        select: {
            id: true,
            amount: true,
            status: true,
            createdAt: true,
            updatedAt: true,
            user: { select: { fullName: true } }, 
        }
    });

    if (!payment) {
        throw new CustomError('Payment not found', 404);
    }

    return payment;
};


exports.getUserPayments = async (userId) => {
    const payments = await prisma.payment.findMany({
        where: { userId },
        select: {
            id: true,
            amount: true,
            status: true,
            createdAt: true,
        }
    });
    return payments;
};

// Service to process a refund for a payment
exports.refundPayment = async (paymentId) => {
    try {
        // Fetch the payment from the database
        const payment = await prisma.payment.findUnique({
            where: { id: paymentId }
        });

        if (!payment) {
            throw new CustomError('Payment not found', 404);
        }

        if (payment.status !== 'COMPLETED') {
            throw new CustomError('Cannot refund a payment that is not completed', 400);
        }

        // Call Khalti's refund API
        const refundResponse = await axios.post('https://khalti.com/api/v2/payment/refund/', {
            token: payment.token,  // Assuming you saved the token when the payment was created
            amount: payment.amount * 100  // Amount in paisa
        }, {
            headers: {
                Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`
            }
        });

        if (refundResponse.data.state.name === 'Refunded') {
            // Update the payment status to 'REFUNDED'
            const updatedPayment = await prisma.payment.update({
                where: { id: paymentId },
                data: { status: 'REFUNDED' }
            });

            return updatedPayment;
        } else {
            throw new CustomError('Refund failed', 400);
        }

    } catch (error) {
        console.error('Refund process failed:', error);
        throw new CustomError('Khalti refund process failed', 500);
    }
};