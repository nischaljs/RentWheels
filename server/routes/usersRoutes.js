const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Route for user registration
router.post('/register', userController.registerUser);

// Route for user login
router.post('/login', userController.loginUser);

// Route to get user profile details
router.get('/profile', userController.getUserProfile);

// Route to update user profile details
router.put('/profile', userController.updateUserProfile);

// Route to delete a user account
router.delete('/profile', userController.deleteUserAccount);

// Route to get a list of all users (admin functionality)
router.get('/', userController.getAllUsers);

module.exports = router;
