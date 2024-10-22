const adminService = require('../services/adminService');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await adminService.getAllUsers();
        res.status(200).json({ success: true, data: users });
    } catch (error) {
        handleErrors(res, error);
    }
};

exports.getAllVehicles = async (req, res) => {
    try {
        const vehicles = await adminService.getAllVehicles();
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


exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        await adminService.deleteUser(id);
        res.status(204).send();
    } catch (error) {
        handleErrors(res, error);
    }
};
