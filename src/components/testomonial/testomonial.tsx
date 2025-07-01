"use client";

import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";
// import { cn } from "@/lib/utils"
// import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const testimonials = [
  {
    name: "Sarah Johnson",
    title: "Yoga Enthusiast",
    image:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 5,
    quote:
      "The personalized wellness program transformed my approach to health. I've never felt more balanced and energized.",
  },
  {
    name: "Sarah Johnson",
    title: "Yoga Enthusiast",
    image:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 5,
    quote:
      "The personalized wellness program transformed my approach to health. I've never felt more balanced and energized.",
  },
  {
    name: "Sarah Johnson",
    title: "Yoga Enthusiast",
    image:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 5,
    quote:
      "The personalized wellness program transformed my approach to health. I've never felt more balanced and energized.",
  },
  {
    name: "Michael Chen",
    title: "Business Professional",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 5,
    quote:
      "After struggling with stress for years, the mindfulness practices I learned here have given me tools to find calm in any situation.",
  },
  {
    name: "Alicia Rodriguez",
    title: "Marathon Runner",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 5,
    quote:
      "The nutritional guidance was eye-opening. Small changes to my diet have made a remarkable difference in my energy levels.",
  },
];

export function Testimonial() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  return (
    <section className="w-full bg-[#f9f3fb] py-12">
      <div className="container px-4 mx-auto">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold">The Clarity Circle</h2>
            <p className="text-sm text-muted-foreground">
              wmc community for individuals committed to living well.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={scrollPrev}
              className="h-10 w-10 rounded-full border flex items-center justify-center hover:bg-gray-200 transition"
            >
              ←
            </button>
            <button
              onClick={scrollNext}
              className="h-10 w-10 rounded-full border flex items-center justify-center hover:bg-gray-200 transition"
            >
              →
            </button>
          </div>
        </div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-4">
            {testimonials.map((item, idx) => (
              <div
                key={idx}
                className="min-w-full md:min-w-[50%] lg:min-w-[33.333%] bg-white p-6 rounded-xl shadow-sm"
              >
                <div className="flex items-center gap-4 mb-4">
                  <Avatar>
                    <AvatarImage src={item.image} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold text-base">{item.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {item.title}
                    </p>
                    <div className="text-yellow-500 mt-1">
                      {"★".repeat(item.rating)}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  “{item.quote}”
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
