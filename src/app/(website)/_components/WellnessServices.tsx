import ServiceCard from "@/components/cards/service-card";
import React from "react";

function WellnessServices() {
  return (
    <div className="lg:p-[72px] md:p-[50px] p-[30px] bg-[#EFE2F6]">
      <div className="mb-[56px]">
        <h1 className="lg:text-[40px] mb-2 md:text-[28px] text-[24px] text-[#0F0F0F] text-center leading-[120%] font-semibold">
          Our Wellness Services
        </h1>
        <p className="text-base font-normal leading-[150%] text-[#0F0F0F] text-center">
          Comprehensive approaches to health and wellness that address your
          unique needs and goals.
        </p>
      </div>
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 px-4">
        <ServiceCard />
        <ServiceCard />
        <ServiceCard />
        <ServiceCard />
      </div>
    </div>
  );
}

export default WellnessServices;
