const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middleware 
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.static('public'));

// Routes
const mainRouter = require('./routes/index');
const {errorHandler} = require('./middlewares/errorHandler');
app.use('/api/v1',mainRouter);


app.use(errorHandler);

module.exports = app;
