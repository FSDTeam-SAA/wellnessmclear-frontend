"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import dHero from "@/public/images/d-hero.svg";

export default function HomeHero() {
  return (
    <div className="w-full my-5 lg:my-12">
      <section className="relative w-full container mx-auto px-4">
        <div className="relative h-[300px] sm:h-[350px] md:h-[400px] lg:h-[600px] w-full rounded-lg overflow-hidden">
          {/* Background Image */}
          <Image
            src={dHero}
            alt="Hero Image"
            height={650}
            width={1200}
            className="object-cover w-full h-full rounded-lg"
            priority
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/30 rounded-lg" />

          {/* Text Content */}
          <div className="absolute inset-0 flex items-center px-4 sm:px-6 lg:px-16">
            <div className="text-white max-w-2xl">
              <div className="mb-2">
                <p className="text-[#E0B15E] text-[20px] md:text-[24px] lg:text-[32px] font-semibold">
                  30%{" "}
                  <span className="text-white text-base font-medium leading-[120%]">
                    Purchase discount.
                  </span>
                </p>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-[48px] font-bold leading-[120%] mb-3 sm:mb-5 text-start">
                Deal Of The <span className="text-[#E0B15E]">Day</span>!
              </h1>

              <p className="text-sm sm:text-base font-normal leading-[150%] tracking-[0.15em] text-[#E7E7E7] max-w-lg text-start mb-6">
                Wellness is a personal journey—not a destination. It’s about
                making small, consistent choices that bring you closer to your
                healthiest and happiest self.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                <Link href="/products" className="w-full sm:w-auto">
                  <Button className="w-full sm:w-[200px] h-[48px] sm:h-[54px] text-lg font-bold text-white bg-[#A8C2A3]">
                    Explore Resources
                  </Button>
                </Link>
                <Link href="/products" className="w-full sm:w-auto">
                  <Button className="w-full sm:w-[200px] h-[48px] sm:h-[54px] text-lg font-bold text-white bg-[#A8C2A3]">
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
