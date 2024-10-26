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
            available: available === 'true', // Converts available to Boolean
            pricePerDay: parseFloat(pricePerDay),
            driverAvailable: driverAvailable === 'true',
            image: imagePath, 
            owner: { connect: { id: ownerId } } 
        }
    });
};


exports.getVehicle = async (vehicleId) => {
    return await prisma.vehicle.findUnique({
        where: {
            id: vehicleId
        },
        include: {
            owner: {
                select: {
                    id: true,
                    fullName: true,
                    email: true,
                    phone: true  
                }
            },
            reviews:{
                select:{
                    id:true,
                    rating:true,
                    comment:true,
                    createdAt:true,
                    user:{
                        select:{
                            fullName:true
                        }
                    }
                }
            },
            availabilitySlots: true,
            bookings: {
                select: {
                    id: true,
                    startDate: true,
                    endDate: true,
                    status: true,
                }
            }
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
    const pricePerDay = parseFloat(vehicleData.pricePerDay);
    return await prisma.vehicle.update({
        where: {
            id: vehicleId
        },
        data: {
            name: vehicleData.name,
            seats: vehicleData.seats,
            transmission: vehicleData.transmission,
            vehicleType: vehicleData.vehicleType,
            pricePerDay: pricePerDay,
            driverAvailable: vehicleData.driverAvailable,
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
    // Fetch current availability status
    const vehicle = await prisma.vehicle.findUnique({
        where: { id: vehicleId },
        select: { available: true },
    });

    // Check if vehicle exists and toggle the availability
    if (vehicle) {
        return await prisma.vehicle.update({
            where: { id: vehicleId },
            data: { available: !vehicle.available }, 
        });
    } else {
        throw new Error(`Vehicle with ID ${vehicleId} not found.`);
    }
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

exports.getAvailableVehicles = async () => {
    try {
      // Fetch vehicles that are available (assuming 'available' is a boolean field)
      const availableVehicles = await prisma.vehicle.findMany({
        where: {
          available: true,
          approved:true  
        },
      });
      console.log(availableVehicles);
      
      
      return availableVehicles;
    } catch (error) {
      throw new Error('Error fetching available vehicles');
    }
  };
  