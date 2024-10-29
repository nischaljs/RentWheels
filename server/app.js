const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
require('dotenv').config();



const app = express();

// Middleware 
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.static('public'));
app.use(cookieParser());


// Routes
const mainRouter = require('./routes/index');
const { errorHandler } = require('./middlewares/errorHandler');
app.use('/api/v1', mainRouter);



// Handle payment success redirect
app.get('/payment/success', (req, res) => {
    console.log("payment success route", req.url);
    if (process.env.NODE_ENV != "development") {
        res.sendFile(path.join(__dirname, 'client', 'index.html'));
    }
    else {
        const url = req.url.split('?')[1]; // Extract query params
        const redirectUrl = `http://localhost:5173/payment/success?${url}`;
        res.redirect(redirectUrl); // Redirect to the React frontend with params
    }
});

// Fallback route for any other request
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'dist', 'index.html'));
});


app.use(errorHandler);

module.exports = app;
