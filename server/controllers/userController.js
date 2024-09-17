const userService = require('../services/userService'); 

// Register a new user
exports.registerUser = async (req, res) => {
    try {
        const user = await userService.register(req.body);
        res.status(201).json({ success: true, data: user });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Login a user
exports.loginUser = async (req, res) => {
    try {
        const token = await userService.login(req.body);
        res.status(200).json({ success: true, token });
    } catch (error) {
        res.status(401).json({ success: false, message: error.message });
    }
};

// Get a user's profile
exports.getUserProfile = async (req, res) => {
    try {
        const user = await userService.getProfile(req.user.id);
        res.status(200).json({ success: true, data: user });
    } catch (error) {
        res.status(404).json({ success: false, message: error.message });
    }
};

// Update a user's profile
exports.updateUserProfile = async (req, res) => {
    try {
        const updatedUser = await userService.updateProfile(req.user.id, req.body);
        res.status(200).json({ success: true, data: updatedUser });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Delete a user account
exports.deleteUserAccount = async (req, res) => {
    try {
        await userService.deleteUser(req.user.id);
        res.status(200).json({ success: true, message: 'User account deleted' });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Get all users (admin functionality)
exports.getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json({ success: true, data: users });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
