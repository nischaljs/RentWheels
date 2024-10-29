const prisma = require("../prismaClient"); 
const CustomError = require('../utils/customError'); 

const axios = require('axios');

// Controller to create a new payment

exports.createPayment = async ({ 
    userId, 
    amount, 
    purchase_order_id, 
    purchase_order_name, 
    return_url, 
    website_url, 
    customer_info 
}) => {
    console.log("=== Starting Payment Creation ===");
    let payment = null;

    try {
        // Validate required fields
        if (!userId || !amount || !purchase_order_id || !purchase_order_name || !customer_info) {
            throw new CustomError('Missing required parameters', 400);
        }

        console.log("** Creating pending payment record **");
        payment = await prisma.payment.create({
            data: {
                userId,
                amount,
                bookingId: purchase_order_id,
                status: 'PENDING',
                purchaseOrderId: purchase_order_id,
            },
            select: {
                id: true,
                amount: true,
                status: true,
                createdAt: true,
            }
        });
        console.log("** Payment record created **", payment);

        // Format amount to paisa (Khalti expects amount in paisa)
        const amountInPaisa = Math.round(amount * 100);
        
        // Validate customer info
        if (!customer_info.fullName || !customer_info.email || !customer_info.phone) {
            throw new CustomError('Invalid customer information', 400);
        }

        // Prepare Khalti API payload with validated data
        const khaltiPayload = {
            return_url: return_url,
            website_url: website_url,
            amount: amountInPaisa,
            purchase_order_id,
            purchase_order_name,
            customer_info: {
                name: customer_info.fullName,
                email: customer_info.email,
                phone: customer_info.phone
            }
        };

        console.log("** Khalti Payload **", JSON.stringify(khaltiPayload, null, 2));

        // Make request to Khalti API
        const khaltiResponse = await axios.post(
            'https://a.khalti.com/api/v2/epayment/initiate/',
            khaltiPayload,
            {
                headers: {
                    'Authorization': `Key ${process.env.KHALTI_SECRET_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        console.log("** Khalti API Response **", khaltiResponse.data);

        if (!khaltiResponse.data.payment_url || !khaltiResponse.data.pidx) {
            throw new CustomError('Invalid response from Khalti', 400);
        }

        // Update payment record with Khalti details
        const updatedPayment = await prisma.payment.update({
            where: { id: payment.id },
            data: {
                paymentUrl: khaltiResponse.data.payment_url,
                pidx: khaltiResponse.data.pidx,
            }
        });

        console.log("** Payment record updated with Khalti details **", updatedPayment);
        console.log("=== Payment Creation Successful ===",khaltiResponse.data.payment_url, payment.id);

        return {
            paymentInitiationUrl: khaltiResponse.data.payment_url,
            paymentId: payment.id
        };

    } catch (error) {
        console.error("=== Payment Creation Error ===");
        console.error("Error Type:", error.constructor.name);
        console.error("Error Message:", error.message);
        
        if (error.response) {
            console.error("Khalti API Error Response:", {
                status: error.response.status,
                data: error.response.data,
                headers: error.response.headers
            });
        }

        // Handle failed payment record
        if (payment?.id) {
            try {
                await prisma.payment.update({
                    where: { id: payment.id },
                    data: { 
                        status: 'FAILED',
                    }
                });
                console.log("** Payment record marked as FAILED **");
            } catch (updateError) {
                console.error("Failed to update payment status:", updateError);
            }
        }

        // Specific error handling based on the error type
        if (error.response?.status === 400) {
            throw new CustomError(
                `Khalti validation failed: ${error.response.data?.detail || error.message}`,
                400
            );
        } else if (error.code === 'ECONNREFUSED') {
            throw new CustomError('Unable to connect to Khalti service', 503);
        } else if (error instanceof CustomError) {
            throw error;
        } else {
            throw new CustomError('Payment processing failed', 500);
        }
    }
};


// Callback Function for Khalti Payment Verification
exports.verifyPayment = async ({ pidx, transaction_id,purchase_order_id }) => {
    console.log("verifyPayment callaback reached purchase order id", pidx, transaction_id ,purchase_order_id);
    try {
        // Step 5: Verify the payment status from Khalti (assumes Khalti calls this route after payment completion)
        const verifyResponse = await axios.post(`${process.env.KHALTI_API}/epayment/lookup/`, { pidx }, {
            headers: {
                'Authorization': `Key ${process.env.KHALTI_SECRET_KEY}`,
                'Content-Type': 'application/json',
            }
        });
        console.log("verifyResponse", verifyResponse.data);

        if (verifyResponse.data.status === 'Completed') {
            // Step 6: Update the payment status to COMPLETED
            const updatedPayment = await prisma.payment.update({
                where: { 
                    purchaseOrderId:purchase_order_id
                 },
                data: {
                    status: 'COMPLETED',
                    transactionId: transaction_id,  // Store transactionId for record
                    updatedAt: new Date(),
                }
            });
            console.log("updatedPayment backend", updatedPayment);
            return updatedPayment;
        } else {
            throw new CustomError('Payment verification failed', 400);
        }
    } catch (error) {
        console.error('Payment verification error:', error);
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