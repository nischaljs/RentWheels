import React from 'react';
import { Car, Shield, Users, Clock, Target, Award, ChevronRight, Building } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
    <div className="flex items-start space-x-4">
      <div className="bg-blue-50 p-3 rounded-xl">
        <Icon className="h-6 w-6 text-blue-600" />
      </div>
      <div>
        <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  </div>
);

const AboutPage = () => {
  const features = [
    {
      icon: Shield,
      title: "Trust & Safety",
      description: "Verified accounts, secure payments, and comprehensive insurance coverage for peace of mind."
    },
    {
      icon: Clock,
      title: "Flexible Rentals",
      description: "Book by the hour or day, with easy scheduling and instant confirmation."
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "A network of trusted vehicle owners and responsible renters."
    },
    {
      icon: Award,
      title: "Quality Assured",
      description: "All vehicles undergo regular inspections and maintenance checks."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white px-6 mt-10 shadow-md">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-blue-600 text-white">
        <div className="absolute inset-0 bg-[url('/api/placeholder/1920/400')] opacity-10 bg-cover bg-center" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Redefining Vehicle Rentals
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-2xl">
            Welcome to RentWheels, where we're transforming the way people think about vehicle rental through community, trust, and innovation.
          </p>
        </div>
      </div>

      {/* Mission Statement */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            At RentWheels, we believe that access to reliable transportation should be simple, flexible, and accessible to everyone. We're building a community that connects vehicle owners with renters, creating value through trust and convenience.
          </p>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>

      {/* For Renters & Owners Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          {/* For Renters */}
          <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl border border-blue-100">
            <div className="flex items-center space-x-3 mb-6">
              <Car className="h-6 w-6 text-blue-600" />
              <h3 className="text-2xl font-bold text-gray-900">For Renters</h3>
            </div>
            <ul className="space-y-4">
              {[
                "Wide selection of verified vehicles",
                "Flexible booking options",
                "Transparent pricing",
                "24/7 customer support",
                "Instant booking confirmation"
              ].map((item) => (
                <li key={item} className="flex items-center space-x-3">
                  <ChevronRight className="h-4 w-4 text-blue-600 flex-shrink-0" />
                  <span className="text-gray-600">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* For Owners */}
          <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border border-gray-100">
            <div className="flex items-center space-x-3 mb-6">
              <Building className="h-6 w-6 text-gray-600" />
              <h3 className="text-2xl font-bold text-gray-900">For Owners</h3>
            </div>
            <ul className="space-y-4">
              {[
                "Easy vehicle listing process",
                "Set your own availability",
                "Secure payment system",
                "Insurance coverage",
                "Verified renter profiles"
              ].map((item) => (
                <li key={item} className="flex items-center space-x-3">
                  <ChevronRight className="h-4 w-4 text-gray-600 flex-shrink-0" />
                  <span className="text-gray-600">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Vision Section */}
      <div className="bg-gray-50 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block p-3 bg-blue-50 rounded-2xl mb-6">
              <Target className="h-8 w-8 text-blue-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Vision</h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              We're building more than just a rental platform. RentWheels aims to create a sustainable, community-driven ecosystem that transforms vehicle access while promoting economic opportunities and environmental responsibility.
            </p>
            <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200">
              Join Our Community
              <ChevronRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;