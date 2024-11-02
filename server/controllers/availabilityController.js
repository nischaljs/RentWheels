// controllers/availabilityController.js
const { PrismaClient } = require('@prisma/client');
const availabilityService = require('../utils/availabilityService');
const { to24Hour } = require('../utils/timeUtils');

const prisma = new PrismaClient();

// Add new availability slot(s)
async function addAvailabilitySlots(req, res) {
  try {
    const slots = req.body.slots;
    

    // Validate all slots
    for (const slot of slots) {
      const isValid = await availabilityService.validateSlot(slot);
      if (!isValid) {
        return res.status(400).json({ error: 'Time slot overlaps with existing availability' });
      }
    }
    

    // Create all slots
    const createdSlots = await Promise.all(slots.map(slot => 
      prisma.availabilitySlot.create({
        data: {
          ...slot,
          dayOfWeek: slot.recurring ? JSON.stringify(slot.dayOfWeek) : '[]',
        },
      })
    ));

    res.json(createdSlots);
  } catch (error) {
    console.error('Error creating slots:', error);
    res.status(500).json({ error: 'Failed to create availability slots' });
  }
}

// Get availability for a vehicle
async function getAvailability(req, res) {
  try {
    const { vehicleId } = req.params;
    const slots = await prisma.availabilitySlot.findMany({
      where: { vehicleId: parseInt(vehicleId) },
      orderBy: [
        { recurring: 'desc' },
        { specificDate: 'asc' },
      ],
    });

    // Transform the slots to include parsed dayOfWeek
    const transformedSlots = slots.map(slot => ({
      ...slot,
      dayOfWeek: JSON.parse(slot.dayOfWeek),
    }));

    res.json(transformedSlots);
  } catch (error) {
    console.error('Error fetching slots:', error);
    res.status(500).json({ error: 'Failed to fetch availability slots' });
  }
}

// Delete an availability slot
async function deleteAvailabilitySlot(req, res) {
  try {
    const { slotId } = req.params;
    await prisma.availabilitySlot.delete({ where: { id: parseInt(slotId) } });
    
    res.json({ message: 'Slot deleted successfully' });
  } catch (error) {
    console.error('Error deleting slot:', error);
    res.status(500).json({ error: 'Failed to delete availability slot' });
  }
}

// Check vehicle availability for specific dates
async function checkVehicleAvailability(req, res) {
  try {
    const { vehicleId, startDate, endDate, startTime, endTime } = req.body;

    const checkDate = new Date(startDate);
    const endCheckDate = new Date(endDate);
    const availableSlots = await prisma.availabilitySlot.findMany({
      where: { vehicleId: parseInt(vehicleId) }
    });

    let isAvailable = false;

    for (const slot of availableSlots) {
      const isSameDay = checkDate.toDateString() === endCheckDate.toDateString();

    
      if (slot.recurring) {
        const dayName = checkDate.toLocaleDateString('en-US', { weekday: 'long' });
        const availableDays = JSON.parse(slot.dayOfWeek);
        
        if (availableDays.includes(dayName)) {
          if (isSameDay) {
            // Enforce 3-hour minimum booking time if start and end are on the same day
            const startHour = parseInt(to24Hour(startTime).split(':')[0], 10);
            const endHour = parseInt(to24Hour(endTime).split(':')[0], 10);
            const diff = endHour-startHour;
            
            if (diff >= 3) {
              isAvailable = true;
              break;
            }
          } else {
            isAvailable = true;
            break;
          }
        }
      } else if (slot.specificDate) {
        if (slot.specificDate.toDateString() === checkDate.toDateString()) {
          if (isSameDay) {
            const startHour = parseInt(to24Hour(startTime).split(':')[0], 10);
            const endHour = parseInt(to24Hour(endTime).split(':')[0], 10);
            if (endHour - startHour >= 3) {
              isAvailable = true;
              break;
            }
          } else {
            isAvailable = true;
            break;
          }
        }
      }
    }

    // Additional check for existing bookings in the specified time range
    const existingBooking = await prisma.booking.findFirst({
      where: {
        vehicleId: parseInt(vehicleId),
        AND: [
          { startDate: { lte: endCheckDate } },
          { endDate: { gte: checkDate } },
        ],
      },
    });

    if (existingBooking) {
      isAvailable = false;
    }

    res.json({ isAvailable });
  } catch (error) {
    console.error('Error checking availability:', error);
    res.status(500).json({ error: 'Failed to check availability' });
  }
}


module.exports = {
  addAvailabilitySlots,
  getAvailability,
  deleteAvailabilitySlot,
  checkVehicleAvailability,
};
