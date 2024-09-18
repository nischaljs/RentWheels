const prisma = require('../prismaClient'); 
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken'); 
const CustomError = require('../utils/customError');

// Register a new user
exports.register = async (userData) => {
    const { email, password, fullName, phone, role } = userData ;

    const existingUser = await prisma.user.findUnique({
        where: {
            email: email,
            phone: phone,
        },
    });

    if (existingUser) {
        throw new CustomError('User with this email or phone already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

   
    const user = await prisma.user.create({
        data: {
            email,
            password: hashedPassword,
            fullName,
            phone,
            role,
        },
        select:{
        id: true,
        email: true,
        fullName: true,
        phone: true,
        role: true,
        }
    });

    return user;
};

// Login a user
exports.login = async (loginData) => {
    const { email, password } = loginData;


    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
        throw new CustomError('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        throw new CustomError('Invalid credentials');
    }

   
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return token;
};

// Get a user's profile
exports.getProfile = async (userId) => {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            id: true,
            email: true,
            fullName: true,
            phone: true,
            role: true,
            createdAt: true,
            updatedAt: true,
            vehicles: true,
            bookings: true,
            reviews: true,
        },
    });

    if (!user) {
        throw new CustomError('User not found');
    }

    return user;
};

// Update a user's profile
exports.updateProfile = async (userId, updateData) => {
    
    const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: updateData,
    });

    return updatedUser;
};

// Delete a user account
exports.deleteUser = async (userId) => {
    await prisma.user.delete({
        where: { id: userId },
    });
};

// Get all users (admin functionality)
exports.getAllUsers = async () => {
   
    const users = await prisma.user.findMany({
        select: {
            id: true,
            email: true,
            fullName: true,
            phone: true,
            role: true,
            createdAt: true,
            updatedAt: true,
        },
    });

    return users;
};