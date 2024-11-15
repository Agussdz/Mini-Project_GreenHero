import React from "react";

export default function Footer() {
  return (
    <div>
      {/* Footer Section */}
      <footer id="contact" className="bg-gray-800 text-white py-8 mt-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between">
            {/* GreenHero Section */}
            <div className="w-full md:w-[45%] mb-6 md:mb-0 flex flex-col items-center md:items-start">
              <h3 className="text-xl font-bold mb-2">GreenHero</h3>
              <p className="text-gray-400 text-center md:text-left">
                Revolutionizing agriculture for a sustainable future.
              </p>
            </div>
            {/* Contact Section */}
            <div className="w-full md:w-[35%] mb-6 md:mb-0 flex flex-col items-center md:items-start">
              <h3 className="text-xl font-bold mb-2">Contact Us</h3>
              <p className="text-gray-400 text-center md:text-left">
                123, Thamriel no 128 Greenville 7777
              </p>
              <p className="text-gray-400 text-center md:text-left">
                Phone: (+77) 777 777 77
              </p>
              <p className="text-gray-400 text-center md:text-left">
                Email: greenhero@gmail.com
              </p>
            </div>
            {/* Follow Us Section */}
            <div className="w-full md:w-[20%] flex flex-col items-center md:items-start">
              <h3 className="text-xl font-bold mb-2">Follow Us</h3>
              <div className="flex space-x-4">
                {/* Social Icons */}
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01M7.5 21h9a3 3 0 003-3V6a3 3 0 00-3-3h-9a3 3 0 00-3 3v12a3 3 0 003 3z"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          {/* Footer Bottom */}
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 GreenHero. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
