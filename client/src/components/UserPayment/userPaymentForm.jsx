import React, { useState } from 'react';
import { Clock, AlertCircle, Receipt, Calendar, X } from 'lucide-react';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const UserPaymentForm = ({ vehicleId, bookingData, onClose, vehicle }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const {user} = useAuth();

    // Calculate total hours using Date objects (wrap bookingData.startDate, etc.)
    const totalHours = bookingData.startDate && bookingData.endDate ?
        Math.ceil(
            (new Date(`${new Date(bookingData.endDate).toDateString()} ${bookingData.endTime}`) -
             new Date(`${new Date(bookingData.startDate).toDateString()} ${bookingData.startTime}`)) /
            (1000 * 60 * 60)
        ) : 0;

    // Calculate total price (price per day converted to hours)
    const hourlyRate = vehicle.pricePerDay / 24;
    const totalPrice = Math.ceil(totalHours * hourlyRate);

    // Handle Khalti Checkout
    const handleKhaltiCheckOut = async () => {
        try {
            setIsLoading(true);
            setError(null);
    
            const bookingResponse = await api.post('/bookings/create', {
                vehicleId,
                startDate: new Date(`${bookingData.startDate.toDateString()} ${bookingData.startTime}`),
                endDate: new Date(`${bookingData.endDate.toDateString()} ${bookingData.endTime}`),
                totalPrice,
                status: 'PENDING',
                driverRequired: bookingData.driverRequired
            });
    
            
            if (bookingResponse.status !== 201) throw new Error('Booking creation failed');
    
            const pendingBookingData = bookingResponse.data.data;
    
            
            const paymentResponse = await api.post(`/payments/create`, {
                amount: totalPrice,
                purchase_order_id: pendingBookingData.id,
                purchase_order_name: vehicle.name,
                vehicleId,
                customer_info: user,
                return_url: 'http://localhost:3000/payment/success',
                website_url: 'http://localhost:3000'
            });
           
    
            if (!paymentResponse.data.success) throw new Error(paymentResponse.data.message);
    
            // Redirect to Khalti payment page
            const paymentInitiationUrl = paymentResponse.data.data.paymentInitiationUrl;
            window.location.href = paymentInitiationUrl;
    
        } catch (err) {
            setError(err.message || 'Payment initialization failed');
            console.error('Payment error:', err);
        } finally {
            setIsLoading(false);
        }
    };
    

    return (
        <div className="bg-white rounded-xl w-full max-w-3xl shadow-2xl max-h-[90vh] space-y-4 overflow-y-auto p-8">
            {/* Existing header code remains the same */}
            <div className='w-full px-10 flex items-center justify-between'>
                <h1 className="text-2xl font-bold text-gray-900">Payment Details</h1>
                <button
                    onClick={onClose}
                    className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                >
                    <X className="w-4 h-4 text-gray-500" />
                </button>
            </div>
            {/* Warning Message */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-center">
                    <AlertCircle className="w-5 h-5 text-yellow-600 mr-2" />
                    <p className="text-sm text-yellow-700">
                        Your booking is not yet confirmed. The selected time slot is available, but booking will only be confirmed after successful payment.
                        Quiting here will cancel the booking.
                    </p>
                </div>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-center">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
                        <p className="text-sm text-red-700">{error}</p>
                    </div>
                </div>
            )}

                        {/* Booking Summary */}
            {bookingData.startDate && bookingData.endDate && bookingData.startTime && bookingData.endTime && (
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                    <h4 className="text-sm font-medium text-blue-800 mb-3">Booking Summary</h4>
                    <div className="space-y-3 text-sm text-blue-700">
                        <p className="flex items-center">
                            <Clock className="w-4 h-4 mr-2" />
                            Duration: {totalHours} hours
                        </p>
                        <div className="grid grid-cols-2 gap-3">
                            <p className="flex items-center">
                                <Calendar className="w-4 h-4 mr-2" />
                                <span className="font-medium">Start:</span>
                                <span className="ml-1">
                                    {bookingData.startDate.toLocaleDateString('en-US', {
                                        month: 'short',
                                        day: 'numeric'
                                    })} {bookingData.startTime}
                                </span>
                            </p>
                            <p className="flex items-center">
                                <Calendar className="w-4 h-4 mr-2" />
                                <span className="font-medium">End:</span>
                                <span className="ml-1">
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

            {/* Invoice Section */}
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="flex items-center mb-3">
                    <Receipt className="w-4 h-4 mr-2 text-gray-600" />
                    <h4 className="text-sm font-medium text-gray-800">Invoice Details</h4>
                </div>
                <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                        <span className="text-gray-600">Vehicle</span>
                        <span className="font-medium">{vehicle.name}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Rate</span>
                        <span className="font-medium">Rs. {Math.ceil(hourlyRate)} per hour</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Duration</span>
                        <span className="font-medium">{totalHours} hours</span>
                    </div>
                    <div className="h-px bg-gray-200 my-2" />
                    <div className="flex justify-between text-base font-semibold">
                        <span>Total Amount</span>
                        <span>Rs. {totalPrice}</span>
                    </div>
                </div>
            </div>

            {/* Payment Button */}
            <button
                className={`w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center ${
                    isLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                onClick={handleKhaltiCheckOut}
                disabled={isLoading}
            >
                {isLoading ? 'Processing...' : 'Pay via Khalti'}
            </button>
        </div>
    );
};

export default UserPaymentForm;