const prisma = require("../prismaClient"); 
const CustomError = require('../utils/CustomError'); 

// Service to create a new payment
exports.createPayment = async ({ userId, amount, bookingId }) => {
   
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
    return payment;
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
    const payment = await prisma.payment.findUnique({
        where: { id: paymentId }
    });

    if (!payment) {
        throw new CustomError('Payment not found', 404);
    }

    
    const updatedPayment = await prisma.payment.update({
        where: { id: paymentId },
        data: { status: 'REFUNDED' } 
    });

    return updatedPayment;
};
