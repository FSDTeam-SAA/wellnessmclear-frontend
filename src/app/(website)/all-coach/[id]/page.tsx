"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Calendar, Clock, Facebook, Instagram, Twitter, Linkedin } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

const coachData = {
  1: {
    name: "Test 111",
    specialty: "General Health Specialist",
    image: "/placeholder.svg?height=300&width=300",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in",
    qualification:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in",
    experience:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor si",
    skills: {
      "Medical Skills": 95,
      "Communication Skills": 100,
      "Patients Care": 98,
      "Career Overview": 95,
    },
    openingHours: {
      weekdays: "Monday to Friday: 10.00Am-06.00Pm",
      weekend: "Sunday: 10.00Am-02.00Pm",
    },
  },
}

export default function CoachDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const coachId = Number.parseInt(params.id)
  const coach = coachData[coachId as keyof typeof coachData] || coachData[1]

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    startTime: "",
    endTime: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleBookAppointment = () => {
    console.log("Appointment Booking Data:", formData)

    // Store appointment data in localStorage for the next page
    localStorage.setItem("appointmentData", JSON.stringify(formData))
    localStorage.setItem("coachData", JSON.stringify(coach))

    // Navigate to plans page
    router.push("/plans")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-gray-900">
              WMC
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-700 hover:text-gray-900">
                HOME
              </Link>
              <Link href="/shop" className="text-gray-700 hover:text-gray-900">
                SHOP
              </Link>
              <Link href="/blog" className="text-gray-700 hover:text-gray-900">
                BLOG
              </Link>
              <Link href="/community" className="text-gray-700 hover:text-gray-900">
                COMMUNITY
              </Link>
              <Link href="/" className="text-gray-900 font-medium">
                FIND A COACH
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Coach Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Coach Profile */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="w-48 h-48 mx-auto md:mx-0 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={coach.image || "/placeholder.svg"}
                      alt={coach.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-green-600 text-sm mb-2">Lorem ipsum dolor sit amet.</p>
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">{coach.name}</h1>
                    <div className="mb-4">
                      <h3 className="font-semibold text-gray-900 mb-2">
                        Specialized In: <span className="font-normal text-gray-600">Lorem ipsum dolor sit amet.</span>
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

            {/* Qualification */}
            <Card>
              <CardHeader>
                <CardTitle>Qualification:</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm leading-relaxed">{coach.qualification}</p>
              </CardContent>
            </Card>

            {/* Field of Experience */}
            <Card>
              <CardHeader>
                <CardTitle>Field of Experiences:</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm leading-relaxed">{coach.experience}</p>
              </CardContent>
            </Card>

            {/* Skills */}
            <Card>
              <CardContent className="p-6">
                <div className="space-y-6">
                  {Object.entries(coach.skills).map(([skill, percentage]) => (
                    <div key={skill}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-gray-900">{skill}:</span>
                        <span className="font-bold text-gray-900">{percentage}%</span>
                      </div>
                      <Progress value={percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Booking */}
          <div className="space-y-6">
            {/* Opening Hours */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Opening Hours
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <p>{coach.openingHours.weekdays}</p>
                  <p>{coach.openingHours.weekend}</p>
                </div>
              </CardContent>
            </Card>

            {/* Book Appointment */}
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
                  <Label>Time</Label>
                  <p className="text-sm text-gray-600 mb-2">I'm available on:</p>
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
                      <SelectValue placeholder="09.00Am" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="09:00">09.00Am</SelectItem>
                      <SelectItem value="10:00">10.00Am</SelectItem>
                      <SelectItem value="11:00">11.00Am</SelectItem>
                      <SelectItem value="14:00">02.00Pm</SelectItem>
                      <SelectItem value="15:00">03.00Pm</SelectItem>
                      <SelectItem value="16:00">04.00Pm</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>End:</Label>
                  <Select value={formData.endTime} onValueChange={(value) => handleInputChange("endTime", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="10.00Am" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10:00">10.00Am</SelectItem>
                      <SelectItem value="11:00">11.00Am</SelectItem>
                      <SelectItem value="12:00">12.00Pm</SelectItem>
                      <SelectItem value="15:00">03.00Pm</SelectItem>
                      <SelectItem value="16:00">04.00Pm</SelectItem>
                      <SelectItem value="17:00">05.00Pm</SelectItem>
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
