export const DAYS_OF_WEEK = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ];
  
  export const TIME_SLOTS = Array.from({ length: 48 }, (_, i) => {
    const hour = Math.floor(i / 2);
    const minute = i % 2 === 0 ? '00' : '30';
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    return `${displayHour}:${minute} ${ampm}`;
  });
  
  export const calculateDuration = (startDate, startTime, endDate, endTime) => {
    const start = new Date(`${startDate} ${startTime}`);
    const end = new Date(`${endDate} ${endTime}`);
    return (end - start) / (1000 * 60 * 60);
  };
  
  export const convertTo24Hour = (timeStr) => {
    const [time, period] = timeStr.split(' ');
    let [hours, minutes] = time.split(':');
    hours = parseInt(hours);
    
    if (period === 'PM' && hours !== 12) {
      hours += 12;
    } else if (period === 'AM' && hours === 12) {
      hours = 0;
    }
    
    return `${hours.toString().padStart(2, '0')}:${minutes}`;
  };
  