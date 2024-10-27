import React, { useState } from 'react';
import { User, Mail, Phone, Pencil, Calendar, MapPin } from 'lucide-react';
import ProfileEditForm from '../ProfileEditForm';

const UserProfile = ({ user }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  return (
    <>
      <div className="w-full bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header with background and avatar */}
        <div className="relative h-32 bg-gradient-to-r from-blue-500 to-blue-600">
          <div className="absolute -bottom-12 left-6">
            <div className="rounded-full bg-white p-1 shadow-lg">
              <div className="bg-gray-100 rounded-full p-4">
                <User size={48} className="text-blue-600" />
              </div>
            </div>
          </div>
          <button 
            onClick={() => setIsEditModalOpen(true)}
            className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm transition-colors"
          >
            <Pencil size={20} className="text-white" />
          </button>
        </div>

        {/* Profile Content */}
        <div className="pt-16 px-6 pb-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800">{user.fullName}</h2>
            <p className="text-gray-500">Vehicle Rental Customer</p>
          </div>

          {/* Info Grid */}
          <div className="space-y-4">
            {/* Email Row */}
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Mail size={20} className="text-blue-600" />
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="text-gray-700">{user.email}</p>
              </div>
            </div>

            {/* Phone Row */}
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Phone size={20} className="text-blue-600" />
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="text-gray-700">{user.phone}</p>
              </div>
            </div>


            {/* Location Row (if you want to add location in the future) */}
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <MapPin size={20} className="text-blue-600" />
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="text-gray-700">Not specified</p>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="mt-6 pt-6 border-t border-gray-100">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-semibold text-blue-600">
                  {user.bookings?.length || 0}
                </p>
                <p className="text-sm text-gray-500">Bookings</p>
              </div>
              <div>
                <p className="text-2xl font-semibold text-blue-600">
                  {user.reviews?.length || 0}
                </p>
                <p className="text-sm text-gray-500">Reviews</p>
              </div>
              <div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <ProfileEditForm 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)}
        user={user}
      />
    </>
  );
};

export default UserProfile;