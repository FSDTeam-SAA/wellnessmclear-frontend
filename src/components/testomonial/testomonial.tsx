"use client";

import * as React from "react";
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

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Yoga Enthusiast",
    avatar: "/placeholder.svg?height=60&width=60",
    rating: 5,
    testimonial:
      "The personalized wellness program transformed my approach to health. I've never felt more balanced and energized.",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Business Professional",
    avatar: "/placeholder.svg?height=60&width=60",
    rating: 5,
    testimonial:
      "After struggling with stress for years, the mindfulness practices I learned here have given me tools to find calm in any situation.",
  },
  {
    id: 3,
    name: "Alicia Rodriguez",
    role: "Marathon Runner",
    avatar: "/placeholder.svg?height=60&width=60",
    rating: 5,
    testimonial:
      "The nutritional guidance was eye-opening. Small changes to my diet have made a remarkable difference in my energy levels.",
  },
  {
    id: 4,
    name: "David Kim",
    role: "Software Engineer",
    avatar: "/placeholder.svg?height=60&width=60",
    rating: 5,
    testimonial:
      "The community support and expert guidance helped me develop sustainable healthy habits that fit my busy lifestyle.",
  },
  {
    id: 5,
    name: "Emma Thompson",
    role: "Teacher",
    avatar: "/placeholder.svg?height=60&width=60",
    rating: 5,
    testimonial:
      "I've tried many wellness programs, but this one truly understands the importance of mental and physical balance.",
  },
];

export default function TestimonialCarousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating
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

        <Carousel
          className="w-full"
          plugins={[plugin.current]}
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <div className="flex justify-end mt-6 mb-6">
            <CarouselPrevious className="relative" />
            <CarouselNext className="relative" />
          </div>

          <CarouselContent className="-ml-2 md:-ml-4">
            {testimonials.map((testimonial) => (
              <CarouselItem
                key={testimonial.id}
                className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3"
              >
                <Card className="h-full rounded-lg bg-white shadow-[0px_0px_16px_0px_#00000014] hover:shadow-md transition-shadow duration-300">
                  <CardContent className="p-6 md:p-8 flex flex-col h-full">
                    <div className="flex items-center gap-4 mb-4">
                      <Avatar className="w-12 h-12 md:w-14 md:h-14">
                        <AvatarImage
                          src={testimonial.avatar || "/placeholder.svg"}
                          alt={testimonial.name}
                        />
                        <AvatarFallback className="bg-blue-100 text-blue-600 font-semibold">
                          {testimonial.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 text-sm md:text-base">
                          {testimonial.name}
                        </h3>
                        <p className="text-xs md:text-sm text-gray-600">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 mb-4">
                      {renderStars(testimonial.rating)}
                    </div>

                    <blockquote className="text-sm md:text-base text-gray-700 leading-relaxed flex-1">
                      &quot;{testimonial.testimonial}&quot;
                    </blockquote>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
}
