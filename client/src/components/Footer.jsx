import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-800">
      {/* Footer Top Section */}
      <div className="footer-top"></div>

      {/* Links Section */}
      <div className="footer-links flex flex-wrap justify-around py-8 px-20">
        {/* Useful Links */}
        <div className="link-column mb-4 flex-1">
          <h3 className="text-lg font-semibold mb-2 relative">Useful Links</h3>
          <ul className="list-none p-0 m-0">
            <li className="mb-1"><a href="#" className="text-gray-800 hover:text-blue-500">About Us</a></li>
            <li className="mb-1"><a href="#" className="text-gray-800 hover:text-blue-500">Contact Us</a></li>
            <li className="mb-1"><a href="#" className="text-gray-800 hover:text-blue-500">FAQs</a></li>
            <li className="mb-1"><a href="#" className="text-gray-800 hover:text-blue-500">Terms of Service</a></li>
            <li className="mb-1"><a href="#" className="text-gray-800 hover:text-blue-500">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Careers */}
        <div className="link-column mb-4 flex-1">
          <h3 className="text-lg font-semibold mb-2 relative">Careers</h3>
          <ul className="list-none p-0 m-0">
            <li className="mb-1"><a href="#" className="text-gray-800 hover:text-blue-500">Blog</a></li>
            <li className="mb-1"><a href="#" className="text-gray-800 hover:text-blue-500">Press</a></li>
            <li className="mb-1"><a href="#" className="text-gray-800 hover:text-blue-500">Partnerships</a></li>
          </ul>
        </div>

        {/* Resources */}
        <div className="link-column mb-4 flex-1">
          <h3 className="text-lg font-semibold mb-2 relative">Resources</h3>
          <ul className="list-none p-0 m-0">
            <li className="mb-1"><a href="#" className="text-gray-800 hover:text-blue-500">Events</a></li>
            <li className="mb-1"><a href="#" className="text-gray-800 hover:text-blue-500">Community</a></li>
            <li className="mb-1"><a href="#" className="text-gray-800 hover:text-blue-500">Social Media</a></li>
            <li className="mb-1"><a href="#" className="text-gray-800 hover:text-blue-500">Newsletter</a></li>
            <li className="mb-1"><a href="#" className="text-gray-800 hover:text-blue-500">Subscribe</a></li>
          </ul>
        </div>

        {/* Subscribe */}
        <div className="link-column mb-4 flex-1">
          <h3 className="text-lg font-semibold mb-2 relative">Subscribe</h3>
          <p className="mb-2">Join our community to receive updates</p>
          <form className="flex">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-1 p-2 border border-gray-300 rounded-l-md"
            />
            <button 
              type="submit" 
              className="p-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="footer-bottom bg-gray-900 text-white py-4 flex flex-col items-center justify-between">
        {/* Social Icons */}
        <div className="social-icons mb-2 flex space-x-4">
          <a href="#" className="text-white hover:shadow-inner p-2 text-xl"><i className="ri-facebook-fill"></i></a>
          <a href="#" className="text-white hover:shadow-inner p-2 text-xl"><i className="ri-instagram-fill"></i></a>
          <a href="#" className="text-white hover:shadow-inner p-2 text-xl"><i className="ri-linkedin-fill"></i></a>
          <a href="#" className="text-white hover:shadow-inner p-2 text-xl"><i className="ri-youtube-fill"></i></a>
        </div>

        {/* Copyright */}
        <p className="m-0">© 2024 RentWheels. All rights reserved</p>

        {/* Footer Policies */}
        <div className="footer-policies flex space-x-4 mt-2 text-sm">
          <a href="#" className="text-white hover:underline">Privacy Policy</a>
          <a href="#" className="text-white hover:underline">Terms of Service</a>
          <a href="#" className="text-white hover:underline">Cookie Policy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
