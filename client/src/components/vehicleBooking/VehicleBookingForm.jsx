import React, { useState, useEffect, useCallback } from 'react';
import api from "../../services/api";
import Calendar from 'react-calendar';
import {
    Clock,
    X,
    Car,
    User,
    AlertCircle,
    CheckCircle,
    Calendar as CalendarIcon,
    RefreshCw,
    Info
} from 'lucide-react';
import UserPaymentForm from '../UserPayment/userPaymentForm';

// Convert 24hr time to 12hr format
const to12Hour = (time24) => {
    const [hours, minutes] = time24.split(':');
    const period = hours >= 12 ? 'PM' : 'AM';
    const hour12 = hours % 12 || 12;
    return `${hour12}:${minutes} ${period}`;
};

// Convert 12hr time to 24hr format
const to24Hour = (time12) => {
    const [time, period] = time12.split(' ');
    let [hours, minutes] = time.split(':');
    hours = parseInt(hours);

    if (period === 'PM' && hours !== 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;

    return `${hours.toString().padStart(2, '0')}:${minutes}`;
};

// Generate time slots
const generateTimeSlots = (startTime, endTime, minGap = 0) => {
    const slots = [];
    const start = parseInt(startTime.split(':')[0]);
    const end = parseInt(endTime.split(':')[0]);

    for (let hour = start; hour <= end - minGap; hour++) {
        slots.push(`${hour.toString().padStart(2, '0')}:00`);
        slots.push(`${hour.toString().padStart(2, '0')}:30`);
    }

    return slots.map(to12Hour);
};

const VehicleBookingForm = ({ onClose, vehicle, vehicleId }) => {
    const INITIAL_BOOKING_STATE = {
        startDate: null,
        startTime: '',
        endDate: null,
        endTime: '',
        driverRequired: false
    };

    const [bookingData, setBookingData] = useState(INITIAL_BOOKING_STATE);
    const [availabilitySlots, setAvailabilitySlots] = useState([]);
    const [availableTimeSlots, setAvailableTimeSlots] = useState({
        start: [],
        end: []
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const [selectedDateSlot, setSelectedDateSlot] = useState(null);
    const[confirmedBooking, setConfirmedBooking] = useState(false);

    // Fetch availability data
    useEffect(() => {
        const fetchAvailabilitySlots = async () => {
            try {
                setLoading(true);
                const response = await api.get(`/availability/${vehicleId}`);
                setAvailabilitySlots(response.data);
            } catch (err) {
                setError('Failed to fetch availability');
            } finally {
                setLoading(false);
            }
        };

        fetchAvailabilitySlots();
    }, [vehicleId]);

    // Get available time slots for a specific date
    const getAvailableTimesForDate = useCallback((date) => {
        const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
        const dateStr = date.toISOString().split('T')[0];

        const slot = availabilitySlots.find(slot => {
            if (slot.recurring) {
                return slot.dayOfWeek.includes(dayOfWeek);
            }
            return new Date(slot.specificDate).toISOString().split('T')[0] === dateStr;
        });

        return slot;
    }, [availabilitySlots]);

    // Handle date selection
    const handleDateSelect = useCallback((date) => {
        const slot = getAvailableTimesForDate(date);
        if (!slot) return;

        setSelectedDateSlot(slot);

        if (!bookingData.startDate) {
            // Selecting start date
            const startTimes = generateTimeSlots(slot.startTime, slot.endTime, 3);
            setBookingData(prev => ({
                ...prev,
                startDate: date,
                startTime: '',
                endDate: null,
                endTime: ''
            }));
            setAvailableTimeSlots(prev => ({ ...prev, start: startTimes }));
        } else {
            // Selecting end date
            let endTimes = [];
            if (date.toDateString() === bookingData.startDate.toDateString()) {
                // Same day booking - ensure 3 hour minimum
                const startTime24 = to24Hour(bookingData.startTime);
                const startHour = parseInt(startTime24.split(':')[0]);
                endTimes = generateTimeSlots(
                    `${startHour + 3}:00`,
                    slot.endTime
                );
            } else {
                // Multi-day booking
                endTimes = generateTimeSlots(slot.startTime, slot.endTime);
            }

            setBookingData(prev => ({
                ...prev,
                endDate: date,
                endTime: ''
            }));
            setAvailableTimeSlots(prev => ({ ...prev, end: endTimes }));
        }
        setError('');
    }, [bookingData.startDate, bookingData.startTime, getAvailableTimesForDate]);

    // Handle time selection
    const handleTimeChange = useCallback((e) => {
        const { name, value } = e.target;
        setBookingData(prev => ({ ...prev, [name]: value }));

        if (name === 'startTime' && bookingData.startDate) {
            // Update end time options when start time is selected
            const slot = getAvailableTimesForDate(bookingData.startDate);
            if (slot) {
                const startTime24 = to24Hour(value);
                const startHour = parseInt(startTime24.split(':')[0]);
                const endTimes = generateTimeSlots(
                    `${startHour + 3}:00`,
                    slot.endTime
                );
                setAvailableTimeSlots(prev => ({ ...prev, end: endTimes }));
            }
        }

        // Validate booking duration
        if (bookingData.startDate && bookingData.endDate && value) {
            const start = new Date(`${bookingData.startDate.toDateString()} ${bookingData.startTime}`);
            const end = new Date(`${bookingData.endDate.toDateString()} ${value}`);
            const duration = (end - start) / (1000 * 60 * 60);

            if (duration < 3) {
                setError('Booking must be at least 3 hours');
            } else {
                setError('');
            }
        }
    }, [bookingData.startDate, bookingData.endDate, getAvailableTimesForDate]);

    // Calendar tile customization
    const tileClassName = ({ date }) => {
        const classes = [];
        const hasAvailability = getAvailableTimesForDate(date);

        if (!hasAvailability) {
            classes.push('bg-gray-100 text-gray-400 cursor-not-allowed');
        } else {
            classes.push('bg-blue-50 hover:bg-blue-100 cursor-pointer');
        }

        if (bookingData.startDate && date.toDateString() === bookingData.startDate.toDateString()) {
            classes.push('bg-blue-500 text-white hover:bg-blue-600');
        }

        if (bookingData.endDate && date.toDateString() === bookingData.endDate.toDateString()) {
            classes.push('bg-blue-500 text-white hover:bg-blue-600');
        }

        return classes.join(' ');
    };

    const tileDisabled = ({ date }) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (date < today) return true;

        if (bookingData.startDate) {
            if (date < bookingData.startDate) return true;

            // Check if all dates between start and end have availability
            if (bookingData.startDate && date > bookingData.startDate) {
                const dateRange = [];
                let currentDate = new Date(bookingData.startDate);
                while (currentDate <= date) {
                    if (!getAvailableTimesForDate(currentDate)) {
                        return true;
                    }
                    currentDate.setDate(currentDate.getDate() + 1);
                }
            }
        }

        return !getAvailableTimesForDate(date);
    };

    // Handle booking submission
    const handleBooking = async () => {
        if (!bookingData.startDate || !bookingData.endDate ||
            !bookingData.startTime || !bookingData.endTime) {
            setError('Please select all required dates and times');
            return;
        }

        // try {
        //     setLoading(true);
        //     console.log(...bookingData + "booking happened")
        //     const response = await api.post('/bookings', {
        //         vehicleId,
        //         ...bookingData,
        //         startDate: new Date(`${bookingData.startDate.toDateString()} ${bookingData.startTime}`),
        //         endDate: new Date(`${bookingData.endDate.toDateString()} ${bookingData.endTime}`)
        //     });
        //     console.log(response.data);

        //     if (response.status === 200) {
        //         setSuccess('Booking confirmed successfully!');
        //         setTimeout(onClose, 2000);
        //     }
        // } catch (err) {
        //     setError('Failed to process booking. Please try again.');
        // } finally {
        //     setLoading(false);
        // }
        try{
            setLoading(true);
            console.log(bookingData);
            const response = await api.post('/availability/check',{
                vehicleId,
                startTime: bookingData.startTime,
                endTime: bookingData.endTime,
                startDate: new Date(`${bookingData.startDate.toDateString()} ${bookingData.startTime}`),
                endDate: new Date(`${bookingData.endDate.toDateString()} ${bookingData.endTime}`)
            })
            console.log(response.data);
            if(!response.data.isAvailable){
                setError('Vehicle is not available for the selected dates');
                return;
            }
            // const bookingResponse = await api.post('/bookings',{
            //     vehicleId,
            //     ...bookingData,
            //     startDate: new Date(`${bookingData.startDate.toDateString()} ${bookingData.startTime}`),
            //     endDate: new Date(`${bookingData.endDate.toDateString()} ${bookingData.endTime}`)
            // });
            // console.log(bookingResponse.data);
            // if(bookingResponse.status === 200){
            //     setConfirmedBooking(true);
            //     setTimeout(onClose, 2000);
            // }
            setConfirmedBooking(true);
        }
        catch(err){
            setError('Failed to process booking. Please try again.');
        }
        finally{
            setLoading(false);
        }
    };

    // Reset form
    const resetSelection = () => {
        setBookingData(INITIAL_BOOKING_STATE);
        setError('');
        setSuccess('');
        setSelectedDateSlot(null);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50">
            
            {confirmedBooking ? (
                <UserPaymentForm
                    vehicleId={vehicleId}
                    bookingData={bookingData}
                    onClose={onClose}
                    vehicle ={vehicle}
                 />
            ):
            (
                <div className="bg-white rounded-xl w-full max-w-3xl shadow-2xl max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="sticky top-0 flex items-center justify-between px-4 py-2 border-b bg-gray-50 rounded-t-xl">
                    <div className="flex items-center space-x-2">
                        <h2 className="text-lg font-semibold text-gray-800">Book Vehicle</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X className="w-4 h-4 text-gray-500" />
                    </button>
                </div>
    
                <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Left Column - Calendar */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between bg-blue-50 p-2 rounded-lg">
                            <div className="flex items-center space-x-2">
                                <CalendarIcon className="w-4 h-4 text-blue-600" />
                                <span className="text-sm font-medium text-blue-800">
                                    {!bookingData.startDate ? 'Select start date' : 'Select end date'}
                                </span>
                            </div>
                            <button
                                onClick={resetSelection}
                                className="flex items-center space-x-1 px-2 py-1 bg-white rounded-md shadow-sm hover:bg-gray-50 transition-colors"
                            >
                                <RefreshCw className="w-3 h-3 text-gray-600" />
                                <span className="text-xs text-gray-600">Reset</span>
                            </button>
                        </div>
    
                        <Calendar
                            onChange={handleDateSelect}
                            value={null}
                            tileDisabled={tileDisabled}
                            tileClassName={tileClassName}
                            minDate={new Date()}
                            className="w-full border rounded-lg shadow-sm p-2 bg-white text-sm"
                        />
    
                        {/* Time Selection */}
                        <div className="grid grid-cols-2 gap-2">
                            {bookingData.startDate && (
                                <div className="bg-white p-2 rounded-lg border border-gray-200">
                                    <label className="block text-xs font-medium text-gray-700 mb-1">
                                        Start Time
                                    </label>
                                    <select
                                        name="startTime"
                                        value={bookingData.startTime}
                                        onChange={handleTimeChange}
                                        className="w-full rounded-lg px-2 py-1 text-sm border-gray-300"
                                    >
                                        <option value="">Select time</option>
                                        {availableTimeSlots.start.map(time => (
                                            <option key={time} value={time}>{time}</option>
                                        ))}
                                    </select>
                                </div>
                            )}
    
                            {bookingData.endDate && (
                                <div className="bg-white p-2 rounded-lg border border-gray-200">
                                    <label className="block text-xs font-medium text-gray-700 mb-1">
                                        End Time
                                    </label>
                                    <select
                                        name="endTime"
                                        value={bookingData.endTime}
                                        onChange={handleTimeChange}
                                        className="w-full rounded-lg px-2 py-1 text-sm border-gray-300"
                                    >
                                        <option value="">Select time</option>
                                        {availableTimeSlots.end.map(time => (
                                            <option key={time} value={time}>{time}</option>
                                        ))}
                                    </select>
                                </div>
                            )}
                        </div>
                    </div>
    
                    {/* Right Column */}
                    <div className="space-y-3">
                        {/* Booking Summary */}
                        {bookingData.startDate && bookingData.endDate && bookingData.startTime && bookingData.endTime && (
                            <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                                <h4 className="text-xs font-medium text-blue-800 mb-2">Booking Summary</h4>
                                <div className="space-y-2 text-xs text-blue-700">
                                    <p className="flex items-center">
                                        <Clock className="w-3 h-3 mr-1" />
                                        Duration: {Math.ceil(
                                            (new Date(`${bookingData.endDate.toDateString()} ${bookingData.endTime}`) -
                                                new Date(`${bookingData.startDate.toDateString()} ${bookingData.startTime}`)) /
                                            (1000 * 60 * 60)
                                        )} hours
                                    </p>
                                    <div className="grid grid-cols-2 gap-2">
                                        <p className="space-x-1">
                                            <span className="font-medium">Start:</span>
                                            <span>
                                                {bookingData.startDate.toLocaleDateString('en-US', {
                                                    month: 'short',
                                                    day: 'numeric'
                                                })} {bookingData.startTime}
                                            </span>
                                        </p>
                                        <p className="space-x-1">
                                            <span className="font-medium">End:</span>
                                            <span>
                                                {bookingData.endDate.toLocaleDateString('en-US', {
                                                    month: 'short',
                                                    day: 'numeric'
                                                })} {bookingData.endTime}
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
    
                        {/* Driver Required Checkbox */}
                        <label className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                            <input
                                type="checkbox"
                                checked={bookingData.driverRequired}
                                onChange={(e) => setBookingData(prev => ({
                                    ...prev,
                                    driverRequired: e.target.checked
                                }))}
                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-sm text-gray-700 flex items-center">
                                <User className="w-4 h-4 mr-2 text-blue-600" />
                                Driver required
                            </span>
                        </label>
    
                        {/* Status Messages */}
                        {error && (
                            <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-2 rounded-lg border border-red-100">
                                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                                <p className="text-xs">{error}</p>
                            </div>
                        )}
    
                        {success && (
                            <div className="flex items-center space-x-2 text-green-600 bg-green-50 p-2 rounded-lg border border-green-100">
                                <CheckCircle className="w-4 h-4 flex-shrink-0" />
                                <p className="text-xs">{success}</p>
                            </div>
                        )}
    
                        {/* Book Button */}
                        <button
                            onClick={handleBooking}
                            disabled={
                                !bookingData.startDate ||
                                !bookingData.endDate ||
                                !bookingData.startTime ||
                                !bookingData.endTime ||
                                loading ||
                                error
                            }
                            className="w-full bg-blue-600 text-white py-2 rounded-lg disabled:bg-gray-300 
                                         disabled:cursor-not-allowed hover:bg-blue-700 transition-colors 
                                         flex items-center justify-center text-sm font-medium"
                        >
                            {loading ? (
                                <RefreshCw className="w-4 h-4 animate-spin" />
                            ) : (
                                <>
                                    <Car className="w-4 h-4 mr-2" />
                                    {bookingData.startDate && bookingData.endDate
                                        ? 'Confirm Booking'
                                        : 'Select Dates to Book'}
                                </>
                            )}
                        </button>
    
                        {/* Minimum Duration Notice */}
                        <div className="text-center text-xs text-gray-500 flex items-center justify-center">
                            <Info className="w-3 h-3 mr-1" />
                            Minimum booking duration: 3 hours
                        </div>
                    </div>
                </div>
    
                {bookingData.startDate && !bookingData.endDate && (
                    <div className="bg-blue-100 p-2 text-xs text-blue-800 flex items-center">
                        <Info className="w-3 h-3 mr-2 flex-shrink-0" />
                        Select end date. All dates between start and end must be available.
                    </div>
                )}
            </div>
            )
        }
        </div>
    );
};

export default VehicleBookingForm;