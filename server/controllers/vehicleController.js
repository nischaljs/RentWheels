const { createVehicleSchema, updateVehicleSchema } = require('../schemas/VehicleSchemas');
const vehicleService = require('../services/vehicleService');
const { handleErrors } = require('../middlewares/errorHandler');
const validateSchema = require('../utils/validateSchema');


exports.addVehicle = async (req, res) => {
  try {
    //since the form data i was sending from the frontend had to get some key so i gave it data key and also since the whole json was a value it was getting passed as string hence had to parse it to json
    const data = (JSON.parse (req.body.data));
    
    const validatedData = validateSchema(createVehicleSchema, data);
    console.log( "erros in request " + req);
    
    const imagePath = req.file ? req.file.path : null;
    const ownerId = req.user.id;
    const newVehicle = await vehicleService.addVehicle(validatedData, imagePath, ownerId);
    res.status(201).json({
      success: true,
      message: 'Vehicle added successfully',
      data: newVehicle
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
    const validatedData = validateSchema(updateVehicleSchema, req.body);
    const vehicleId = req.params.id;
    const updatedVehicle = await vehicleService.updateVehicle(vehicleId, validatedData);
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