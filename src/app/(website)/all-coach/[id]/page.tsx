"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, Facebook, Instagram, Twitter, Linkedin } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"

// Define interfaces for type safety
interface Slot {
  startTime: string
  endTime: string
  isAvailable?: boolean
}

interface Availability {
  day: string
  slots: Slot[]
}

interface Skill {
  skillName: string
  description: string
}

interface Service {
  _id: string
  icon: string
  title: string
  description: string
  price: number
  overview: string
  overviewImage: string
  receive: string
  receiveImage: string
  whom: string
  whomImage: string
  createdAt: string
  updatedAt: string
  coaches?: string[]
}

interface Coach {
  _id: string
  firstName: string
  lastName: string
  specialization: string
  sessionDuration: string
  profileImage: string
  description: string
  qualification: string
  fieldOfExperiences: string
  skills: Skill[]
  availability: Availability[]
  servicesOffered: Service[] | Service // Handle both array and single object
}

interface CoachResponse {
  status: boolean
  message: string
  data: Coach
}

export default function CoachDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const coachId = params.id

  // Fetch coach details using react-query
  const { data, isLoading, isError } = useQuery<CoachResponse>({
    queryKey: ["coach", coachId],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/coach/${coachId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      if (!res.ok) throw new Error("Failed to fetch coach details")
      return res.json()
    },
  })

  const coach = data?.data

  // State for booking form
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    startTime: "",
    endTime: "",
  })

  // Handle form input changes
  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  // Handle appointment booking
  const handleBookAppointment = () => {
    if (!coach) return
    console.log("Appointment Booking Data:", formData)
    localStorage.setItem("appointmentData", JSON.stringify(formData))
    localStorage.setItem("coachData", JSON.stringify(coach))
    router.push("/payment")
  }

  // Loading state
  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  // Error state
  if (isError || !coach) {
    return <div className="min-h-screen flex items-center justify-center">Error loading coach details</div>
  }

  // Normalize servicesOffered to always be an array
  const servicesOffered = Array.isArray(coach.servicesOffered)
    ? coach.servicesOffered
    : coach.servicesOffered
    ? [coach.servicesOffered]
    : []

  // Extract price from the first service in servicesOffered
  const servicePrice = servicesOffered[0]?.price || 0

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Coach Details */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="w-48 h-48 mx-auto md:mx-0 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      height={300}
                      width={300}
                      src={coach.profileImage || "/placeholder.svg"}
                      alt={`${coach.firstName} ${coach.lastName}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-green-600 text-sm mb-2">{coach.specialization}</p>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                      {coach.firstName} {coach.lastName}
                    </h1>
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-2xl font-bold text-green-600">${servicePrice}</span>
                      <span className="text-gray-600">/ 60 minutes</span>
                    </div>
                    <div className="mb-4">
                      <h3 className="font-semibold text-gray-900 mb-2">
                        Specialized In: <span className="font-normal text-gray-600">{coach.specialization}</span>
                      </h3>
                    </div>
                    <div className="mb-4">
                      <h3 className="font-semibold text-gray-900 mb-2">Description:</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{coach.description}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Social Media:</h3>
                      <div className="flex gap-3">
                        <Facebook className="h-5 w-5 text-gray-400 hover:text-blue-600 cursor-pointer" />
                        <Instagram className="h-5 w-5 text-gray-400 hover:text-pink-600 cursor-pointer" />
                        <Twitter className="h-5 w-5 text-gray-400 hover:text-blue-400 cursor-pointer" />
                        <Linkedin className="h-5 w-5 text-gray-400 hover:text-blue-700 cursor-pointer" />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Qualification:</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm leading-relaxed">{coach.qualification}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Field of Experiences:</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm leading-relaxed">{coach.fieldOfExperiences}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Skills:</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {coach.skills.map((skill, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-gray-900">{skill.skillName}</span>
                        <span className="font-normal text-gray-600">{skill.description}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          {/* Right Column - Availability and Booking */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Opening Hours
                </CardTitle>
              </CardHeader>

              {/* <CardContent>
                <div className="space-y-2 text-sm">
                  {coach?.availability && Array.isArray(coach.availability) ? (
                    coach.availability.map((avail, index) => (
                      <p key={index}>
                        Day: {avail.day}, Slots: {avail.slots
                          .map((slot) => `${slot.startTime} - ${slot.endTime}`)
                          .join(", ")}
                      </p>
                    ))
                  ) : (
                    <p>No availability information available</p>
                  )}
                </div>
              </CardContent> */}


<CardContent>
  <div className="space-y-4 text-sm">
    {coach?.availability && Array.isArray(coach.availability) && coach.availability.length > 0 ? (
      coach.availability.map((avail, index) => (
        <div
          key={index}
          className="border rounded-xl p-4 bg-muted/50"
        >
          <p className="font-medium text-base ">
            {avail.day}
          </p>
          <div className="flex flex-wrap gap-2 mt-2">
            {avail.slots.map((slot, slotIndex) => (
              <span
                key={slotIndex}
                className="bg-primary/10  px-3 py-1 rounded-full text-xs font-medium"
              >
                {slot.startTime} - {slot.endTime}
              </span>
            ))}
          </div>
        </div>
      ))
    ) : (
      <p className="text-muted-foreground italic">No availability information available.</p>
    )}
  </div>
</CardContent>



            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Book Appointment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter your name..."
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your mail address..."
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    placeholder="Enter your Number..."
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                  />
                </div>
                <div>
                  <Label>Date</Label>
                  <p className="text-sm text-gray-600 mb-2">I’m available on:</p>
                  <div className="relative">
                    <Calendar className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      type="date"
                      value={formData.date}
                      onChange={(e) => handleInputChange("date", e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <Label>Start:</Label>
                  <Select value={formData.startTime} onValueChange={(value) => handleInputChange("startTime", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      {coach?.availability && Array.isArray(coach.availability) && coach.availability.length > 0 ? (
                        coach.availability.flatMap((avail) =>
                          avail.slots.map((slot) => (
                            <SelectItem key={`${avail.day}-${slot.startTime}`} value={slot.startTime}>
                              {slot.startTime}
                            </SelectItem>
                          ))
                        )
                      ) : (
                        <div className="px-4 py-2 text-sm text-gray-500">No time slots available</div>
                      )}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>End:</Label>
                  <Select value={formData.endTime} onValueChange={(value) => handleInputChange("endTime", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      {coach?.availability && Array.isArray(coach.availability) && coach.availability.length > 0 ? (
                        coach.availability.flatMap((avail) =>
                          avail.slots.map((slot) => (
                            <SelectItem key={`${avail.day}-${slot.endTime}`} value={slot.endTime}>
                              {slot.endTime}
                            </SelectItem>
                          ))
                        )
                      ) : (
                        <div className="px-4 py-2 text-sm text-gray-500">No time slots available</div>
                      )}
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full bg-green-600 hover:bg-green-700" onClick={handleBookAppointment}>
                  Book Appointment
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}