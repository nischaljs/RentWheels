import React, { useState } from 'react';
import Navbar from '../components/Global/Navbar';
import Hero from '../components/Home/Hero';
import CarsGrid from '../components/Home/CarsGrid';
import WhyChooseUs from '../components/Home/WhyChooseUs';
import TestimonialsCarousel from '../components/Home/TestimonialsCarousel';
import Footer from '../components/Global/Footer';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (query) => {
    setSearchQuery(query); // Update search query state
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section with Overlay */}
      <section className="relative">
        <Hero onSearch={handleSearch} /> {/* Pass handleSearch function */}
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-gray-50 to-transparent" />
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 lg:px-8 -mt-16 relative z-10">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-12">
          
            <div className="w-full">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Available Vehicles</h2>
                <p className="text-gray-600">Find your perfect rental from our premium selection</p>
              </div>
              <CarsGrid searchQuery={searchQuery} /> {/* Pass searchQuery as prop */}
            </div>

        </div>
        {/* Other sections */}
        <WhyChooseUs />
        <TestimonialsCarousel />
      </main>
        <div  className='w-screen'>
        <Footer />
        </div>
    </div>
  );
};

export default Home;
