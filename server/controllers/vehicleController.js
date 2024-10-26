const { createVehicleSchema, updateVehicleSchema } = require('../schemas/VehicleSchemas');
const vehicleService = require('../services/vehicleService');
const { handleErrors } = require('../middlewares/errorHandler');


exports.getAvailableVehicles = async (req, res) => {
  try {
    // Call the service to get available vehicles
    const availableVehicles = await vehicleService.getAvailableVehicles();
    
    res.status(200).json({
      success: true,
      paginationDetails :req.paginatedResults,
      data: availableVehicles,
    });
  } catch (error) {
    handleErrors(res, error);
  }
};

exports.addVehicle = async (req, res) => {
  console.log('Incoming request body:', req.body);
  console.log('Incoming file:', req.file);

  try {
      const data = req.body;
      // const validatedData = validateSchema(createVehicleSchema, data);
      const validatedData = data;
      const imagePath = req.file ? req.file.path.replace(/^public/, '') : null;
      const ownerId = req.user.userId;
      const newVehicle = await vehicleService.addVehicle(validatedData, imagePath, ownerId);
      res.status(201).json({
          success: true,
          message: 'Vehicle added successfully',
          data: newVehicle
      });
  } catch (error) {
      console.error('Error in addVehicle:', error); // Log the error for debugging
      handleErrors(res, error);
  }
};


exports.getVehicle = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const vehicles = await vehicleService.getVehicle(id);
    res.status(200).json({
      success: true,
      data: vehicles
    });
  } catch (error) {
    handleErrors(res, error);
  }
};

exports.searchVehicles = async (req, res) => {
  try {
    const vehicles = await vehicleService.searchVehicles(req.query);
    res.status(200).json({
      success: true,
      data: vehicles
    });
  } catch (error) {
    handleErrors(res, error);
  }
};

exports.updateVehicle = async (req, res) => {
  try {
    console.log('Incoming request body to update vehicle:', req.body);
    // const validatedData = validateSchema(updateVehicleSchema, req.body);
    const vehicleId = parseInt(req.params.id);
    const updatedVehicle = await vehicleService.updateVehicle(vehicleId, req.body);
    res.status(200).json({
      success: true,
      message: 'Vehicle updated successfully',
      data: updatedVehicle
    });
  } catch (error) {
    handleErrors(res, error);
  }
};

exports.deleteVehicle = async (req, res) => {
  try {
    const vehicleId = req.params.id;
    await vehicleService.deleteVehicle(vehicleId);
    res.status(200).json({
      success: true,
      message: 'Vehicle deleted successfully'
    });
  } catch (error) {
    handleErrors(res, error);
  }
};

exports.updateVehicleAvailability = async (req, res) => {
  try {
    const vehicleId = parseInt(req.params.id);
    const updatedVehicle = await vehicleService.updateVehicleAvailability(vehicleId);
    res.status(200).json({
      success: true,
      message: 'Vehicle availability updated successfully',
      data: updatedVehicle
    });
  } catch (error) {
    handleErrors(res, error);
  }
}


//get all bookings of a vehicle
exports.getVehicleBookings = async (req, res) => {
  try {
    const vehicleId = req.params.id;
    const bookings = await vehicleService.getVehicleBookings(vehicleId);
    res.status(200).json({
      success: true,
      data: bookings
    });
  } catch (error) {
    handleErrors(res, error);
  }
}