import { Plus, Repeat, Trash2, X } from 'lucide-react';
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import api from '../../services/api';

const DAYS_OF_WEEK = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];

const TIME_SLOTS = Array.from({ length: 48 }, (_, i) => {
  const hour = Math.floor(i / 2);
  const minute = i % 2 === 0 ? '00' : '30';
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  return `${displayHour}:${minute} ${ampm}`;
});

// Function to calculate the duration in hours
const calculateDuration = (start, end) => {
  const [startHour, startMinute] = start.split(':');
  const [endHour, endMinute] = end.split(':');

  const startDate = new Date();
  const endDate = new Date();

  // Set hours and minutes for start time
  startDate.setHours(
    parseInt(startHour) + (start.includes('PM') ? 12 : 0),
    parseInt(startMinute)
  );
  // Set hours and minutes for end time
  endDate.setHours(
    parseInt(endHour) + (end.includes('PM') ? 12 : 0),
    parseInt(endMinute)
  );

  // Calculate the duration in hours
  return (endDate - startDate) / (1000 * 60 * 60);
};

export default function AvailabilityManager({ vehicleId, onClose }) {
  const [isRecurring, setIsRecurring] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDays, setSelectedDays] = useState([]);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [slots, setSlots] = useState([]);
  const [isAddingSlot, setIsAddingSlot] = useState(false);
  const [warning, setWarning] = useState(''); // Warning state

  const handleAddSlot = () => {
    const duration = calculateDuration(startTime, endTime);
    if (duration < 3) {
      setWarning('You must list the vehicle for at least 3 hours.');
      return; // Prevent adding the slot if duration is less than 3 hours
    }

    const newSlot = {
      id: Date.now(),
      vehicleId,
      startTime,
      endTime,
      recurring: isRecurring,
      ...(isRecurring
        ? { dayOfWeek: selectedDays }
        : { specificDate: selectedDate }
      ),
    };

    setSlots([...slots, newSlot]);
    resetForm();
  };

  const resetForm = () => {
    setStartTime('');
    setEndTime('');
    setIsAddingSlot(false);
    setWarning(''); // Reset warning on form reset
  };

  const handleDeleteSlot = (slotId) => {
    setSlots(slots.filter(slot => slot.id !== slotId));
  };

  const handleSaveAll = async () => {
    try {
      // Remove the id property before saving
      const slotsToSave = slots.map(({ id, ...slot }) => ({ ...slot }));
  
      
      const response = await api.post('/availability', { vehicleId, slots: slotsToSave });
      
      onClose(); // Close the modal after saving
    } catch (error) {
      console.error('Error saving slots:', error);
      setWarning('Failed to save availability. Please try again.');
    }
  };
  

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 ">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl">
        {/* Header */}
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-xl font-semibold">Manage Vehicle Availability</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Add button */}
          <div className="flex justify-end">
            <button
              onClick={() => setIsAddingSlot(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Plus className="h-4 w-4" /> Add Availability
            </button>
          </div>

          {/* Add Slot Modal */}
          {isAddingSlot && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-40">
              <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-6 space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Add Availability Slot</h3>
                  <button
                    onClick={resetForm}
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Warning Message */}
                {warning && (
                  <div className="absolute top-0 p-4 mb-4 z-50 text-red-600 bg-red-100 rounded">
                    {warning}
                  </div>
                )}

                {/* Recurring Toggle */}
                <div className="flex items-center justify-between border p-4 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Repeat className="h-5 w-5" />
                    <span>Recurring Schedule</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={isRecurring}
                      onChange={e => setIsRecurring(e.target.checked)}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                {/* Date Selection */}
                {isRecurring ? (
                  <div className="grid grid-cols-7 gap-2">
                    {DAYS_OF_WEEK.map((day) => (
                      <button
                        key={day}
                        className={`p-2 rounded-lg border ${selectedDays.includes(day)
                          ? 'bg-blue-600 text-white'
                          : 'hover:bg-gray-50'
                          }`}
                        onClick={() => {
                          setSelectedDays(
                            selectedDays.includes(day)
                              ? selectedDays.filter(d => d !== day)
                              : [...selectedDays, day]
                          );
                        }}
                      >
                        {day.slice(0, 3)}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="flex justify-center">
                    <Calendar
                      onChange={setSelectedDate}
                      value={selectedDate}
                      minDate={new Date()}
                      className="border rounded-lg p-4"
                    />
                  </div>
                )}

                {/* Time Selection */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Start Time
                    </label>
                    <select
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      className="w-full border rounded-lg p-2"
                    >
                      <option value="">Select start time</option>
                      {TIME_SLOTS.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      End Time
                    </label>
                    <select
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      className="w-full border rounded-lg p-2"
                    >
                      <option value="">Select end time</option>
                      {TIME_SLOTS.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Add Slot Button */}
                <div className="flex justify-end">
                  <button
                    onClick={handleAddSlot}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    Add Slot
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Slots List */}
          <div>
            {slots.map(slot => (
              <div key={slot.id} className="flex justify-between items-center border p-2 mb-2 rounded">
                <span>
                  {slot.recurring
                    ? `Recurring on ${slot.dayOfWeek.join(', ')}: ${slot.startTime} - ${slot.endTime}`
                    : `On ${slot.specificDate.toDateString()}: ${slot.startTime} - ${slot.endTime}`}
                </span>
                <button
                  onClick={() => handleDeleteSlot(slot.id)}
                  className="text-red-600 hover:underline"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>

          {/* Save All Button */}
          <div className="flex justify-end">
            <button
              onClick={handleSaveAll}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Save All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
