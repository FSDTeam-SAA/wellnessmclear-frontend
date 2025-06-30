"use client";
import React, { useState } from "react";
import { Twitter, Instagram, Linkedin, Facebook } from "lucide-react";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    if (email.trim()) {
      console.log("Subscribing email:", email);
      setEmail("");
    }
  };

  return (
    <footer className="bg-gray-50 py-16 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row flex-wrap justify-between gap-10">
          {/* Logo and Description */}
          <div className="max-w-sm">
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 rounded-full border-2 border-gray-300 flex items-center justify-center">
                <div className="text-green-600 font-bold text-xl">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              Heal with the fundamentals—real food, restful sleep, movement, and
              a clear mind. With personalized support and WMC Smart Tools,
              better health becomes simple and sustainable.
            </p>
            <div className="flex space-x-3">
              {[Twitter, Instagram, Linkedin, Facebook].map((Icon, idx) => (
                <div
                  key={idx}
                  className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center hover:bg-green-200 transition-colors cursor-pointer"
                >
                  <Icon className="w-5 h-5 text-green-600" />
                </div>
              ))}
            </div>
          </div>

          {/* Company & Support Links */}
          <div className="flex  sm:flex-row lg:gap-32 gap-20">
            <div>
              <h3 className="font-semibold text-gray-800 mb-6">Company</h3>
              <ul className="space-y-4">
                {["About Us", "Blogs", "Products", "Contract"].map((item, i) => (
                  <li key={i}>
                    <a
                      href="#"
                      className="text-gray-600 text-sm hover:text-gray-800 transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-6">Support</h3>
              <ul className="space-y-4">
                {["Privacy Policy", "Terms Of Service", "FAQ", "Help Center"].map(
                  (item, i) => (
                    <li key={i}>
                      <a
                        href="#"
                        className="text-gray-600 text-sm hover:text-gray-800 transition-colors"
                      >
                        {item}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>

          {/* Newsletter */}
          <div className="max-w-md">
            <h3 className="font-semibold text-gray-800 mb-6">
              Subscribe to Wellness Made Clear Newsletter
            </h3>
            <p className="text-gray-600 text-sm mb-6 leading-relaxed">
              Tips, tools, and wellness updates—straight to your inbox
            </p>
            <div className="flex flex-col sm:flex-row items-stretch w-full gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Your Email..."
                className="flex-1 px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <button
                onClick={handleSubscribe}
                className="px-6 py-2 bg-[#A8C2A3] text-white text-sm font-medium rounded-md hover:bg-green-500 transition-colors"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
