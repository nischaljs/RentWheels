// timeUtils.js
export const DAYS_OF_WEEK = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];

// Generate time slots for every 30 minutes (48 slots in 24 hours)
export const TIME_SLOTS = Array.from({ length: 48 }, (_, i) => {
  const hour = Math.floor(i / 2);
  const minute = i % 2 === 0 ? '00' : '30';
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  return `${displayHour}:${minute} ${ampm}`;
});

// Calculate duration between two dates and times in hours with validation
export const calculateDuration = (startDate, startTime, endDate, endTime) => {
  if (!startDate || !startTime || !endDate || !endTime) return 0;
  
  const start = new Date(`${startDate} ${startTime}`);
  const end = new Date(`${endDate} ${endTime}`);
  
  if (isNaN(start.getTime()) || isNaN(end.getTime())) return 0;
  
  const durationHours = (end - start) / (1000 * 60 * 60);
  return Math.max(0, durationHours);
};

// Convert 12-hour time format to 24-hour format with validation
export const convertTo24Hour = (timeStr) => {
  if (!timeStr || typeof timeStr !== 'string') return '';
  
  const [time, period] = timeStr.split(' ');
  if (!time || !period) return '';
  
  let [hours, minutes] = time.split(':');
  hours = parseInt(hours);
  
  if (isNaN(hours)) return '';
  
  if (period === 'PM' && hours !== 12) {
      hours += 12;
  } else if (period === 'AM' && hours === 12) {
      hours = 0;
  }
  
  return `${hours.toString().padStart(2, '0')}:${minutes}`;
};

// Convert 24-hour format to 12-hour format with validation
export const convertTo12Hour = (timeStr) => {
  if (!timeStr || typeof timeStr !== 'string') return '';
  
  let [hours, minutes] = timeStr.split(':');
  hours = parseInt(hours);
  
  if (isNaN(hours)) return '';
  
  const period = hours >= 12 ? 'PM' : 'AM';
  hours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
  
  return `${hours}:${minutes} ${period}`;
};

// Get formatted date string YYYY-MM-DD with validation
export const formatDate = (date) => {
  if (!date || !(date instanceof Date)) return '';
  if (isNaN(date.getTime())) return '';
  return date.toLocaleDateString('en-US');
};

// Check if two date ranges overlap with validation
export const doDateRangesOverlap = (start1, end1, start2, end2) => {
  if (!start1 || !end1 || !start2 || !end2) return false;
  
  const s1 = new Date(start1);
  const e1 = new Date(end1);
  const s2 = new Date(start2);
  const e2 = new Date(end2);
  
  if (isNaN(s1.getTime()) || isNaN(e1.getTime()) || 
      isNaN(s2.getTime()) || isNaN(e2.getTime())) return false;
  
  return s1 <= e2 && e1 >= s2;
};

// Get array of dates between start and end with validation
export const getDatesBetween = (startDate, endDate) => {
  const dates = [];
  
  if (!startDate || !endDate) return dates;
  
  let currentDate = new Date(startDate);
  const end = new Date(endDate);
  
  if (isNaN(currentDate.getTime()) || isNaN(end.getTime())) return dates;
  
  // Include the start date even if start and end are the same
  do {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
  } while (currentDate <= end);
  
  return dates;
};

// New utility functions to support the booking form

// Check if a time is within business hours
export const isWithinBusinessHours = (time, businessHours) => {
  const timeIn24 = convertTo24Hour(time);
  return timeIn24 >= businessHours.start && timeIn24 <= businessHours.end;
};

// Get the next available time slot from a given time
export const getNextAvailableTimeSlot = (currentTime, availableSlots) => {
  const currentIndex = TIME_SLOTS.indexOf(currentTime);
  if (currentIndex === -1) return null;
  
  for (let i = currentIndex + 1; i < TIME_SLOTS.length; i++) {
      if (availableSlots.includes(TIME_SLOTS[i])) {
          return TIME_SLOTS[i];
      }
  }
  return null;
};

// Format duration for display
export const formatDuration = (hours) => {
  const wholeHours = Math.floor(hours);
  const minutes = Math.round((hours - wholeHours) * 60);
  
  if (minutes === 0) return `${wholeHours}h`;
  return `${wholeHours}h ${minutes}m`;
};

// Add a new utility function to check time slot availability
export const isTimeSlotAvailable = (date, time, availabilitySlots) => {
  const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
  const dateString = formatDate(date);

  return availabilitySlots.some(slot => {
      // Check recurring slots
      if (slot.recurring && slot.dayOfWeek.includes(dayOfWeek)) {
          return time >= slot.startTime && time <= slot.endTime;
      }
      // Check specific date slots
      if (!slot.recurring && formatDate(new Date(slot.specificDate)) === dateString) {
          return time >= slot.startTime && time <= slot.endTime;
      }
      return false;
  });
};