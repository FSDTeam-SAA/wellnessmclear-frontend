"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Coach } from "@/types/coachDataType";
import { Star, StarHalf, StarOff } from "lucide-react";

type CoachCardProps = {
  coach: Coach;
};

function renderStars(rating: number) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;
  const totalStars = 5;

  const stars = [];

  for (let i = 0; i < fullStars; i++) {
    stars.push(<Star key={`full-${i}`} className="w-4 h-4 text-yellow-500 fill-yellow-500" />);
  }

  if (hasHalfStar) {
    stars.push(<StarHalf key="half" className="w-4 h-4 text-yellow-500 fill-yellow-500" />);
  }

  while (stars.length < totalStars) {
    stars.push(<StarOff key={`empty-${stars.length}`} className="w-4 h-4 text-gray-300" />);
  }

  return <div className="flex items-center gap-0.5">{stars}</div>;
}

export default function CoachCard({ coach }: CoachCardProps) {
  const name = `${coach.firstName} ${coach.lastName}`;
  const specialty = coach.specialization;
  const experience = `${coach.yearsOfExperience}+ years`;
  const image = coach.profileImage || "/placeholder.svg";
  const averageRating = coach.averageRating || 0;
  const reviewCount = coach.reviewCount || 0;

  return (
    <Card className="shadow-sm hover:shadow-lg transition-shadow">
      <CardHeader className="text-center pb-4">
        <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
          <Image
            height={96}
            width={96}
            src={image}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>
        <CardTitle className="text-lg font-semibold">{name}</CardTitle>
        <p className="text-sm text-gray-600">{specialty}</p>
      </CardHeader>
      <CardContent className="text-center">
        <div className="flex flex-col items-center gap-2 mb-3">
          <div className="flex items-center gap-2">
            {renderStars(averageRating)}
            <span className="text-sm text-gray-600">
              {averageRating.toFixed(1)} ({reviewCount} reviews)
            </span>
          </div>
          <Badge variant="outline">{experience}</Badge>
        </div>
        <Link href={`/all-coach/${coach._id}`}>
          <Button className="w-full bg-[#A8C2A3] hover:bg-[#A8C2A3]/70 text-white hover:text-black">
            Book Now
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
