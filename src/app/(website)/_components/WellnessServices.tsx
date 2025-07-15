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
import { Skeleton } from "@/components/ui/skeleton";

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
  const defaultColors = ["text-blue-500", "text-red-500", "text-green-500", "text-yellow-500"];
  const defaultBackgrounds = ["bg-blue-50", "bg-red-50", "bg-green-50", "bg-yellow-50"];

  return (
    <div className="lg:py-[72px] bg-[#EFE2F6] py-10">
      <div className="mb-[56px]">
        <h1 className="lg:text-[40px] mb-2 md:text-[28px] text-[24px] text-[#0F0F0F] text-center leading-[120%] font-semibold">
          Our Wellness Services
        </h1>
        <p className="text-base font-normal leading-[150%] text-[#0F0F0F] text-center">
          Comprehensive approaches to health and wellness that address your unique needs and goals.
        </p>
      </div>

      <div className="w-[90%] lg:w-full mx-auto relative">
        <Carousel
          opts={{ align: "start", loop: true }}
          plugins={[Autoplay({ delay: 2500 })]}
          className="container "
        >
          {/* Navigation buttons */}
          <div className="absolute top-0 lg:right-24 right-16 z-10 flex gap-2">
            <CarouselPrevious />
            <CarouselNext />
          </div>

          <CarouselContent className="mt-12 -ml-4">
            {isLoading
              ? [...Array(4)].map((_, index) => (
                <CarouselItem
                  key={index}
                  className="pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4 h-full"
                >
                  <div className="bg-white rounded-lg shadow p-6 h-full min-h-[300px] flex flex-col gap-4">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-10 w-full rounded-md" />
                  </div>
                </CarouselItem>
              ))
              : servicesData.map((service: ServiceCardProps, index: number) => (
                <CarouselItem
                  key={service._id}
                  className="pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4 h-full"
                >
                  <div className="h-full ">
                    <ServiceCard
                      Icon={defaultIcons[index % defaultIcons.length]}
                      iconColor={defaultColors[index % defaultColors.length]}
                      title={service?.title?.slice(0, 30)}
                      description={service?.description?.slice(0, 30)}
                      price={service.price}
                      buttonText="Book A Coach"
                      href={`/service/${service._id}`}
                      backgroundColor={defaultBackgrounds[index % defaultBackgrounds.length]}
                    />
                  </div>
                </CarouselItem>
              ))}
          </CarouselContent>
        </Carousel>

        {!isLoading && error && (
          <p className="text-center text-red-500 mt-6">Error: {error.message}</p>
        )}
        {!isLoading && !error && servicesData.length === 0 && (
          <p className="text-center text-gray-500 mt-6">No services found.</p>
        )}
      </div>
    </div>
  );
}

export default WellnessServices;
