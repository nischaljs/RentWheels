const prisma = require("../prismaClient");

exports.getAllUsers = async () => {
    return await prisma.user.findMany({
        select: {
            id: true,
            email: true,
            fullName: true,
            phone: true,
            role: true,
            createdAt: true,
            updatedAt: true,
        }
    });
};

exports.getAllVehicles = async () => {
    return await prisma.vehicle.findMany({
        include: {
            owner: {
                select: {
                    fullName: true,
                    email: true,
                },
            },
        },
    });
};

exports.getAllBookings = async () => {
    return await prisma.booking.findMany({
        include: {
            renter: {
                select: {
                    fullName: true,
                    email: true,
                },
            },
            vehicle: {
                select: {
                    name: true,
                },
            },
        },
    });
};



exports.approveVehicle = async (id) => {
    return await prisma.vehicle.update({
        where: { id: parseInt(id) },
        data: { approved: true, available: true }, 
    });
};

exports.rejectVehicle = async (id) => {
    return await prisma.vehicle.update({
        where: { id: parseInt(id) },
        data: { approved: false, available: false }, 
    });
};


exports.deleteUser = async (id) => {
    return await prisma.user.delete({
        where: { id: parseInt(id) },
    });
};
