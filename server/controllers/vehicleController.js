const vehicleService = require('../services/vehicleService');

// Controller to handle adding a new vehicle
exports.addVehicle = async (req, res) => {
    try {
        const vehicleData = req.body;
        const imagePath = req.file ? req.file.path : null;
        const ownerId = req.user.id;
        const newVehicle = await vehicleService.addVehicle(vehicleData, imagePath, ownerId);
        res.status(201).json({
            success: true,
            message: 'Vehicle added successfully',
            data: newVehicle
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to add vehicle',
            error: error.message
        });
    }
};

// Controller to handle searching vehicles
exports.searchVehicles = async (req, res) => {
    try {
        const vehicles = await vehicleService.searchVehicles(req.query);
        res.status(200).json({
            success: true,
            data: vehicles
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to search vehicles',
            error: error.message
        });
    }
};

// Controller to handle updating a vehicle
exports.updateVehicle = async (req, res) => {
    try {
        const vehicleId = req.params.id;
        const updatedVehicle = await vehicleService.updateVehicle(vehicleId, req.body);
        res.status(200).json({
            success: true,
            message: 'Vehicle updated successfully',
            data: updatedVehicle
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to update vehicle',
            error: error.message
        });
    }
};

// Controller to handle deleting a vehicle
exports.deleteVehicle = async (req, res) => {
    try {
        const vehicleId = req.params.id;
        await vehicleService.deleteVehicle(vehicleId);
        res.status(200).json({
            success: true,
            message: 'Vehicle deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to delete vehicle',
            error: error.message
        });
    }
};
