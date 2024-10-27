const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

// Route for user registration
router.post('/register', userController.registerUser);

// Route for user login
router.post('/login', userController.loginUser);

// Route to get user profile details
router.get('/profile',authMiddleware(), userController.getUserProfile);

// Route to update user profile details
router.put('/profile',authMiddleware(), userController.updateUserProfile);

// Route to delete a user account
router.delete('/profile',authMiddleware("USER"), userController.deleteUserAccount);

// Route to get a list of all users (admin functionality)
router.get('/',authMiddleware("ADMIN"), userController.getAllUsers);

module.exports = router;
