import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  MessageSquare,
  Clock,
  Send,
  Linkedin,
  Twitter,
  Instagram,
  CheckCircle
} from 'lucide-react';

const ContactCard = ({ icon: Icon, title, content, link }) => (
  <a
    href={link}
    className="flex items-center space-x-4 p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group"
  >
    <div className="bg-blue-50 p-3 rounded-xl group-hover:bg-blue-100 transition-colors duration-300">
      <Icon className="h-6 w-6 text-blue-600" />
    </div>
    <div>
      <h3 className="font-medium text-gray-500">{title}</h3>
      <p className="text-gray-900 font-semibold">{content}</p>
    </div>
  </a>
);

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    // Handle form submission logic here
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b mt-10 from-gray-50 to-white px-6 py-12">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Get in Touch
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Have questions about RentWheels? We're here to help and would love to hear from you.
        </p>
      </div>

      {/* Contact Cards Grid */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        <ContactCard
          icon={Mail}
          title="Email Us"
          content="support@rentwheels.com"
          link="mailto:support@rentwheels.com"
        />
        <ContactCard
          icon={Phone}
          title="Call Us"
          content="+1 (555) 123-4567"
          link="tel:+15551234567"
        />
        <ContactCard
          icon={MapPin}
          title="Location"
          content="123 Rental Street, Itahari"
          link="https://maps.google.com"
        />
        <ContactCard
          icon={Clock}
          title="Business Hours"
          content="Mon-Fri, 9:00 AM - 6:00 PM"
          link="#"
        />
      </div>

      {/* Contact Form Section */}
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="grid md:grid-cols-5">
          {/* Left Column - Form */}
          <div className="p-8 md:p-12 md:col-span-3">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 resize-none"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-xl transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <span>Send Message</span>
                  <Send className="h-5 w-5" />
                </button>
              </form>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                <div className="bg-blue-50 p-4 rounded-full">
                  <CheckCircle className="h-12 w-12 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Message Sent!</h3>
                <p className="text-gray-600">
                  Thank you for reaching out. We'll get back to you shortly.
                </p>
              </div>
            )}
          </div>

          {/* Right Column - Additional Info */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-8 md:p-12 md:col-span-2 text-white">
            <div className="h-full flex flex-col">
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-4">Connect With Us</h3>
                <p className="text-blue-100">
                  Join our community and stay updated with the latest news and offers.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <MessageSquare className="h-6 w-6" />
                  <div>
                    <h4 className="font-medium">Live Chat</h4>
                    <p className="text-blue-100 text-sm">Available 24/7</p>
                  </div>
                </div>
              </div>

              <div className="mt-auto">
                <h4 className="font-medium mb-4">Follow Us</h4>
                <div className="flex space-x-4">
                  <a href="#" className="p-2 bg-blue-500 rounded-full hover:bg-blue-400 transition-colors duration-200">
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a href="#" className="p-2 bg-blue-500 rounded-full hover:bg-blue-400 transition-colors duration-200">
                    <Twitter className="h-5 w-5" />
                  </a>
                  <a href="#" className="p-2 bg-blue-500 rounded-full hover:bg-blue-400 transition-colors duration-200">
                    <Instagram className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;