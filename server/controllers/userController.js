const { createUserSchema, loginUserSchema, updateUserSchema } = require('../schemas/userSchemas');
const authService = require('../services/authService');
const userService = require('../services/userService');
const { handleErrors } = require('../middlewares/errorHandler');
const validateSchema = require('../utils/validateSchema');



exports.registerUser = async (req, res) => {
  try {
    const validatedData = validateSchema(createUserSchema, req.body);
    const token = await authService.register(validatedData);

    // Set JWT in HTTP-only cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'None',
      maxAge: 24 * 60 * 60 * 1000
    });
    res.status(201).json({ success: true, data: token });
  } catch (error) {
    handleErrors(res, error);
  }
};

exports.loginUser = async (req, res) => {
  try {
    const validatedData = validateSchema(loginUserSchema, req.body);
    const token = await authService.login(validatedData);
    // Set JWT in HTTP-only cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'None',
      maxAge: 24 * 60 * 60 * 1000
    });
    res.status(200).json({ success: true, data: token });
  } catch (error) {
    handleErrors(res, error);
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const user = await userService.getProfile(req.user.id);
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    handleErrors(res, error);
  }
};

exports.updateUserProfile = async (req, res) => {
  try {
    const validatedData = validateSchema(updateUserSchema, req.body);
    const updatedUser = await userService.updateProfile(req.user.id, validatedData);
    res.status(200).json({ success: true, data: updatedUser });
  } catch (error) {
    handleErrors(res, error);
  }
};

exports.deleteUserAccount = async (req, res) => {
  try {
    await userService.deleteUser(req.user.id);
    res.status(200).json({ success: true, message: 'User account deleted' });
  } catch (error) {
    handleErrors(res, error);
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    handleErrors(res, error);
  }
};