import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Car, Calendar, User, Clock, Settings, 
  DollarSign, Star, Shield, MapPin, 
  MessageCircle, ThumbsUp, Phone, Mail
} from 'lucide-react';
import { useParams } from 'react-router-dom';

const VehicleProfile = () => {
  const { vehicleId } = useParams();
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  
  const baseUrl = import.meta.env.VITE_API_URL;
  const imgBaseUrl = import.meta.env.VITE_IMG_URL;

  useEffect(() => {
    const fetchVehicleData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${baseUrl}/vehicles/${vehicleId}`);
        setVehicle(response.data.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch vehicle details.');
        setLoading(false);
      }
    };
    fetchVehicleData();
  }, [vehicleId]);

  const TabButton = ({ label, value, icon: Icon, count }) => (
    <button
      onClick={() => setActiveTab(value)}
      className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all duration-200 ${
        activeTab === value
          ? 'bg-blue-50 text-blue-600 shadow-sm'
          : 'text-gray-600 hover:bg-gray-50'
      }`}
    >
      <Icon className="w-5 h-5" />
      <span className="font-medium">{label}</span>
      {count && (
        <span className={`text-sm px-2 py-0.5 rounded-full ${
          activeTab === value ? 'bg-blue-100' : 'bg-gray-100'
        }`}>
          {count}
        </span>
      )}
    </button>
  );

  const renderStars = (rating) => (
    <div className="flex">
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}
          className={`w-4 h-4 ${
            index < (rating ?? 0) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
          }`}
        />
      ))}
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 bg-red-50 px-6 py-4 rounded-lg">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[500px] bg-gray-900">
        <img
          src={`${imgBaseUrl}${vehicle?.image}`}
          alt={vehicle?.name}
          className="w-full h-full object-cover opacity-85"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center space-x-4 text-white/80 mb-4">
              <span className="px-3 py-1 bg-blue-600/90 rounded-full text-sm">
                {vehicle?.type}
              </span>
              <span className="px-3 py-1 bg-green-500/90 rounded-full text-sm">
                {vehicle?.available ? 'Available' : 'Not Available'}
              </span>
            </div>
            <h1 className="text-5xl font-bold text-white mb-4">{vehicle?.name}</h1>
            <div className="flex items-center space-x-6 text-white">
              <div className="flex items-center space-x-2">
                <DollarSign className="w-5 h-5" />
                <span className="text-xl font-semibold">{vehicle?.pricePerDay}/day</span>
              </div>
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5" />
                <span>{vehicle?.seater} Seats</span>
              </div>
              <div className="flex items-center space-x-2">
                <Settings className="w-5 h-5" />
                <span>{vehicle?.transmission}</span>
              </div>
              {vehicle?.reviews?.length > 0 && (
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  <span>{vehicle?.reviews?.length} reviews</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tabs */}
            <div className="bg-white rounded-xl shadow-sm p-2">
              <div className="flex space-x-2">
                <TabButton label="Overview" value="overview" icon={Car} />
                <TabButton 
                  label="Reviews" 
                  value="reviews" 
                  icon={MessageCircle} 
                  count={vehicle?.reviews?.length} 
                />
                <TabButton label="Availability" value="availability" icon={Calendar} />
              </div>
            </div>

            {/* Tab Content */}
            <div className="bg-white rounded-xl shadow-sm p-8">
              {activeTab === 'overview' && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-semibold mb-6">Vehicle Features</h2>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                        <div className="bg-blue-100 p-3 rounded-lg">
                          <Car className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Vehicle Type</p>
                          <p className="font-semibold">{vehicle?.type}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                        <div className="bg-green-100 p-3 rounded-lg">
                          <User className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Capacity</p>
                          <p className="font-semibold">{vehicle?.seater} Persons</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                        <div className="bg-purple-100 p-3 rounded-lg">
                          <Settings className="w-6 h-6 text-purple-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Transmission</p>
                          <p className="font-semibold">{vehicle?.transmission}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                        <div className="bg-orange-100 p-3 rounded-lg">
                          <Shield className="w-6 h-6 text-orange-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Driver Service</p>
                          <p className="font-semibold">
                            {vehicle?.driverAvailable ? (
                              <span className="text-green-600">Available</span>
                            ) : (
                              <span className="text-red-600">Not Available</span>
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Owner Information */}
                  <div>
                    <h2 className="text-2xl font-semibold mb-6">Vehicle Owner</h2>
                    <div className="bg-gray-50 rounded-xl p-6">
                      <div className="flex items-center space-x-6">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                          <User className="w-8 h-8 text-blue-600" />
                        </div>
                        <div className="space-y-2">
                          <h3 className="text-xl font-semibold">{vehicle?.owner?.fullName}</h3>
                          <div className="flex space-x-4 text-gray-600">
                            <div className="flex items-center space-x-2">
                              <Mail className="w-4 h-4" />
                              <span>{vehicle?.owner?.email}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Phone className="w-4 h-4" />
                              <span>{vehicle?.owner?.phone}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-semibold">Customer Reviews</h2>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      Write Review
                    </button>
                  </div>
                  <div className="space-y-6">
                    {vehicle?.reviews?.map((review) => (
                      <div key={review.id} className="bg-gray-50 rounded-xl p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                              <User className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                              <h3 className="font-semibold">{review.user?.fullName}</h3>
                              <p className="text-sm text-gray-500">
                                {new Date(review.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          {renderStars(review.rating)}
                        </div>
                        <p className="text-gray-600">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'availability' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold mb-6">Availability Schedule</h2>
                  <div className="grid gap-4">
                    {vehicle?.availabilitySlots?.map((slot) => (
                      <div 
                        key={slot.id}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="bg-blue-100 p-2 rounded-lg">
                            <Clock className="w-5 h-5 text-blue-600" />
                          </div>
                          <span className="font-medium">{slot.dayOfWeek}</span>
                        </div>
                        <div className="text-gray-600">
                          {slot.startTime} - {slot.endTime}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Booking Widget */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-8">
              <h3 className="text-xl font-semibold mb-4">Book this vehicle</h3>
              <div className="space-y-4 mb-6">
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Price per day</span>
                    <span className="text-xl font-bold text-blue-600">
                      ${vehicle?.pricePerDay}
                    </span>
                  </div>
                </div>
              </div>
              <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleProfile;