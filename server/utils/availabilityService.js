
const { PrismaClient } = require('@prisma/client');
const { addDays, isWithinInterval, setHours, setMinutes } = require('date-fns');

const prisma = new PrismaClient();

class AvailabilityService {
  // Convert time string to Date object
  parseTime(timeStr, baseDate) {
    const [time, modifier] = timeStr.split(' ');
    let [hours, minutes] = time.split(':').map(Number);
    
    if (modifier === 'PM' && hours !== 12) {
      hours += 12;
    }
    if (modifier === 'AM' && hours === 12) {
      hours = 0;
    }

    const date = new Date(baseDate);
    return setMinutes(setHours(date, hours), minutes);
  }

  // Check if two time ranges overlap
  doTimesOverlap(start1, end1, start2, end2, baseDate) {
    const range1Start = this.parseTime(start1, baseDate);
    const range1End = this.parseTime(end1, baseDate);
    const range2Start = this.parseTime(start2, baseDate);
    const range2End = this.parseTime(end2, baseDate);

    return (
      isWithinInterval(range1Start, { start: range2Start, end: range2End }) ||
      isWithinInterval(range1End, { start: range2Start, end: range2End }) ||
      isWithinInterval(range2Start, { start: range1Start, end: range1End }) ||
      isWithinInterval(range2End, { start: range1Start, end: range1End })
    );
  }

  // Parse days of the week from JSON string
  parsedayOfWeek(daysJson) {
    try {
      return JSON.parse(daysJson);
    } catch {
      return [];
    }
  }

  // Validate new availability slot
  async validateSlot(slot) {
    // Check if specificDate is a string and convert it to a Date object
    if (typeof slot.specificDate === 'string') {
      slot.specificDate = new Date(slot.specificDate);
    }
  
    const existingSlots = await prisma.availabilitySlot.findMany({
      where: { vehicleId: slot.vehicleId },
    });
  
    for (const existingSlot of existingSlots) {
      // Check if existingSlot.specificDate is a Date object
      if (typeof existingSlot.specificDate === 'string') {
        existingSlot.specificDate = new Date(existingSlot.specificDate);
      }
  
      // For non-recurring slots
      if (!slot.recurring && !existingSlot.recurring) {
        if (slot.specificDate.toDateString() === existingSlot.specificDate.toDateString()) {
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
