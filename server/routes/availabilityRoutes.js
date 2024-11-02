// routes/availabilityRoutes.js
const express = require('express');
const {
  addAvailabilitySlots,
  getAvailability,
  deleteAvailabilitySlot,
  checkVehicleAvailability,
} = require('../controllers/availabilityController');

const router = express.Router();

// Add new availability slot(s)
router.post('/', addAvailabilitySlots);

// Get availability for a vehicle
router.get('/:vehicleId', getAvailability);

// Delete an availability slot
router.delete('/:slotId', deleteAvailabilitySlot);

// Check vehicle availability for specific dates
router.post('/check', checkVehicleAvailability);


module.exports = router;
