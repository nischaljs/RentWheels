
  
exports.getVehicles = async (ownerId) => {
    const vehicles = await req.paginatedResults('vehicle');
    return vehicles;
}   