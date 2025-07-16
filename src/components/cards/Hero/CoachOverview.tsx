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
  receiveImage?: string;

  whoTitle?: string;
  whoDescription?: string;
  targetImage?: string;

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
  // ctaColor = "bg-blue-500 hover:bg-blue-600",


  cardBackgrounds = {},
}) => {
  return (
    <div className={`min-h-screen p-4 sm:p-6 md:p-8 lg:p-[72px] !bg-[#EFE2F6B8]`}>
      <div className="container mx-auto space-y-8 sm:space-y-12 lg:space-y-16">
        {/* Overview Section */}
        <div className="flex flex-col lg:flex-row items-center gap-6 sm:gap-8">
          <div className="flex-1 order-2 lg:order-1">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3 sm:mb-4">
              {overviewTitle}
            </h2>
            <div
              className="text-sm sm:text-base text-gray-600 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: overviewDescription || "" }}
            />

          </div>
          {overviewImage && (
            <div className="w-full sm:w-4/5 md:w-3/5 lg:w-[573px] h-48 sm:h-64 md:h-72 lg:h-[352px] relative overflow-hidden rounded-2xl shadow-md order-1 lg:order-2">
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
        <div className="flex flex-col lg:flex-row items-stretch gap-8 sm:gap-12 lg:gap-20">
          {receiveImage ? (
            <div className="w-full sm:w-4/5 md:w-3/5 lg:w-[573px] h-48 sm:h-64 md:h-72 lg:h-[352px] relative overflow-hidden rounded-2xl shadow-md mx-auto lg:mx-0">
              <Image
                src={receiveImage}
                alt="Receive Section Image"
                fill
                className="object-cover rounded-2xl"
              />
            </div>
          ) : (
            <div
              className={`${cardBackgrounds.analysis} rounded-2xl p-6 sm:p-8 w-full sm:w-4/5 md:w-3/5 lg:w-80 relative overflow-hidden mx-auto lg:mx-0`}
            >
              <div className="relative z-10">
                <div className="mb-4">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-orange-400 rounded-full flex items-center justify-center mb-2">
                    <div className="w-8 h-8 sm:w-12 sm:h-12 bg-orange-300 rounded-full" />
                  </div>
                  <div className="w-16 h-20 sm:w-20 sm:h-24 bg-white rounded-lg" />
                </div>
                <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 w-20 h-12 sm:w-24 sm:h-16 bg-white/90 rounded-lg" />
              </div>
              <div className="absolute top-3 right-3 sm:top-4 sm:right-4 w-5 h-5 sm:w-6 sm:h-6 bg-white/30 rounded-full" />
              <div className="absolute top-6 left-3 sm:top-8 sm:left-4 w-3 h-3 sm:w-4 sm:h-4 bg-white/20 rounded-full" />
            </div>
          )}
          <div className="flex-1">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6">
              {receiveTitle}
            </h2>
            {receiveItems && receiveItems.length > 0 ? (
              <ul className="space-y-2 sm:space-y-3">
                {receiveItems.map((item, index) => (
                  <li key={index} className="flex items-start">
                    {/* <span className="text-teal-500 mr-3 mt-1 text-lg sm:text-xl">•</span> */}
                    <span
                      className="text-sm sm:text-base text-gray-600"
                      dangerouslySetInnerHTML={{ __html: item }}
                    />
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm sm:text-base text-gray-500 italic">No items provided.</p>
            )}
          </div>
        </div>

        {/* Who It's For Section */}
        <div className="flex flex-col lg:flex-row items-center gap-6 sm:gap-8">
          <div className="flex-1 order-2 lg:order-1">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3 sm:mb-4">
              {whoTitle}
            </h2>
            <div
              className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4 sm:mb-6"
              dangerouslySetInnerHTML={{ __html: whoDescription || "" }}
            />

            <button
              className={`bg-[#A8C2A3] text-white px-6 py-2.5 sm:px-8 sm:py-3 rounded-full font-semibold transition-colors duration-200 text-sm sm:text-base w-full sm:w-auto`}
            >
              {ctaText}
            </button>
          </div>
          {targetImage ? (
            <div className="w-full sm:w-4/5 md:w-3/5 lg:w-[573px] h-48 sm:h-64 md:h-72 lg:h-[352px] relative overflow-hidden rounded-2xl shadow-md order-1 lg:order-2">
              <Image
                src={targetImage}
                alt="Target Section Image"
                fill
                className="object-cover rounded-2xl"
              />
            </div>
          ) : (
            <div
              className={`${cardBackgrounds.target} rounded-2xl p-6 sm:p-8 w-full sm:w-4/5 md:w-3/5 lg:w-96 h-48 sm:h-56 md:h-64 relative overflow-hidden mx-auto lg:mx-0 order-1 lg:order-2`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-pink-200 to-pink-300">
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-24 sm:w-24 sm:h-32 bg-pink-400 rounded-t-full" />
                <div className="absolute top-6 right-6 sm:top-8 sm:right-8 w-12 h-12 sm:w-16 sm:h-16 border-3 sm:border-4 border-white/60 rounded-full flex items-center justify-center">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-pink-500 rounded-full" />
                </div>
                <div className="absolute top-3 left-3 sm:top-4 sm:left-4 w-3 h-3 sm:w-4 sm:h-4 bg-white/40 rounded-full" />
                <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 w-5 h-5 sm:w-6 sm:h-6 bg-white/30 rounded-full" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WellnessConsultationCard;