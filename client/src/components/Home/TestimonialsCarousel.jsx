import React from 'react';
import Slider from 'react-slick'; // react-slick for the carousel

const TestimonialsCarousel = () => {
  // Slider settings for autoplay and other behaviors
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2, // Number of testimonials to show at once
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000, // 3 seconds for each slide
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  // Testimonials Data (for example)
  const testimonials = [
    {
      text: "Amazing service and very friendly staff. I will definitely rent from them again!",
      name: "Jane Doe",
      location: "New York",
      rating: 5,
      image: "https://cdn.pixabay.com/photo/2022/10/07/18/35/potrait-7505634_960_720.jpg", // Replace with actual images
    },
    {
      text: "Great experience! The car was clean and the customer service was excellent.",
      name: "John Smith",
      location: "Los Angeles",
      rating: 5,
      image: "https://cdn.pixabay.com/photo/2018/01/22/07/31/portrait-3098319_960_720.jpg",
    },
    // Add more testimonials here...
  ];

  return (
    <div className="my-12">
      <div className="text-center">
        <h3 className="text-indigo-600 font-bold text-lg mb-2">Reviewed by People</h3>
        <h2 className="text-3xl font-extrabold mb-4">Client's Testimonials</h2>
        <p className="text-gray-600 mb-8">
          Discover the positive impact we've made on our clients by reading through their testimonials. Our clients have experienced our service and results, and they're eager to share their positive experiences with you.
        </p>
      </div>

      {/* Testimonial Slider */}
      <Slider {...settings}>
        {testimonials.map((testimonial, index) => (
          <div key={index} className="p-6">
            <div className="bg-white p-6 shadow-lg rounded-lg flex flex-col items-center text-center">
              <p className="text-gray-600 mb-6">"{testimonial.text}"</p>
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-16 h-16 rounded-full mb-4 object-center object-cover"
              />
              <h4 className="font-bold text-lg">{testimonial.name}</h4>
              <p className="text-sm text-gray-500">{testimonial.location}</p>
              <div className="text-red-500 flex">
                {/* Display star ratings */}
                {'★'.repeat(testimonial.rating).padEnd(5, '☆')}
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default TestimonialsCarousel;
