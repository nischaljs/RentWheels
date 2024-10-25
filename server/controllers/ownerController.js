const { handleErrors } = require("../middlewares/errorHandler");
const ownerService = require('../services/ownerService');

exports.getVehicles = async (req, res) => {
    try {
        
        const vehicles = await ownerService.getVehicles(req);
        res.status(200).json({ success: true, data: vehicles });
    } catch (error) {
        handleErrors(res, error);
    }
}