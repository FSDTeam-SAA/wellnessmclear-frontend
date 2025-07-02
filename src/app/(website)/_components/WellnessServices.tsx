import ServiceCard from "@/components/cards/service-card";
import { Brain, Heart, Activity, Zap } from "lucide-react";
import React from "react";

// Sample service data - you can move this to a separate file or fetch from API
const servicesData = [
  {
    id: 1,
    icon: Brain,
    iconColor: "text-[#CBA0E3]",
    title: "Clarity Health Audit",
    description: "(1:1 Foundational Session – 60 mins)",
    price: "$150",
    buttonText: "Book a Coach",
    href: "/health-audit",
    backgroundColor: "bg-[#F0F4F8]"
  },
  {
    id: 2,
    icon: Heart,
    iconColor: "text-[#CBA0E3]",
    title: "Wellness Coaching",
    description: "(Weekly Sessions – 45 mins each)",
    price: "$200",
    buttonText: "Start Journey",
    href: "/busy-people",
    backgroundColor: "bg-[#F0F4F8]"
  },
  {
    id: 3,
    icon: Activity,
    iconColor: "text-[#CBA0E3]",
    title: "Fitness Assessment",
    description: "(Complete Body Analysis – 90 mins)",
    price: "$120",
    buttonText: "Get Assessed",
    href: "/coaching-program",
    backgroundColor: "bg-[#F0F4F8]"
  },
  {
    id: 4,
    icon: Zap,
    iconColor: "text-[#CBA0E3]",
    title: "Energy Optimization",
    description: "(Nutrition & Lifestyle – 75 mins)",
    price: "$180",
    buttonText: "Boost Energy",
    href: "/wellness-mentorship",
    backgroundColor: "bg-[#F0F4F8]"
  },
];

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
        {servicesData.map((service) => (
          <ServiceCard
            key={service.id}
            Icon={service.icon}
            iconColor={service.iconColor}
            title={service.title}
            description={service.description}
            price={service.price}
            buttonText={service.buttonText}
            href={service.href}
            backgroundColor={service.backgroundColor}
          />
        ))}
      </div>
    </div>
  );
}

export default WellnessServices;