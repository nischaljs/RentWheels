const express = require('express');
const paginatedResults = require('../middlewares/paginatedResults');
const router = express.Router();
const ownerController = require('../controllers/ownerController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get("/listedVehicles",authMiddleware("OWNER"),paginatedResults('Vehicle',{ ownerId: req.user.id }), ownerController.getVehicles);

module.exports = router;