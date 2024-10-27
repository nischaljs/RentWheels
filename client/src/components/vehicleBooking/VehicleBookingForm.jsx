import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import {
    Clock,
    X,
    Car,
    User,
    AlertCircle,
    CheckCircle,
    Loader2
} from 'lucide-react';

import { DAYS_OF_WEEK, TIME_SLOTS, calculateDuration, convertTo24Hour } from '../../utils/timeUtils';
import api from '../../services/api';

const VehicleBookingForm = ({ onClose, vehicleId }) => {
    const [bookingData, setBookingData] = useState({
        startDate: '',
        startTime: '',
        endDate: '',
        endTime: '',
        driverRequired: false
    });

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isChecking, setIsChecking] = useState(false);
    const [isAvailable, setIsAvailable] = useState(null);
    const [availabilitySlots, setAvailabilitySlots] = useState([]);
    const [availableTimeSlots, setAvailableTimeSlots] = useState([]);

    useEffect(() => {
        fetchAvailabilitySlots();
    }, [vehicleId]);

    useEffect(() => {
        if (selectedDate) {
            const availableTimes = getAvailableTimeSlotsForDate(selectedDate);
            setAvailableTimeSlots(availableTimes);

            // Reset time selections if the current selections are not available
            if (bookingData.startDate === selectedDate.toISOString().split('T')[0]) {
                if (!availableTimes.includes(bookingData.startTime)) {
                    setBookingData(prev => ({ ...prev, startTime: '' }));
                }
            }
        }
    }, [selectedDate, availabilitySlots]);

    const fetchAvailabilitySlots = async () => {
        try {
            const response = await api.get(`/availability/${vehicleId}`);
            setAvailabilitySlots(response.data);
        } catch (err) {
            setError('Unable to fetch vehicle availability');
        }
    };

    const getAvailableTimeSlotsForDate = (date) => {
        const dayOfWeek = DAYS_OF_WEEK[date.getDay()];
        const dateString = date.toISOString().split('T')[0];

        const relevantSlots = availabilitySlots.filter(slot => {
            if (slot.recurring) {
                return slot.dayOfWeek.includes(dayOfWeek);
            } else {
                const slotDate = new Date(slot.specificDate).toISOString().split('T')[0];
                return slotDate === dateString;
            }
        });

        if (relevantSlots.length === 0) return [];

        return TIME_SLOTS.filter(timeSlot => {
            return relevantSlots.some(slot => {
                const slotStartTime = convertTo24Hour(slot.startTime);
                const slotEndTime = convertTo24Hour(slot.endTime);
                const currentTime = convertTo24Hour(timeSlot);
                return currentTime >= slotStartTime && currentTime <= slotEndTime;
            });
        });
    };

    const tileDisabled = ({ date }) => {
        const availableTimes = getAvailableTimeSlotsForDate(date);
        return availableTimes.length === 0;
    };

    const tileClassName = ({ date }) => {
        const availableTimes = getAvailableTimeSlotsForDate(date);
        return availableTimes.length > 0 ? 'bg-blue-100 hover:bg-blue-200' : 'bg-gray-100';
    };

    const handleDateSelect = (date) => {
        setSelectedDate(date);
        const dateStr = date.toISOString().split('T')[0];
        setBookingData(prev => ({
            ...prev,
            startDate: dateStr,
            endDate: dateStr,
            startTime: '',
            endTime: ''
        }));
        setError('');
        setSuccess('');
        setIsAvailable(null);
    };

    const handleTimeChange = (e) => {
        const { name, value } = e.target;
        setBookingData(prev => ({ ...prev, [name]: value }));

        // If selecting start time, automatically set end time to 3 hours later
        if (name === 'startTime' && value) {
            const startIndex = TIME_SLOTS.indexOf(value);
            const endIndex = Math.min(startIndex + 6, TIME_SLOTS.length - 1); // 6 slots = 3 hours
            setBookingData(prev => ({ ...prev, endTime: TIME_SLOTS[endIndex] }));
        }
    };

    const handleBooking = async () => {
        if (!validateBooking()) return;

        try {
            const response = await api.post('/bookings', {
                vehicleId,
                ...bookingData
            });
            setSuccess('Booking confirmed successfully!');
            setTimeout(onClose, 2000);
        } catch (err) {
            setError('Failed to process booking. Please try again.');
        }
    };

    const validateBooking = () => {
        if (!bookingData.startDate || !bookingData.endDate || !bookingData.startTime || !bookingData.endTime) {
            setError('Please select both start and end times');
            return false;
        }

        const duration = calculateDuration(
            bookingData.startDate,
            bookingData.startTime,
            bookingData.endDate,
            bookingData.endTime
        );

        if (duration < 3) {
            setError('Booking duration must be at least 3 hours');
            return false;
        }

        return true;
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg w-full max-w-2xl">
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                    <h2 className="text-xl font-semibold text-gray-900">Book Vehicle</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-500 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
                <div className="flex px-6 w-full items-center space-x-4 my-4">
                    <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-blue-100 border border-blue-200 rounded"></div>
                        <span className="text-sm text-gray-700">Available Date</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-gray-100 border border-gray-200 rounded"></div>
                        <span className="text-sm text-gray-700">Unavailable Date</span>
                    </div>
                </div>


                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h3 className="text-sm font-medium text-gray-700 mb-4">Select Date</h3>
                        <Calendar
                            onChange={handleDateSelect}
                            value={selectedDate}
                            tileDisabled={tileDisabled}
                            tileClassName={tileClassName}
                            minDate={new Date()}
                            className="w-full border rounded-lg p-4"
                        />
                    </div>

                    <div className="space-y-6">
                        <div>
                            <h3 className="text-sm font-medium text-gray-700 mb-4 flex items-center">
                                <Clock className="w-4 h-4 mr-2" />
                                Available Time Slots
                            </h3>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm text-gray-600 mb-2">Start Time</label>
                                    <select
                                        name="startTime"
                                        value={bookingData.startTime}
                                        onChange={handleTimeChange}
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        <option value="">Select start time</option>
                                        {availableTimeSlots.map(time => (
                                            <option key={time} value={time}>{time}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-600 mb-2">End Time</label>
                                    <select
                                        name="endTime"
                                        value={bookingData.endTime}
                                        onChange={handleTimeChange}
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        <option value="">Select end time</option>
                                        {availableTimeSlots
                                            .filter(time => {
                                                if (!bookingData.startTime) return true;
                                                const startIndex = TIME_SLOTS.indexOf(bookingData.startTime);
                                                const currentIndex = TIME_SLOTS.indexOf(time);
                                                return currentIndex > startIndex;
                                            })
                                            .map(time => (
                                                <option key={time} value={time}>{time}</option>
                                            ))}
                                    </select>
                                </div>
                            </div>

                            <div className="mt-6">
                                <label className="flex items-center space-x-3">
                                    <input
                                        type="checkbox"
                                        id="driverRequired"
                                        name="driverRequired"
                                        checked={bookingData.driverRequired}
                                        onChange={(e) => setBookingData(prev => ({ ...prev, driverRequired: e.target.checked }))}
                                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                    />
                                    <span className="text-sm text-gray-700 flex items-center">
                                        <User className="w-4 h-4 mr-2" />
                                        Driver required
                                    </span>
                                </label>
                            </div>
                        </div>

                        {error && (
                            <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg">
                                <AlertCircle className="w-5 h-5" />
                                <p className="text-sm">{error}</p>
                            </div>
                        )}

                        {success && (
                            <div className="flex items-center space-x-2 text-green-600 bg-green-50 p-3 rounded-lg">
                                <CheckCircle className="w-5 h-5" />
                                <p className="text-sm">{success}</p>
                            </div>
                        )}

                        <button
                            type="button"
                            disabled={isChecking || !bookingData.startTime || !bookingData.endTime}
                            className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center"
                            onClick={handleBooking}
                        >
                            <Car className="w-5 h-5 mr-2" />
                            Book Vehicle
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VehicleBookingForm;