"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

interface Coach {
  id: number
  name: string
  specialty: string
  image: string
  rating: number
  experience: string
}

export default function CoachCard({ coach }: { coach: Coach }) {
  return (
    <Card className="shadow-sm hover:shadow-lg transition-shadow">
      <CardHeader className="text-center pb-4">
        <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
          <Image
            height={96}
            width={96}
            src={coach.image || "/placeholder.svg"}
            alt={coach.name}
            className="w-full h-full object-cover"
          />
        </div>
        <CardTitle className="text-lg">{coach.name}</CardTitle>
        <p className="text-sm text-gray-600">{coach.specialty}</p>
      </CardHeader>
      <CardContent className="text-center">
        <div className="flex justify-center items-center gap-2 mb-3">
          <Badge variant="secondary">{coach.rating} ⭐</Badge>
          <Badge variant="outline">{coach.experience}</Badge>
        </div>
        <Link href={`/all-coach/${coach.id}`}>
          <Button className="w-full bg-[#A8C2A3] hover:bg-[#A8C2A3]/70 text-white hover:text-black">Book Now</Button>
        </Link>
      </CardContent>
    </Card>
  )
}
