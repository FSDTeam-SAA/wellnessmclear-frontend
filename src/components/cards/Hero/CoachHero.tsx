"use client";
import Image, { StaticImageData } from "next/image";
import React from "react";

interface CoachHeroProps {
  title: string;
  subtitle: string;
  buttonText: string;
  backgroundImage: StaticImageData;
  titleColor?: string;
  subtitleColor?: string;
  buttonColor?: string;
}

const CoachHero: React.FC<CoachHeroProps> = ({
  title,
  subtitle,
  buttonText,
  backgroundImage,
  titleColor = "",
  subtitleColor = "",
  buttonColor = "",
}) => {
  return (
    <div className="bg-[#f8faf9]">
      <div className="relative w-full container mx-auto overflow-hidden lg:p-[60px] md:p-[60px] p-[30px]">
        <div className="flex flex-col lg:flex-row">
          {/* Left Content Section */}
          <div className="flex-1 flex flex-col justify-center">
            <div className="space-y-8">
              {/* Title */}
              <h1
                className={`text-4xl lg:text-5xl font-bold leading-tight tracking-tight ${titleColor}`}
              >
                {title.split(" ").map((word, index) => (
                  <span
                    key={index}
                    className={
                      word === "Health" ? "text-[#A8C2A3]" : "text-gray-900"
                    }
                  >
                    {word}
                    {index < title.split(" ").length - 1 && " "}
                  </span>
                ))}
              </h1>

              {/* Subtitle */}
              <p
                className={`text-gray-600 text-lg leading-relaxed max-w-xl ${subtitleColor}`}
                dangerouslySetInnerHTML={{ __html: subtitle }}
              />

              {/* Button */}
              <button
                className={`inline-flex items-center px-8 py-4 rounded-lg text-white font-semibold text-base transition-all duration-300 transform hover:scale-105 hover:shadow-xl ${buttonColor || "bg-[#A8C2A3] hover:bg-emerald-600"
                  } shadow-lg`}
              >
                {buttonText}
              </button>
            </div>
          </div>

          {/* Right Image Section */}
          <div className="flex-1 relative min-h-[440px]">
            {/* Main Image */}
            <div className="absolute inset-0">
              <Image
                src={backgroundImage}
                alt="Health audit illustration"
                fill
                className="object-cover object-center p-4 lg:p-8 rounded-xl"
                priority
              />
            </div>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/40 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoachHero;
