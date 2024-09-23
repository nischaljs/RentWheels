const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Service to add a new vehicle
exports.addVehicle = async (vehicleData, imagePath, ownerId) => {
    const { name, type, seater, transmission, pricePerDay, driverAvailable, available } = vehicleData;
    return await prisma.vehicle.create({
        data: {
          name,
          type,
          seater: parseInt(seater),
          transmission,
          available,
          pricePerDay: parseFloat(pricePerDay),
          driverAvailable: driverAvailable === 'true',
          image: imagePath, 
          owner: { connect: { id: ownerId } } 
        }
    });
};

//get individual vehicle detail
exports.getVehicle = async (vehicleId) => {
    return await prisma.vehicle.findUnique({
        where: {
            id: vehicleId
        },
        include: {
            owner: true,
            availability: true
        }
    });
}

exports.searchVehicles = async (query) => {
    return await prisma.vehicle.findMany({
        where: {
            
            availability: {
                some: {
                    day: query.day,
                    timeFrom: { lte: query.timeFrom },
                    timeTo: { gte: query.timeTo }
                }
            }
        },
        include: {
            owner: true,
            availability: true
        }
    });
};

// Service to update vehicle details
exports.updateVehicle = async (vehicleId, vehicleData) => {
    return await prisma.vehicle.update({
        where: {
            id: vehicleId
        },
        data: {
            make: vehicleData.make,
            model: vehicleData.model,
            seats: vehicleData.seats,
            transmission: vehicleData.transmission,
            vehicleType: vehicleData.vehicleType,
            availability: {
                deleteMany: {}, 
                create: vehicleData.availability 
            }
        }
    });
};

// Service to delete a vehicle
exports.deleteVehicle = async (vehicleId) => {
    return await prisma.vehicle.delete({
        where: {
            id: vehicleId
        }
    });
};


exports.updateVehicleAvailability = async (vehicleId) => {
    return await prisma.vehicle.update({
        where: {
            id: vehicleId
        },
        data: {
            availability: {
                updateMany: {
                    where: {
                        day: new Date().getDay()
                    },
                    data: {
                        available: false
                    }
                }
            }
        }
    });
};

//get all bookings of a vehicle 
exports.getVehicleWithBookings = async (vehicleId) => {
    return await prisma.vehicle.findUnique({
        where: {
            id: vehicleId
        },
        include: {
            bookings: true 
        }
    });
};