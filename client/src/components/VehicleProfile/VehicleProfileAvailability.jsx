import React from 'react';
import { Calendar, Clock, Repeat, CalendarCheck, ChevronRight, AlertCircle } from 'lucide-react';

const VehicleProfileAvailability = ({ availabilitySlots }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const parseRecurringDays = (daysString) => {
    try {
      return JSON.parse(daysString);
    } catch {
      return [];
    }
  };

  const getTimeframe = (startTime, endTime) => {
    const duration = (time1, time2) => {
      const [h1, m1] = time1.match(/\d+/g);
      const [h2, m2] = time2.match(/\d+/g);
      const mins = (Number(h2) * 60 + Number(m2)) - (Number(h1) * 60 + Number(m1));
      return `${Math.floor(mins / 60)}h ${mins % 60}m`;
    };

    return duration(startTime, endTime);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-blue-100 p-2 rounded-lg">
            <Calendar className="w-6 h-6 text-blue-600" />
          </div>
          <h2 className="text-2xl font-semibold">Availability Schedule</h2>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <AlertCircle className="w-4 h-4" />
          <span>{availabilitySlots.length} time slots</span>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Recurring Slots Section */}
        {availabilitySlots.filter(slot => slot.recurring).map((slot) => (
          <div 
            key={slot.id}
            className="bg-gradient-to-br from-emerald-50 to-white p-1 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
          >
            <div className="bg-white rounded-lg p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Repeat className="w-5 h-5 text-emerald-600" />
                  <span className="font-semibold text-emerald-700">Recurring Schedule</span>
                </div>
                <span className="px-3 py-1 text-xs font-medium text-emerald-700 bg-emerald-50 rounded-full">
                  Weekly
                </span>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {parseRecurringDays(slot.dayOfWeek).map((day) => (
                  <span 
                    key={day}
                    className="px-3 py-1 text-sm bg-emerald-50 text-emerald-700 rounded-full"
                  >
                    {day}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between text-gray-600 pt-2 border-t">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    {slot.startTime} - {slot.endTime}
                  </span>
                </div>
                <span className="text-xs font-medium text-gray-500">
                  Duration: {getTimeframe(slot.startTime, slot.endTime)}
                </span>
              </div>
            </div>
          </div>
        ))}

        {/* One-time Slots Section */}
        {availabilitySlots.filter(slot => !slot.recurring&& new Date(slot.specificDate) >= new Date()).map((slot) => (
          <div 
            key={slot.id}
            className={`p-1 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 ${
              new Date(slot.specificDate) < new Date()
                ? "bg-gradient-to-br from-red-300 to-white"
                : "bg-gradient-to-br from-blue-50 to-white"
            }`}
          >
            <div className="bg-white rounded-lg p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CalendarCheck className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold text-blue-700">One-time Slot</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>

              <div className="space-y-1">
                <div className="text-gray-900 font-medium">
                  {formatDate(slot.specificDate)}
                </div>
                <div className="flex items-center justify-between text-gray-600">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">
                      {slot.startTime} - {slot.endTime}
                    </span>
                  </div>
                  <span className="text-xs font-medium text-gray-500">
                    Duration: {getTimeframe(slot.startTime, slot.endTime)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {availabilitySlots.length === 0 && (
        <div className="bg-gray-50 rounded-xl p-8 text-center">
          <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <p className="font-medium text-gray-900">No availability slots found</p>
          <p className="text-sm text-gray-500 mt-1">Add some availability slots to get started</p>
        </div>
      )}
    </div>
  );
};

export default VehicleProfileAvailability;