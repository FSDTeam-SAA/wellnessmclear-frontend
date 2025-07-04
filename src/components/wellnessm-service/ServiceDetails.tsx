// "use client";

// import React from "react";
// import { useQuery } from "@tanstack/react-query";
// import { useParams } from "next/navigation";
// import CoachHero from "@/components/cards/Hero/CoachHero";
// import WellnessConsultationCard from "@/components/cards/Hero/CoachOverview";
// import Health from "@/public/images/Health-Co.png";
// import TestimonialCarousel from "../testomonial/testomonial";

// // Define the service data type
// interface ServiceData {
//   _id: string;
//   icon: string;
//   title: string;
//   description: string;
//   price: number;
//   overview: string;
//   overviewImage: string;
//   receive: string;
//   receiveImage: string;
//   whom: string;
//   whomImage: string;
//   createdAt: string;
//   updatedAt: string;
//   __v: number;
// }

// interface ApiResponse {
//   status: boolean;
//   message: string;
//   data: ServiceData;
// }

// function ServiceDetailsPage() {
//   const params = useParams();
//   const serviceId = params.id as string;

//   const { data, isLoading, error } = useQuery<ApiResponse>({
//     queryKey: ["service", serviceId],
//     queryFn: async () => {
//       const res = await fetch(
//         `${process.env.NEXT_PUBLIC_BACKEND_URL}/service/${serviceId}`,
//         {
//           method: "GET",
//         }
//       );
//       if (!res.ok) {
//         throw new Error("Failed to fetch service details");
//       }
//       return res.json();
//     },
//     enabled: !!serviceId,
//   });

//   // Loading state
//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-500 mx-auto"></div>
//           <p className="mt-4 text-gray-600">Loading service details...</p>
//         </div>
//       </div>
//     );
//   }

//   // Error state
//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <p className="text-red-500 text-lg">Error loading service details</p>
//           <p className="text-gray-600 mt-2">{error.message}</p>
//         </div>
//       </div>
//     );
//   }

//   // No data state
//   if (!data || !data.data) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <p className="text-gray-500">Service not found</p>
//       </div>
//     );
//   }

//   const service = data.data;

//   // Convert receive string to array - handle different formats
//   const receiveItems = service.receive
//     ? service.receive.includes(",")
//       ? service.receive.split(",").map((item) => item.trim())
//       : [service.receive] // If it's just a single string without commas
//     : [
//         "Comprehensive consultation",
//         "Personalized recommendations",
//         "Follow-up support",
//       ];

//   return (
//     <div className="">
//       <CoachHero
//         title={service.title}
//         subtitle={service.description}
//         buttonText="Find A Coach"
//         backgroundImage={Health}
//         titleColor=""
//         subtitleColor=""
//         buttonColor=""
//       />

//       <div className="">
//         <WellnessConsultationCard
//           overviewTitle="Overview:"
//           overviewDescription={service.overview}
//           overviewImage={service.overviewImage}
//           receiveImage={service.receiveImage}
//           targetImage={service.whomImage}
//           receiveTitle="What You'll Receive:"
//           receiveItems={receiveItems}
//           whoTitle="Who It's For:"
//           whoDescription={service.whom}
//           ctaText="Book Session"
//           ctaColor="bg-emerald-500 hover:bg-emerald-600"
//           backgroundColor="bg-[#F9FBFC]"
//           cardBackgrounds={{
//             analysis: "bg-gradient-to-br from-orange-100 to-orange-300",
//             target: "bg-gradient-to-br from-pink-100 to-pink-300",
//           }}
//         />
//       </div>
//       <div>
//         <TestimonialCarousel />
//       </div>
//     </div>
//   );
// }

// export default ServiceDetailsPage;




"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import CoachHero from "@/components/cards/Hero/CoachHero";
import WellnessConsultationCard from "@/components/cards/Hero/CoachOverview";
import Health from "@/public/images/Health-Co.png";
import TestimonialCarousel from "../testomonial/testomonial";

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

  // Loading state - Responsive loading spinner
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 sm:h-24 sm:w-24 lg:h-32 lg:w-32 border-b-2 border-emerald-500 mx-auto"></div>
          <p className="mt-4 text-gray-600 text-sm sm:text-base lg:text-lg">
            Loading service details...
          </p>
        </div>
      </div>
    );
  }

  // Error state - Responsive error display
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

  // No data state - Responsive no data display
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

  // Convert receive string to array - handle different formats
  const receiveItems = service.receive
    ? service.receive.includes(",")
      ? service.receive.split(",").map((item) => item.trim())
      : [service.receive] // If it's just a single string without commas
    : [
        "Comprehensive consultation",
        "Personalized recommendations",
        "Follow-up support",
      ];

  return (
    <div className="w-full overflow-x-hidden">
      {/* Hero Section - Responsive */}
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

      {/* Main Content Section - Responsive padding and spacing */}
      <div className="w-full">
        <div className="">
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
      </div>

      {/* Testimonial Section - Responsive */}
      <div className="w-full mt-8 sm:mt-12 lg:mt-16">
        <TestimonialCarousel />
      </div>
    </div>
  );
}

export default ServiceDetailsPage;