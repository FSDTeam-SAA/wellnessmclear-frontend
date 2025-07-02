"use client";

import Image from "next/image";
import React from "react";

interface CardBackgrounds {
  analysis?: string;
  target?: string;
}

interface WellnessConsultationCardProps {
  overviewTitle?: string;
  overviewDescription?: string;
  overviewImage?: string;

  receiveTitle?: string;
  receiveItems?: string[];
  receiveImage?: string; // ✅ NEW

  whoTitle?: string;
  whoDescription?: string;
  targetImage?: string; // ✅ NEW

  ctaText?: string;
  ctaColor?: string;
  onCtaClick?: () => void;

  backgroundColor?: string;
  cardBackgrounds?: CardBackgrounds;
}

const WellnessConsultationCard: React.FC<WellnessConsultationCardProps> = ({
  overviewTitle,
  overviewDescription,
  overviewImage,

  receiveTitle,
  receiveItems,
  receiveImage,

  whoTitle,
  whoDescription,
  targetImage,

  ctaText,
  ctaColor = "bg-blue-500 hover:bg-blue-600",

  backgroundColor = "bg-[#EFE2F6B8]",
  cardBackgrounds = {},
}) => {
  return (
    <div className={`min-h-screen lg:p-[72px] bg-[#EFE2F6B8] ${backgroundColor}`}>
      <div className="container mx-auto space-y-16">
        {/* Overview Section */}
        <div className="flex flex-col lg:flex-row items-center gap-8">
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              {overviewTitle}
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {overviewDescription}
            </p>
          </div>
          {overviewImage && (
            <div className="lg:w-[573px] lg:h-[352px] relative overflow-hidden rounded-2xl shadow-md">
              <Image
                src={overviewImage}
                alt="Overview Visual"
                fill
                className="object-cover rounded-2xl"
              />
            </div>
          )}
        </div>

        {/* What You'll Receive Section */}
        <div className="flex flex-col lg:flex-row items-stretch gap-20">
          {receiveImage ? (
            <div className=" lg:w-[573px] lg:h-[352px] relative overflow-hidden rounded-2xl shadow-md">
              <Image
                src={receiveImage}
                alt="Receive Section Image"
                fill
                className="object-cover rounded-2xl"
              />
            </div>
          ) : (
            <div
              className={`${cardBackgrounds.analysis} rounded-2xl p-8 w-full lg:w-80 relative overflow-hidden`}
            >
              <div className="relative z-10">
                <div className="mb-4">
                  <div className="w-16 h-16 bg-orange-400 rounded-full flex items-center justify-center mb-2">
                    <div className="w-12 h-12 bg-orange-300 rounded-full" />
                  </div>
                  <div className="w-20 h-24 bg-white rounded-lg" />
                </div>
                <div className="absolute bottom-8 right-8 w-24 h-16 bg-white/90 rounded-lg" />
              </div>
              <div className="absolute top-4 right-4 w-6 h-6 bg-white/30 rounded-full" />
              <div className="absolute top-8 left-4 w-4 h-4 bg-white/20 rounded-full" />
            </div>
          )}
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              {receiveTitle}
            </h2>
            {receiveItems && receiveItems.length > 0 ? (
              <ul className="space-y-3">
                {receiveItems.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-teal-500 mr-3 mt-1">•</span>
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 italic">No items provided.</p>
            )}
          </div>
        </div>

        {/* Who It's For Section */}
        <div className="flex flex-col lg:flex-row items-center gap-8">
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              {whoTitle}
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              {whoDescription}
            </p>
            <button
              className={`${ctaColor} text-white px-8 py-3 rounded-full font-semibold transition-colors duration-200`}
            >
              {ctaText}
            </button>
          </div>
          {targetImage ? (
            <div className="lg:w-[573px] lg:h-[352px] relative overflow-hidden rounded-2xl shadow-md">
              <Image
                src={targetImage}
                alt="Target Section Image"
                fill
                className="object-cover rounded-2xl"
              />
            </div>
          ) : (
            <div
              className={`${cardBackgrounds.target} rounded-2xl p-8 w-full lg:w-96 h-64 relative overflow-hidden`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-pink-200 to-pink-300">
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-32 bg-pink-400 rounded-t-full" />
                <div className="absolute top-8 right-8 w-16 h-16 border-4 border-white/60 rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 bg-pink-500 rounded-full" />
                </div>
                <div className="absolute top-4 left-4 w-4 h-4 bg-white/40 rounded-full" />
                <div className="absolute bottom-4 right-4 w-6 h-6 bg-white/30 rounded-full" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WellnessConsultationCard;
