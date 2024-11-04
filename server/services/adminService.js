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

exports.getNotApprovedVehicles = async () => {
    return await prisma.vehicle.findMany({
        where: {
            approved: false,
        },
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
                    phone:true
                },
            },
            vehicle: {
                select: {
                    name: true,
                    owner:{
                        select:{
                            fullName:true,
                            email:true,
                            phone:true
                        }
                    }
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


exports.getStats = async () => {
    const users = await prisma.user.count();
    const vehicles = await prisma.vehicle.count();
    const bookings = await prisma.booking.count();
    const approvedVehicles = await prisma.vehicle.count({ where: { approved: true } });
    const notapprovedVehicles = await prisma.vehicle.count({ where: { approved: false } });
    const totalRevenue = await prisma.booking.aggregate({
        _sum: {
            totalPrice: true,
        },
    });

    return { 
        users, 
        vehicles, 
        bookings, 
        approvedVehicles, 
        notapprovedVehicles, 
        totalRevenue: totalRevenue._sum.totalPrice,
    };
};
