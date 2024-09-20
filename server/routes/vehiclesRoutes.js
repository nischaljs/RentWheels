const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicleController');
const authMiddleware = require('../middlewares/authMiddleware');
const upload = require('../middlewares/multer');

// Public route to search vehicles
router.get('/search', vehicleController.searchVehicles);

// Protected routes 
router.post('/add',upload.single('vehicleImage'), authMiddleware, vehicleController.addVehicle);
router.put('/:id', authMiddleware, vehicleController.updateVehicle);
router.delete('/:id', authMiddleware, vehicleController.deleteVehicle);

module.exports = router;
