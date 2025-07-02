"use client"

import { useState } from "react"

import CoachCard from "@/components/cards/CoachCard"

const coaches = [
  {
    id: 1,
    name: "Dr. Jordan Peele",
    specialty: "General Health Specialist",
    image: "https://www.shutterstock.com/image-photo/head-shot-portrait-close-smiling-600nw-1714666150.jpg",
    rating: 5.0,
    experience: "10+ years",
    category: "General Health",
  },
  {
    id: 2,
    name: "Dr. Sarah Wilson",
    specialty: "Mental Health Specialist",
    image: "https://www.shutterstock.com/image-photo/head-shot-portrait-close-smiling-600nw-1714666150.jpg",
    rating: 4.8,
    experience: "8+ years",
    category: "Mental Health",
  },
  {
    id: 3,
    name: "Dr. Michael Chen",
    specialty: "Fitness Coach",
    image: "https://www.shutterstock.com/image-photo/head-shot-portrait-close-smiling-600nw-1714666150.jpg",
    rating: 4.7,
    experience: "12+ years",
    category: "Fitness",
  },
  {
    id: 4,
    name: "Dr. Emily Davis",
    specialty: "Nutrition Specialist",
    image: "https://www.shutterstock.com/image-photo/head-shot-portrait-close-smiling-600nw-1714666150.jpg",
    rating: 4.9,
    experience: "7+ years",
    category: "Nutrition",
  },
  {
    id: 5,
    name: "Dr. Robert Johnson",
    specialty: "Life Coach",
    image: "https://www.shutterstock.com/image-photo/head-shot-portrait-close-smiling-600nw-1714666150.jpg",
    rating: 4.6,
    experience: "15+ years",
    category: "Life Coaching",
  },
  {
    id: 6,
    name: "Dr. Lisa Anderson",
    specialty: "Wellness Expert",
    image: "https://www.shutterstock.com/image-photo/head-shot-portrait-close-smiling-600nw-1714666150.jpg",
    rating: 4.8,
    experience: "9+ years",
    category: "Wellness",
  },
]

export default function AllCoachesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedExperience, setSelectedExperience] = useState("all")


  const filteredCoaches = coaches.filter((coach) => {
    const matchesSearch =
      coach.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coach.specialty.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || coach.category === selectedCategory
    const matchesExperience = selectedExperience === "all" || coach.experience === selectedExperience

    return matchesSearch && matchesCategory && matchesExperience
  })

  return (
    <div className="min-h-screen bg-gray-50">
 
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">All Coaches</h2>
          <p className="text-gray-600">{filteredCoaches.length} coaches available</p>
        </div>

   

        {/* Coaches Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCoaches.map((coach) => (
     <CoachCard key={coach.id} coach={coach} />
          ))}
        </div>

        {filteredCoaches.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No coaches found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  )
}
