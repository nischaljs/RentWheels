import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Links Section */}
      <div className="footer-links flex flex-wrap justify-around py-8 px-4 md:px-20 lg:px-32">
        {/* Useful Links */}
        <div className="link-column mb-4 w-full md:w-1/3 lg:w-1/4">
          <h3 className="text-lg font-semibold mb-2 relative">Useful Links</h3>
          <ul className="list-none p-0 m-0">
            <li className="mb-1"><a href="#" className="text-gray-400 hover:text-indigo-400">About Us</a></li>
            <li className="mb-1"><a href="#" className="text-gray-400 hover:text-indigo-400">Contact Us</a></li>
            <li className="mb-1"><a href="#" className="text-gray-400 hover:text-indigo-400">FAQs</a></li>
            <li className="mb-1"><a href="#" className="text-gray-400 hover:text-indigo-400">Terms of Service</a></li>
            <li className="mb-1"><a href="#" className="text-gray-400 hover:text-indigo-400">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Careers */}
        <div className="link-column mb-4 w-full md:w-1/3 lg:w-1/4">
          <h3 className="text-lg font-semibold mb-2 relative">Careers</h3>
          <ul className="list-none p-0 m-0">
            <li className="mb-1"><a href="#" className="text-gray-400 hover:text-indigo-400">Blog</a></li>
            <li className="mb-1"><a href="#" className="text-gray-400 hover:text-indigo-400">Press</a></li>
            <li className="mb-1"><a href="#" className="text-gray-400 hover:text-indigo-400">Partnerships</a></li>
          </ul>
        </div>

        {/* Resources */}
        <div className="link-column mb-4 w-full md:w-1/3 lg:w-1/4">
          <h3 className="text-lg font-semibold mb-2 relative">Resources</h3>
          <ul className="list-none p-0 m-0">
            <li className="mb-1"><a href="#" className="text-gray-400 hover:text-indigo-400">Events</a></li>
            <li className="mb-1"><a href="#" className="text-gray-400 hover:text-indigo-400">Community</a></li>
            <li className="mb-1"><a href="#" className="text-gray-400 hover:text-indigo-400">Social Media</a></li>
            <li className="mb-1"><a href="#" className="text-gray-400 hover:text-indigo-400">Newsletter</a></li>
            <li className="mb-1"><a href="#" className="text-gray-400 hover:text-indigo-400">Subscribe</a></li>
          </ul>
        </div>

        {/* Subscribe */}
        <div className="link-column mb-4 w-full md:w-1/3 lg:w-1/4">
          <h3 className="text-lg font-semibold mb-2 relative">Subscribe</h3>
          <p className="mb-2 text-gray-400">Join our community to receive updates</p>
          <form className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 p-2 border border-gray-700 bg-gray-800 text-white rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <button
              type="submit"
              className="p-2 bg-indigo-600 text-white rounded-r-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="footer-bottom text-sm py-4 flex flex-col items-center justify-between">
        {/* Social Icons */}
        <div className="social-icons mb-2 flex space-x-4">
          <a href="#" className="text-gray-400 hover:text-indigo-400 p-2 rounded-full hover:bg-gray-800 transition-all duration-300"><i className="ri-facebook-fill"></i></a>
          <a href="#" className="text-gray-400 hover:text-indigo-400 p-2 rounded-full hover:bg-gray-800 transition-all duration-300"><i className="ri-instagram-fill"></i></a>
          <a href="#" className="text-gray-400 hover:text-indigo-400 p-2 rounded-full hover:bg-gray-800 transition-all duration-300"><i className="ri-linkedin-fill"></i></a>
          <a href="#" className="text-gray-400 hover:text-indigo-400 p-2 rounded-full hover:bg-gray-800 transition-all duration-300"><i className="ri-youtube-fill"></i></a>
        </div>

        {/* Copyright */}
        <p className="m-0 text-gray-400">© 2024 RentWheels. All rights reserved</p>

        {/* Footer Policies */}
        <div className="footer-policies flex space-x-4 mt-2 text-gray-400">
          <a href="#" className="hover:text-indigo-400">Privacy Policy</a>
          <a href="#" className="hover:text-indigo-400">Terms of Service</a>
          <a href="#" className="hover:text-indigo-400">Cookie Policy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;