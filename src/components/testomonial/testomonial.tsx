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
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/review-rating/all-reviews`,);
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

  const { data: reviews, isLoading, isError } = useQuery({
    queryKey: ["reviews"],
    queryFn: fetchReviews,
  });

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating
            ? "fill-yellow-400 text-yellow-400"
            : "fill-gray-200 text-gray-200"
          }`}
      />
    ));
  };

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

        {isLoading && <p className="text-center text-gray-500">Loading reviews...</p>}
        {isError && <p className="text-center text-red-500">Failed to load reviews.</p>}

        {reviews && reviews.length > 0 && (
          <Carousel
            className="w-full"
            plugins={[plugin.current]}
            opts={{
              align: "start",
              loop: true,
            }}
          >
            <div className="flex justify-end gap-0 mt-6 mb-6">
              <CarouselPrevious className="relative" />
              <CarouselNext className="relative" />
            </div>

            <CarouselContent className="-ml-2 md:-ml-4">
              {reviews.map((review) => {
                const { userId, rating, review: content, createdAt } = review;
                const fullName = `${userId.firstName} ${userId.lastName}`;
                const initials = `${userId.firstName?.[0] ?? ""}${userId.lastName?.[0] ?? ""}`;
                const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                });

                return (
                  <CarouselItem
                    key={review._id}
                    className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3"
                  >
                    <Card className="h-full rounded-lg bg-white shadow-[0px_0px_16px_0px_#00000014] hover:shadow-md transition-shadow duration-300">
                      <CardContent className="p-6 md:p-8 flex flex-col h-full">
                        <div className="flex items-center gap-4 mb-4">
                          <Avatar className="w-12 h-12 md:w-14 md:h-14">
                            <AvatarImage
                              src={userId.profileImage || "/placeholder.svg"}
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

                        <blockquote className="text-sm md:text-base text-gray-700 leading-relaxed flex-1">
                          &quot;{content}&quot;
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
