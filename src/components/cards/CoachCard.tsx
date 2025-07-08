"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Coach } from "@/types/coachDataType";

type CoachCardProps = {
  coach: Coach;
};

export default function CoachCard({ coach }: CoachCardProps) {
  const name = `${coach.firstName} ${coach.lastName}`;
  const specialty = coach.specialization;
  const experience = `${coach.yearsOfExperience}+ years`;
  const image = coach.profileImage || "/placeholder.svg";

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
        <div className="flex justify-center items-center gap-2 mb-3">
          <Badge variant="secondary">5 ⭐</Badge>
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
