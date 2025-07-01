"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import dHero from "@/public/images/d-hero.svg";

export default function HomeHero() {
  return (
    <div className="w-full bg-[#F8FAF9] ">
      <section className="relative w-full max-w-screen lg:container lg:mx-auto mx-auto px-1 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="relative h-[300px] sm:h-[380px] md:h-[450px] lg:h-[600px] w-full rounded-lg overflow-hidden">
          {/* Background Image */}
          <Image
            src={dHero}
            alt="Hero Image"
            fill
            className="object-cover w-full h-full rounded-lg"
            priority
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/30 rounded-lg z-[1]" />

          {/* Text Content */}
          <div className="absolute inset-0 flex items-center px-4 sm:px-6 lg:px-16 z-[2]">
            <div className="text-white max-w-2xl">
              {/* Discount Label */}
              <div className="mb-2">
                <p className="text-[#E0B15E] text-lg sm:text-xl lg:text-2xl font-semibold">
                  30%{" "}
                  <span className="text-white text-sm sm:text-base font-medium leading-[120%]">
                    Purchase discount.
                  </span>
                </p>
              </div>

              {/* Headline */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-[120%] mb-3 sm:mb-5 text-start">
                Deal Of The <span className="text-[#E0B15E]">Day</span>!
              </h1>

              {/* Description */}
              <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-[#E7E7E7] max-w-xl mb-6 text-start">
                Wellness is a personal journey—not a destination. It’s about
                making small, consistent choices that bring you closer to your
                healthiest and happiest self.
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 w-full">
                <Link href="/products" className="w-full sm:w-auto">
                  <Button className="w-full sm:w-[200px] h-12 sm:h-[54px] text-base sm:text-lg font-bold text-white bg-[#A8C2A3] hover:bg-[#94b294] transition-colors duration-200">
                    Explore Resources
                  </Button>
                </Link>
                <Link href="/products" className="w-full sm:w-auto">
                  <Button className="w-full sm:w-[200px] h-12 sm:h-[54px] text-base sm:text-lg font-bold text-white bg-[#A8C2A3] hover:bg-[#94b294] transition-colors duration-200">
                    Find A Coach
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
