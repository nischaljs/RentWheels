// utils/availabilityService.js
const { PrismaClient } = require('@prisma/client');
const { addDays, isWithinInterval, setHours, setMinutes } = require('date-fns');

const prisma = new PrismaClient();

class AvailabilityService {
  // Convert time string to Date object
  parseTime(timeStr, baseDate) {
    const [hours, minutes] = timeStr.split(':').map(Number);
    const date = new Date(baseDate);
    return setMinutes(setHours(date, hours), minutes);
  }

  // Check if two time ranges overlap
  doTimesOverlap(start1, end1, start2, end2) {
    const [start1Hour, start1Min] = start1.split(':').map(Number);
    const [end1Hour, end1Min] = end1.split(':').map(Number);
    const [start2Hour, start2Min] = start2.split(':').map(Number);
    const [end2Hour, end2Min] = end2.split(':').map(Number);

    const baseDate = new Date();
    const range1Start = setMinutes(setHours(baseDate, start1Hour), start1Min);
    const range1End = setMinutes(setHours(baseDate, end1Hour), end1Min);
    const range2Start = setMinutes(setHours(baseDate, start2Hour), start2Min);
    const range2End = setMinutes(setHours(baseDate, end2Hour), end2Min);

    return (
      isWithinInterval(range1Start, { start: range2Start, end: range2End }) ||
      isWithinInterval(range1End, { start: range2Start, end: range2End }) ||
      isWithinInterval(range2Start, { start: range1Start, end: range1End }) ||
      isWithinInterval(range2End, { start: range1Start, end: range1End })
    );
  }

  // Parse days of week from JSON string
  parsedayOfWeek(daysJson) {
    try {
      return JSON.parse(daysJson);
    } catch {
      return [];
    }
  }

  // Validate new availability slot
  async validateSlot(slot) {
    const existingSlots = await prisma.availabilitySlot.findMany({
      where: { vehicleId: slot.vehicleId },
    });

    for (const existingSlot of existingSlots) {
      // For non-recurring slots
      if (!slot.recurring && !existingSlot.recurring) {
        if (slot.specificDate?.toDateString() === existingSlot.specificDate?.toDateString()) {
          if (this.doTimesOverlap(slot.startTime, slot.endTime, existingSlot.startTime, existingSlot.endTime)) {
            return false;
          }
        }
      }
      
      // For recurring slots
      if (slot.recurring && existingSlot.recurring) {
        const existingDays = this.parsedayOfWeek(existingSlot.dayOfWeek);
        const overlappingDays = slot.dayOfWeek?.filter(day => existingDays.includes(day));
        
        if (overlappingDays?.length && this.doTimesOverlap(slot.startTime, slot.endTime, existingSlot.startTime, existingSlot.endTime)) {
          return false;
        }
      }
    }

    return true;
  }
}

module.exports = new AvailabilityService();
