const { handleErrors } = require('../middlewares/errorHandler');
const adminService = require('../services/adminService');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await adminService.getAllUsers();
        res.status(200).json({ success: true, data: users });
    } catch (error) {
        handleErrors(res, error);
    }
};

exports.getNotApprovedVehicles = async (req, res) => {
    try {
        const vehicles = await adminService.getNotApprovedVehicles();
        res.status(200).json({ success: true, data: vehicles });
    } catch (error) {
        handleErrors(res, error);
    }
};

exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await adminService.getAllBookings();
        res.status(200).json({ success: true, data: bookings });
    } catch (error) {
        handleErrors(res, error);
    }
};

exports.approveVehicle = async (req, res) => {
    const { id } = req.params;
    try {
        const vehicle = await adminService.approveVehicle(id);
        res.status(200).json({ success: true, data: vehicle });
    } catch (error) {
        handleErrors(res, error);
    }
};

exports.rejectVehicle = async (req, res) => {
    const { id } = req.params;
    try {
        const vehicle = await adminService.rejectVehicle(id);
        res.status(200).json({ success: true, data: vehicle });
    } catch (error) {
        handleErrors(res, error);
    }
};



exports.getStats = async (req, res) => {
    try {
        const stats = await adminService.getStats();
        res.status(200).json({ success: true, data: stats });
    } catch (error) {
        handleErrors(res, error);
    }
}