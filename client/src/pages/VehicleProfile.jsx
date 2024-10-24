import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Car, 
  Calendar,
  User,
  Clock,
  Settings,
  DollarSign,
  Star,
  Shield,
  Check,
  X
} from 'lucide-react';
import { useParams } from 'react-router-dom';

const VehicleProfile = () => {
    const {vehicleId} = useParams();
  // State for vehicle data
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDates, setSelectedDates] = useState({ start: null, end: null });
  const [activeTab, setActiveTab] = useState('overview');

  // Fetch vehicle data
  useEffect(() => {
    const fetchVehicleData = async () => {
      try {
        setLoading(true);
        // Uncomment below lines when connecting to backend
        // const response = await axios.get(`/api/vehicles/${vehicleId}`);
        // setVehicle(response.data);

        // Sample data for now
        const sampleData = {
          id: 1,
          name: "Tesla Model X 2023",
          type: "SUV",
          seater: 7,
          transmission: "AUTOMATIC",
          pricePerDay: 299.99,
          available: true,
          driverAvailable: true,
          approved: true,
          image: "/api/placeholder/800/400",
          owner: {
            id: 1,
            fullName: "John Smith",
            email: "john@example.com",
            phone: "123-456-7890"
          },
          availabilitySlots: [
            { id: 1, dayOfWeek: "Monday", startTime: "09:00", endTime: "18:00" },
            { id: 2, dayOfWeek: "Tuesday", startTime: "09:00", endTime: "18:00" },
            { id: 3, dayOfWeek: "Wednesday", startTime: "09:00", endTime: "18:00" }
          ],
          reviews: [
            {
              id: 1,
              rating: 5,
              comment: "Amazing vehicle! Very clean and smooth drive.",
              createdAt: "2024-03-15T10:00:00Z",
              user: { fullName: "Alice Johnson" }
            },
            {
              id: 2,
              rating: 4,
              comment: "Great experience overall. Would rent again.",
              createdAt: "2024-03-10T15:30:00Z",
              user: { fullName: "Bob Wilson" }
            }
          ],
          documents: [
            { id: 1, type: "Insurance", fileUrl: "insurance.pdf" },
            { id: 2, type: "Registration", fileUrl: "registration.pdf" }
          ]
        };
        
        setVehicle(sampleData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching vehicle data:', error);
        setLoading(false);
      }
    };

    fetchVehicleData();
  }, [vehicleId]);

  const TabButton = ({ label, value, icon: Icon }) => (
    <button
      onClick={() => setActiveTab(value)}
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
        activeTab === value
          ? 'bg-blue-50 text-blue-600'
          : 'text-gray-600 hover:bg-gray-50'
      }`}
    >
      <Icon className="w-4 h-4" />
      <span>{label}</span>
    </button>
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Vehicle Image */}
      <div className="relative h-96 bg-gray-900">
        <img
        //   src={vehicle.image}
        src='https://hips.hearstapps.com/hmg-prod/images/2020-tesla-model-x-123-656e3825810bc.jpg?crop=0.479xw:0.433xh;0.261xw,0.297xh&resize=2048:*'
          alt={vehicle.name}
          className="w-full h-full object-cover opacity-75"
        />
        <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-gray-900">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold text-white mb-2">{vehicle.name}</h1>
            <div className="flex items-center space-x-4 text-white">
              <span className="flex items-center">
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400 mr-1" />
                4.8 (24 reviews)
              </span>
              <span>•</span>
              <span className="flex items-center">
                <User className="w-5 h-5 mr-1" />
                {vehicle.seater} Seater
              </span>
              <span>•</span>
              <span className="flex items-center">
                <Settings className="w-5 h-5 mr-1" />
                {vehicle.transmission}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Vehicle Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Tabs Navigation */}
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="flex space-x-4">
                <TabButton label="Overview" value="overview" icon={Car} />
                <TabButton label="Availability" value="availability" icon={Calendar} />
                <TabButton label="Reviews" value="reviews" icon={Star} />
              </div>
            </div>

            {/* Tab Content */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold">Vehicle Details</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3">
                      <div className="rounded-lg bg-blue-50 p-2">
                        <Car className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Type</p>
                        <p className="font-medium">{vehicle.type}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="rounded-lg bg-blue-50 p-2">
                        <User className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Seating</p>
                        <p className="font-medium">{vehicle.seater} Persons</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="rounded-lg bg-blue-50 p-2">
                        <Settings className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Transmission</p>
                        <p className="font-medium">{vehicle.transmission}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="rounded-lg bg-green-50 p-2">
                        <Shield className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Driver Available</p>
                        <p className="font-medium">
                          {vehicle.driverAvailable ? (
                            <span className="text-green-600">Yes</span>
                          ) : (
                            <span className="text-red-600">No</span>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Owner Information */}
                  <div className="mt-8">
                    <h3 className="text-lg font-semibold mb-4">Owner Information</h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                          <User className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium">{vehicle.owner.fullName}</p>
                          <p className="text-sm text-gray-500">{vehicle.owner.email}</p>
                          <p className="text-sm text-gray-500">{vehicle.owner.phone}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'availability' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold">Availability Schedule</h2>
                  <div className="space-y-4">
                    {vehicle.availabilitySlots.map(slot => (
                      <div key={slot.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <Clock className="w-5 h-5 text-blue-600" />
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

              {activeTab === 'reviews' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold">Customer Reviews</h2>
                  <div className="space-y-6">
                    {vehicle.reviews.map(review => (
                      <div key={review.id} className="border-b border-gray-100 pb-6">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                              <User className="w-4 h-4 text-blue-600" />
                            </div>
                            <span className="font-medium">{review.user.fullName}</span>
                          </div>
                          <div className="flex">
                            {renderStars(review.rating)}
                          </div>
                        </div>
                        <p className="text-gray-600">{review.comment}</p>
                        <p className="text-sm text-gray-400 mt-2">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-8">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">${vehicle.pricePerDay}</span>
                  <span className="text-gray-500">per day</span>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Pick-up Date
                    </label>
                    <input
                      type="date"
                      className="w-full rounded-lg border border-gray-200 px-4 py-2.5"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Return Date
                    </label>
                    <input
                      type="date"
                      className="w-full rounded-lg border border-gray-200 px-4 py-2.5"
                    />
                  </div>
                  
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-blue-600"
                    />
                    <span className="text-sm text-gray-600">Include driver (+$50/day)</span>
                  </label>
                </div>

                <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                  Book Now
                </button>

                <div className="text-center">
                  <p className="text-sm text-gray-500">
                    Free cancellation up to 24 hours before pickup
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleProfile;