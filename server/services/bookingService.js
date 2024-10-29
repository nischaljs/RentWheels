const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create a new booking
exports.bookVehicle = async (bookingData) => {
    const { vehicleId, renterId, startDate, endDate, totalPrice, driverRequired, status } = bookingData;
    return await prisma.booking.create({
        data: {
            vehicleId,
            renterId,
            startDate,
            endDate,
            totalPrice,
            driverRequired,
            status
        }
    });
};

// Get all bookings of a user
exports.getAllUserBookings = async (userId) => {
    return await prisma.booking.findMany({
        where: {
            renterId: userId
        }
    });
};

// Get a booking by id
exports.getBookingById = async (id) => {
    return await prisma.booking.findUnique({
        where: {
            id
        },
        include:{
            vehicle:true
        }
    });
};

// Cancel a booking
exports.cancelBooking = async (id) => {
    return await prisma.booking.update({
        where: {
            id
        },
        data: {
            status: 'CANCELLED'
        }
    });
};          
