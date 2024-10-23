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
    id: 1,
    name: 'Land Rover Defender Sports',
    image: '/images/defender.jpg',
    transmission: 'Automatic',
    capacity: 4,
    price: 390,
  },
  {
    id: 1,
    name: 'Land Rover Defender Sports',
    image: '/images/defender.jpg',
    transmission: 'Automatic',
    capacity: 4,
    price: 390,
  },
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
    price: 390,
  },
  // Add more car objects here
];

const Home = () => {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <div className="flex px-12 py-4">
      {/* Filter Sidebar */}
      <div className="hidden lg:block w-1/4">
        <FilterSidebar />
      </div>

      {/* Car Grid */}
      <div className="w-full lg:w-3/4 p-6">
        <CarsGrid cars={cars} />
      </div>
    </div>
   <div className='w-full flex items-center justify-center'>
   <img src="whychooseusbanner.png" className='w-6/12' />
   </div>
    <div className='w-full px-36'>
    <WhyChooseUs/>
    <TestimonialsCarousel/>
    </div>
    <Footer/>
    </div>
  )
}

export default Home