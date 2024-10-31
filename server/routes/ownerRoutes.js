const express = require('express');
const paginatedResults = require('../middlewares/paginatedResults');
const router = express.Router();
const ownerController = require('../controllers/ownerController');
const authMiddleware = require('../middlewares/authMiddleware');




  const getOwnerFilter = (req) => {
    return { ownerId: req.user.userId }; 
};


router.get("/listedVehicles", authMiddleware("OWNER"), paginatedResults('Vehicle', getOwnerFilter), ownerController.getVehicles);

router.get("/stats", authMiddleware("OWNER"),  ownerController.getStats);

router.get("/bookings", authMiddleware("OWNER"), ownerController.getBookings);

router.get("/reviews", authMiddleware("OWNER"), ownerController.getReviews);


//route for owner to see the booking of the vehicle


module.exports = router;