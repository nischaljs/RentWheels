const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middleware 
app.use(cors());
app.use(bodyParser.json());

// Routes
const userRoutes = require('./routes/userRoutes');
const vehicleRoutes = require('./routes/vehicleRoutes');
const errorHandler = require('./middlewares/errorHandler');

//  routes
app.use('/api/users', userRoutes); 
app.use('/api/vehicles', vehicleRoutes); 
app.use(errorHandler);

module.exports = app;
