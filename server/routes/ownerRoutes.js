const express = require('express');
const paginatedResults = require('../middlewares/paginatedResults');
const router = express.Router();
const ownerController = require('../controllers/ownerController');
const authMiddleware = require('../middlewares/authMiddleware');



const getOwnerFilter = (req) => {
    return { ownerId: req.user.id }; 
  };

router.get("/listedVehicles",authMiddleware("OWNER"),paginatedResults('Vehicle',getOwnerFilter), ownerController.getVehicles);

module.exports = router;