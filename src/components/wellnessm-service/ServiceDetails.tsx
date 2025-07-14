"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import CoachHero from "@/components/cards/Hero/CoachHero";
import WellnessConsultationCard from "@/components/cards/Hero/CoachOverview";
import Health from "@/public/images/Health-Co.png";
import TestimonialCarousel from "../testomonial/testomonial";
import { Skeleton } from "@/components/ui/skeleton"; // Make sure this path is correct

// Define the service data type
interface ServiceData {
  _id: string;
  icon: string;
  title: string;
  description: string;
  price: number;
  overview: string;
  overviewImage: string;
  receive: string;
  receiveImage: string;
  whom: string;
  whomImage: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface ApiResponse {
  status: boolean;
  message: string;
  data: ServiceData;
}

function ServiceDetailsPage() {
  const params = useParams();
  const serviceId = params.id as string;

  const { data, isLoading, error } = useQuery<ApiResponse>({
    queryKey: ["service", serviceId],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/service/${serviceId}`,
        {
          method: "GET",
        }
      );
      if (!res.ok) {
        throw new Error("Failed to fetch service details");
      }
      return res.json();
    },
    enabled: !!serviceId,
  });

  // Loading state with ShadCN Skeleton
  if (isLoading) {
    return (
      <div className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
        <div className="space-y-6 max-w-4xl mx-auto">
          <Skeleton className="h-12 w-3/4 rounded-md" />
          <Skeleton className="h-6 w-1/2 rounded-md" />
          <Skeleton className="h-64 w-full rounded-xl" />

          <div className="space-y-4">
            <Skeleton className="h-6 w-1/3 rounded-md" />
            <Skeleton className="h-20 w-full rounded-md" />
            <Skeleton className="h-6 w-1/4 rounded-md" />
            <Skeleton className="h-10 w-1/2 rounded-md" />
          </div>

          <div className="space-y-2">
            <Skeleton className="h-8 w-2/3 rounded-md" />
            <Skeleton className="h-8 w-2/3 rounded-md" />
            <Skeleton className="h-8 w-2/3 rounded-md" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-md">
          <p className="text-red-500 text-base sm:text-lg lg:text-xl font-semibold">
            Error loading service details
          </p>
          <p className="text-gray-600 mt-2 text-sm sm:text-base break-words">
            {error.message}
          </p>
        </div>
      </div>
    );
  }

  if (!data || !data.data) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <p className="text-gray-500 text-base sm:text-lg lg:text-xl">
          Service not found
        </p>
      </div>
    );
  }

  const service = data.data;

  const receiveItems = service.receive
    ? service.receive.includes(",")
      ? service.receive.split(",").map((item) => item.trim())
      : [service.receive]
    : [
        "Comprehensive consultation",
        "Personalized recommendations",
        "Follow-up support",
      ];

  return (
    <div className="w-full overflow-x-hidden">
      {/* Hero Section */}
      <div className="w-full">
        <CoachHero
          title={service.title}
          subtitle={service.description}
          buttonText="Find A Coach"
          backgroundImage={Health}
          titleColor=""
          subtitleColor=""
          buttonColor=""
        />
      </div>

      {/* Main Content Section */}
      <div className="w-full">
        <WellnessConsultationCard
          overviewTitle="Overview:"
          overviewDescription={service.overview}
          overviewImage={service.overviewImage}
          receiveImage={service.receiveImage}
          targetImage={service.whomImage}
          receiveTitle="What You'll Receive:"
          receiveItems={receiveItems}
          whoTitle="Who It's For:"
          whoDescription={service.whom}
          ctaText="Book Session"
          ctaColor="bg-emerald-500 hover:bg-emerald-600"
          backgroundColor="bg-[#F9FBFC]"
          cardBackgrounds={{
            analysis: "bg-gradient-to-br from-orange-100 to-orange-300",
            target: "bg-gradient-to-br from-pink-100 to-pink-300",
          }}
        />
      </div>

      {/* Testimonial Section */}
      <div className="w-full mt-8 sm:mt-12 lg:mt-16">
        <TestimonialCarousel />
      </div>
    </div>
  );
}

export default ServiceDetailsPage;
