const { handleErrors } = require("../middlewares/errorHandler");


exports.getVehicles = async (req, res) => {
    try {
        const vehicles = await ownerService.getVehicles(req.user.id);
        res.status(200).json({ success: true, data: vehicles });
    } catch (error) {
        handleErrors(res, error);
    }
}