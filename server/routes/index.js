const express = require('express');
const mainRouter = express.Router();

// Importing individual route modules
const userRoutes = require('./usersRoutes');
const vehicleRoutes = require('./vehiclesRoutes');
const bookingRoutes = require('./bookingsRoutes');
const reviewRoutes = require('./reviewsRoutes');
const paymentRoutes = require('./paymentRoutes');
const documentRoutes = require('./documentRoutes');
const adminRoutes = require('./adminRoutes');
const ownerRoutes = require('./ownerRoutes');

// Route redirection 
mainRouter.use('/users', userRoutes);       
mainRouter.use('/vehicles', vehicleRoutes); 
mainRouter.use('/bookings', bookingRoutes); 
mainRouter.use('/reviews', reviewRoutes);   
mainRouter.use('/payments', paymentRoutes); 
mainRouter.use('/documents', documentRoutes);
mainRouter.use('/admin', adminRoutes);
mainRouter.use('/owner', ownerRoutes);

module.exports = mainRouter;
