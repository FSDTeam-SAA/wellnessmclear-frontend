"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import ServiceCard from "@/components/cards/service-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Brain, Heart, Activity, Zap } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";

type ServiceCardProps = {
  Icon?: React.ComponentType<{ className?: string }>;
  iconUrl?: string;
  iconColor: string;
  title: string;
  description: string;
  price: string | number;
  buttonText: string;
  href: string;
  backgroundColor: string;
  _id: string;
};

function WellnessServices() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["service"],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/service`);
      if (!res.ok) throw new Error("Network response was not ok");
      return res.json();
    },
  });

  const servicesData = data?.data || [];
  const defaultIcons = [Brain, Heart, Activity, Zap];
  const defaultColors = [
    "text-blue-500",
    "text-red-500",
    "text-green-500",
    "text-yellow-500",
  ];
  const defaultBackgrounds = [
    "bg-blue-50",
    "bg-red-50",
    "bg-green-50",
    "bg-yellow-50",
  ];

  if (isLoading) return <p className="text-gray-500">Loading services...</p>;
  if (error) return <p className="text-red-500">Error: {error.message}</p>;
  if (!data || servicesData.length === 0)
    return <p className="text-gray-400">No services found.</p>;

  return (
    <div className="lg:py-[72px] bg-[#EFE2F6] py-10">
      <div className="mb-[56px]">
        <h1 className="lg:text-[40px] mb-2 md:text-[28px] text-[24px] text-[#0F0F0F] text-center leading-[120%] font-semibold">
          Our Wellness Services
        </h1>
        <p className="text-base font-normal leading-[150%] text-[#0F0F0F] text-center">
          Comprehensive approaches to health and wellness that address your
          unique needs and goals.
        </p>
      </div>

      <div className="w-[90%] lg:w-full mx-auto relative">
        <Carousel
          opts={{ align: "start", loop: true }}
          plugins={[Autoplay({ delay: 2500 })]} // Auto slides every 2.5 seconds
          className="w-full container"
        >
          {/* Navigation buttons positioned at top-right */}
          <div className="absolute top-0 lg:right-24 right-16 z-10 flex gap-2">
            <CarouselPrevious />
            <CarouselNext />
          </div>

          {/* Carousel content */}
          <CarouselContent className="mt-12 -ml-4">
            {servicesData.map((service: ServiceCardProps, index: number) => (
              <CarouselItem
                key={service._id}
                className="pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
              >
                <ServiceCard
                  Icon={defaultIcons[index % defaultIcons.length]}
                  iconColor={defaultColors[index % defaultColors.length]}
                  title={service.title}
                  description={service.description}
                  price={service.price}
                  buttonText="Book A Coach"
                  href={`/service/${service._id}`}
                  backgroundColor={
                    defaultBackgrounds[index % defaultBackgrounds.length]
                  }
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
}

export default WellnessServices;
