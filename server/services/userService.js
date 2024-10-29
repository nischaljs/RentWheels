const prisma = require('../prismaClient');
const CustomError = require('../utils/customError');


// Get a user's profile
exports.getProfile = async (userId) => {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            id: true,
            email: true,
            fullName: true,
            phone: true,
            role: true,
            vehicles: true,
            bookings: true,
            reviews: true,
            Payment: true,
        },
    });

    if (!user) {
        throw new CustomError('User not found');
    }

    return user;
};

// Update a user's profile
exports.updateProfile = async (userId, updateData) => {

    const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: updateData,
    });

    return updatedUser;
};

// Delete a user account
exports.deleteUser = async (userId) => {
    await prisma.user.delete({
        where: { id: userId },
    });
};

// Get all users (admin functionality)
exports.getAllUsers = async () => {

    const users = await prisma.user.findMany({
        select: {
            id: true,
            email: true,
            fullName: true,
            phone: true,
            role: true,
            createdAt: true,
            updatedAt: true,
        },
    });

    return users;
};