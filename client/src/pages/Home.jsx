import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import FilterSidebar from '../components/FilterSidebar'
import CarsGrid from '../components/CarsGrid'
import WhyChooseUs from '../components/WhyChooseUs'
import TestimonialsCarousel from '../components/TestimonialsCarousel'
import Footer from '../components/Footer'

const cars = [
  {
    id: 1,
    name: 'Land Rover Defender Sports',
    image: '/images/defender.jpg',
    transmission: 'Automatic',
    capacity: 4,
    price: 390,
  },
  {
    id: 2,
    name: 'Mercedes-Benz GLC Coupe',
    image: '/images/glc.jpg',
    transmission: 'Automatic',
    capacity: 4,
    price: 420,
  },
  {
    id: 3,
    name: 'BMW X5',
    image: '/images/x5.jpg',
    transmission: 'Automatic',
    capacity: 5,
    price: 450,
  },
  {
    id: 4,
    name: 'Audi Q7',
    image: '/images/q7.jpg',
    transmission: 'Automatic',
    capacity: 7,
    price: 500,
  },
  {
    id: 5,
    name: 'Tesla Model X',
    image: '/images/modelx.jpg',
    transmission: 'Automatic',
    capacity: 5,
    price: 600,
  },
  // Add more car objects here
];

const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <div className="flex flex-col lg:flex-row px-4 lg:px-12 py-4">
        {/* Filter Sidebar */}
        <div className="hidden lg:block lg:w-1/4">
          <FilterSidebar />
        </div>

        {/* Car Grid */}
        <div className="w-full lg:w-3/4 p-4 lg:p-6">
          <CarsGrid cars={cars} />
        </div>
      </div>
      <div className='w-full flex items-center justify-center my-8'>
        <img src="whychooseusbanner.png" className='w-full lg:w-6/12' alt="Why Choose Us" />
      </div>
      <div className='w-full px-4 lg:px-36'>
        <WhyChooseUs />
        <TestimonialsCarousel />
      </div>
      <Footer />
    </div>
  )
}

export default Home