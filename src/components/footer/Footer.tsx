"use client";
import React, { useState } from "react";
import { Twitter, Instagram, Linkedin, Facebook } from "lucide-react";
import Image from "next/image";
import logoImage from "@/public/images/middleNavLogo.svg";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";

const Footer = () => {
  const [email, setEmail] = useState("");

  const mutation = useMutation({
    mutationFn: async (email: string) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/newsletter/subscribe`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email })
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return response.json();
    },
    onSuccess: () => {
      toast.success("Subscribed to newsletter successfully!");
      setEmail("");
    },
    onError: (error) => {
      console.error("Error subscribing to newsletter:", error);
      toast.error("Failed to subscribe. Please try again.");
    },
  });

  const handleSubscribe = () => {
    if (email.trim()) {
      mutation.mutate(email);
    } else {
      toast.error("Please enter a valid email.");
    }
  };


  return (
    //     <footer className="bg-[#FFFFFF] py-16 px-4">
    //       <div className="lg:container mx-auto px-4">
    //   <div className="lg:flex lg:justify-between lg:items-center gap-12 lg:gap-24">
    //     {/* Logo and Description */}
    //     <div className="max-w-96">
    //       <div className="flex items-center mb-6">
    //         <div className="w-[72px] h-[72px] rounded-full border-2 border-gray-300 flex items-center justify-center">
    //           <Image
    //             src={logoImage}
    //             alt="Logo"
    //             width={100}
    //             height={100}
    //             className="object-cover"
    //           />
    //         </div>
    //       </div>
    //       <p className="text-gray-600 text-sm leading-relaxed mb-6">
    //         Heal with the fundamentals—real food, restful sleep, movement, and a clear mind.
    //         With personalized support and WMC Smart Tools, better health becomes simple and sustainable.
    //       </p>
    //       <div className="flex space-x-3">
    //         {[Twitter, Instagram, Linkedin, Facebook].map((Icon, idx) => (
    //           <div
    //             key={idx}
    //             className="w-10 h-10 bg-[#E4ECE2] rounded-full flex items-center justify-center hover:bg-green-200 transition-colors cursor-pointer"
    //           >
    //             <Icon className="w-5 h-5 text-[#A8C2A3]" />
    //           </div>
    //         ))}
    //       </div>
    //     </div>

    //     {/* Company & Support Links */}
    //     <div className="flex lg:gap-24 gap-20 my-6 lg:mt-0">
    //       <div className="">
    //         <h3 className="font-semibold text-[#2F3E34] mb-3 text-[20px]">Company</h3>
    //         <ul className="space-y-4">
    //           <li>
    //             <a href="/about" className="text-gray-600 text-sm hover:text-gray-800 transition-colors">
    //               About Us
    //             </a>
    //           </li>
    //           <li>
    //             <a href="/blogs" className="text-gray-600 text-sm hover:text-gray-800 transition-colors">
    //               Blogs
    //             </a>
    //           </li>
    //           <li>
    //             <a href="/product" className="text-gray-600 text-sm hover:text-gray-800 transition-colors">
    //               Products
    //             </a>
    //           </li>
    //         </ul>
    //       </div>
    //       <div>
    //         <h3 className="font-semibold text-[#2F3E34] mb-3 text-[20px]">Support</h3>
    //         <ul className="space-y-4">
    //           <li>
    //             <a href="/privacy" className="text-gray-600 text-sm hover:text-gray-800 transition-colors">
    //               Privacy Policy
    //             </a>
    //           </li>
    //           <li>
    //             <a href="/terms" className="text-gray-600 text-sm hover:text-gray-800 transition-colors">
    //               Terms of Service
    //             </a>
    //           </li>
    //           <li>
    //             <a href="/faq" className="text-gray-600 text-sm hover:text-gray-800 transition-colors">
    //               FAQ
    //             </a>
    //           </li>
    //         </ul>
    //       </div>
    //     </div>

    //     {/* Newsletter */}
    //     <div className="max-w-md">
    //       <h3 className="font-semibold text-[#2F3E34] mb-6 text-[20px]">
    //         Subscribe to Wellness Made Clear Newsletter
    //       </h3>
    //       <p className="text-gray-600 text-sm mb-3 leading-relaxed">
    //         Tips, tools, and wellness updates—straight to your inbox
    //       </p>
    //       <div className="flex flex-col sm:flex-row items-stretch w-full gap-2">
    //         <input
    //           type="email"
    //           value={email}
    //           onChange={(e) => setEmail(e.target.value)}
    //           placeholder="Enter Your Email..."
    //           className="flex-1 px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
    //         />
    //         <button
    //           onClick={handleSubscribe}
    //           className="px-6 py-2 bg-[#A8C2A3] text-white text-sm font-medium rounded-md hover:bg-green-500 transition-colors"
    //         >
    //           Subscribe
    //         </button>
    //       </div>
    //     </div>
    //   </div>
    // </div>

    //     </footer>
    <footer className="bg-[#FFFFFF] py-16 px-4">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-wrap md:flex-row lg:flex-nowrap justify-between items-start gap-12 lg:gap-24">
          {/* Logo and Description */}
          <div className="w-full md:w-[45%] lg:w-[30%]">
            <div className="flex items-center mb-6">
              <div className="w-[72px] h-[72px] rounded-full border-2 border-gray-300 flex items-center justify-center">
                <Image
                  src={logoImage}
                  alt="Logo"
                  width={100}
                  height={100}
                  className="object-cover"
                />
              </div>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              Heal with the fundamentals—real food, restful sleep, movement, and a clear mind.
              With personalized support and WMC Smart Tools, better health becomes simple and sustainable.
            </p>
            <div className="flex space-x-3">
              {[Twitter, Instagram, Linkedin, Facebook].map((Icon, idx) => (
                <div
                  key={idx}
                  className="w-10 h-10 bg-[#E4ECE2] rounded-full flex items-center justify-center hover:bg-green-200 transition-colors cursor-pointer"
                >
                  <Icon className="w-5 h-5 text-[#A8C2A3]" />
                </div>
              ))}
            </div>
          </div>

          {/* Company & Support Links */}
          <div className="flex flex-col sm:flex-row gap-10 md:w-[50%] lg:w-[30%]">
            <div>
              <h3 className="font-semibold text-[#2F3E34] mb-3 text-[20px]">Company</h3>
              <ul className="space-y-4">
                <li>
                  <a href="/about" className="text-gray-600 text-sm hover:text-gray-800 transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="/blogs" className="text-gray-600 text-sm hover:text-gray-800 transition-colors">
                    Blogs
                  </a>
                </li>
                <li>
                  <a href="/product" className="text-gray-600 text-sm hover:text-gray-800 transition-colors">
                    Products
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-[#2F3E34] mb-3 text-[20px]">Support</h3>
              <ul className="space-y-4">
                <li>
                  <a href="/privacy" className="text-gray-600 text-sm hover:text-gray-800 transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/terms" className="text-gray-600 text-sm hover:text-gray-800 transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="/faq" className="text-gray-600 text-sm hover:text-gray-800 transition-colors">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Newsletter */}
          <div className="w-full md:w-[100%] lg:w-[30%]">
            <h3 className="font-semibold text-[#2F3E34] mb-6 text-[20px]">
              Subscribe to Wellness Made Clear Newsletter
            </h3>
            <p className="text-gray-600 text-sm mb-3 leading-relaxed">
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
