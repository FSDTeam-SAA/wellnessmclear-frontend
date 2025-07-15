"use client";

import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import { Skeleton } from "@/components/ui/skeleton"; // <-- Import Skeleton from ShadCN UI

// Define types
interface Review {
  _id: string;
  rating: number;
  review: string;
  createdAt: string;
  userId: {
    firstName: string;
    lastName: string;
    profileImage?: string;
  };
}

// Fetch function
const fetchReviews = async (): Promise<Review[]> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/review-rating/all-reviews`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch reviews");
  }
  const data = await res.json();
  return data.reviews || [];
};

export default function TestimonialCarousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  const {
    data: reviews,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["reviews"],
    queryFn: fetchReviews,
  });

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"
        }`}
      />
    ));
  };

  // Number of skeleton cards to show while loading
  const skeletonCount = 3;

  return (
    <div className="w-full bg-[#F0F4F8] px-4 py-8 md:py-12">
      <div className="container mx-auto">
        <div className="mb-8 md:mb-12">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                The Clarity Circle
              </h2>
              <p className="text-sm md:text-base text-gray-600">
                WMC community for individuals committed to living well.
              </p>
            </div>
          </div>
        </div>

        {isLoading && (
          <div className="flex gap-6 overflow-x-auto scrollbar-hide">
            {Array.from({ length: skeletonCount }).map((_, i) => (
              <Card
                key={i}
                className="basis-full md:basis-1/2 lg:basis-1/3"
              >
                <CardContent className="p-6 md:p-8 flex flex-col gap-4 h-64">
                  {/* Avatar */}
                  <div className="flex items-center gap-4">
                    <Skeleton className="rounded-full w-12 h-12 md:w-14 md:h-14" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-32 rounded" />
                      <Skeleton className="h-3 w-24 rounded" />
                    </div>
                  </div>

                  {/* Stars */}
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Skeleton key={i} className="w-4 h-4 rounded" />
                    ))}
                  </div>

                  {/* Review text */}
                  <div className="flex-1 space-y-2 mt-2">
                    <Skeleton className="h-4 w-full rounded" />
                    <Skeleton className="h-4 w-5/6 rounded" />
                    <Skeleton className="h-4 w-4/6 rounded" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {isError && (
          <p className="text-center text-red-500">Failed to load reviews.</p>
        )}

        {reviews && reviews.length > 0 && (
          <Carousel
            className="w-full"
            plugins={[plugin.current]}
            opts={{
              align: "start",
              loop: true,
            }}
          >
            {/* Buttons positioned absolutely inside Carousel */}
            <div className="flex justify-end gap-2 absolute right-9 top-0 z-10">
              <CarouselPrevious />
              <CarouselNext />
            </div>

            <CarouselContent className="mt-12 -ml-2 md:-ml-4">
              {reviews.map((review) => {
                const { userId, rating, review: content, createdAt } = review;
                const fullName = `${userId?.firstName} ${userId?.lastName}`;
                const initials = `${userId?.firstName?.[0] ?? ""}${userId?.lastName?.[0] ?? ""
                  }`;
                const formattedDate = new Date(createdAt).toLocaleDateString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  }
                );

                return (
                  <CarouselItem
                    key={review?._id}
                    className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3"
                  >
                    <Card className="h-full rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
                      <CardContent className="p-6 md:p-8 flex flex-col h-full">
                        <div className="flex items-center gap-4 mb-4">
                          <Avatar className="w-12 h-12 md:w-14 md:h-14">
                            <AvatarImage
                              src={userId?.profileImage || "/placeholder.svg"}
                              alt={fullName}
                            />
                            <AvatarFallback className="bg-blue-100 text-blue-600 font-semibold">
                              {initials}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 text-sm md:text-base">
                              {fullName}
                            </h3>
                            <p className="text-xs md:text-sm text-gray-600">
                              {formattedDate}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 mb-4">
                          {renderStars(rating)}
                        </div>

                        <blockquote className="text-sm text-wrap md:text-base text-gray-700 leading-relaxed flex-1">
                          &quot;{content.slice(0, 70)}&quot;
                        </blockquote>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
          </Carousel>
        )}
      </div>
    </div>
  );
}
