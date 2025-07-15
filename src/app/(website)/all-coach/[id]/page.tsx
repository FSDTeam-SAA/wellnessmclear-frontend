// "use client"

// import { useState } from "react"
// import { useQuery } from "@tanstack/react-query"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Clock, Facebook, Instagram, Twitter, Linkedin } from "lucide-react"
// import Image from "next/image"
// import { useSession } from "next-auth/react"
// // import { useRouter } from "next/navigation"

// // Define interfaces for type safety
// interface Slot {
//   startTime: string
//   endTime: string
//   isAvailable?: boolean
// }

// interface Availability {
//   day: string
//   slots: Slot[]
// }

// interface Skill {
//   skillName: string
//   description: string
// }

// interface Service {
//   _id: string
//   icon: string
//   title: string
//   description: string
//   price: number
//   overview: string
//   overviewImage: string
//   receive: string
//   receiveImage: string
//   whom: string
//   whomImage: string
//   createdAt: string
//   updatedAt: string
//   coaches?: string[]
// }

// interface Coach {
//   _id: string
//   firstName: string
//   lastName: string
//   specialization: string
//   sessionDuration: string
//   profileImage: string
//   description: string
//   qualification: string
//   fieldOfExperiences: string
//   skills: Skill[]
//   availability: Availability[]
//   servicesOffered: Service[] | Service
// }

// interface CoachResponse {
//   status: boolean
//   message: string
//   data: Coach
// }

// interface PaymentResponse {
//   status: boolean
//   message: string
//   data: {
//     url: string
//   }
// }

// export default function CoachDetailsPage({ params }: { params: { id: string } }) {
//   const { data: session, status } = useSession()
//   const token = session?.user.accessToken
//   // const router = useRouter()
//   const coachId = params.id

//   // Fetch coach details using react-query
//   const { data, isLoading, isError } = useQuery<CoachResponse>({
//     queryKey: ["coach", coachId],
//     queryFn: async () => {
//       const res = await fetch(
//         `${process.env.NEXT_PUBLIC_BACKEND_URL}/coach/${coachId}`,
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       )
//       if (!res.ok) throw new Error("Failed to fetch coach details")
//       return res.json()
//     },
//   })

//   const coach = data?.data

//   // State for booking form
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     day: "",
//     timeSlot: "",
//   })

//   // Handle form input changes
//   const handleInputChange = (field: string, value: string) => {
//     setFormData((prev) => ({ ...prev, [field]: value }))
//   }

//   // Handle appointment booking
//   const handleBookAppointment = async () => {
//     if (!coach || !formData.day || !formData.timeSlot || !token) return

//     // Split timeSlot into startTime and endTime
//     const [startTime, endTime] = formData.timeSlot.split(" - ")

//     // Construct bookingDate (assuming the selected day is relative to the current week)
//     const today = new Date()
//     const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
//     const selectedDayIndex = daysOfWeek.indexOf(formData.day)
//     const currentDayIndex = today.getDay()
//     const dayDifference = selectedDayIndex - currentDayIndex
//     const bookingDate = new Date(today)
//     bookingDate.setDate(today.getDate() + dayDifference)
//     const formattedBookingDate = bookingDate.toISOString().split("T")[0] + "T00:00:00.000Z"

//     // Construct API body
//     const requestBody = {
//       type: "booking",
//       coachId: coach._id,
//       serviceId: Array.isArray(coach.servicesOffered) ? coach.servicesOffered[0]?._id : coach.servicesOffered?._id,
//       totalAmount: Array.isArray(coach.servicesOffered) ? coach.servicesOffered[0]?.price || 0 : coach.servicesOffered?.price || 0,
//       bookingDate: formattedBookingDate,
//       selectedSlots: [
//         {
//           day: formData.day,
//           slots: [
//             {
//               startTime,
//               endTime,
//             },
//           ],
//         },
//       ],
//     }

//     try {
//       const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/payment/checkout`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(requestBody),
//       })

//       if (!response.ok) {
//         throw new Error("Failed to initiate payment checkout")
//       }

//       const responseData: PaymentResponse = await response.json()
//       if (responseData.status && responseData.data.url) {
//         window.location.href = responseData.data.url // Redirect to the Stripe checkout URL
//       } else {
//         throw new Error("Invalid response from payment checkout API")
//       }
//     } catch (error) {
//       console.error("Error during payment checkout:", error)
//       // Handle error (e.g., show an error message to the user)
//     }
//   }

//   // Loading state
//   if (isLoading || status === "loading") {
//     return <div className="min-h-screen flex items-center justify-center">Loading...</div>
//   }

//   // Error state
//   if (isError || !coach) {
//     return <div className="min-h-screen flex items-center justify-center">Error loading coach details</div>
//   }

//   // Normalize servicesOffered to always be an array
//   const servicesOffered = Array.isArray(coach.servicesOffered)
//     ? coach.servicesOffered
//     : coach.servicesOffered
//     ? [coach.servicesOffered]
//     : []

//   // Extract price from the first service in servicesOffered
//   const servicePrice = servicesOffered[0]?.price || 0

//   // Get available days for the select dropdown
//   const availableDays = coach?.availability && Array.isArray(coach.availability)
//     ? coach.availability.map((avail) => avail.day)
//     : []

//   // Get slots for the selected day
//   const selectedDaySlots = coach?.availability?.find((avail) => avail.day === formData.day)?.slots || []

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Left Column - Coach Details */}
//           <div className="lg:col-span-2 space-y-6">
//             <Card>
//               <CardContent className="p-6">
//                 <div className="flex flex-col md:flex-row gap-6">
//                   <div className="w-48 h-48 mx-auto md:mx-0 rounded-lg overflow-hidden flex-shrink-0">
//                     <Image
//                       height={300}
//                       width={300}
//                       src={coach.profileImage || "/placeholder.svg"}
//                       alt={`${coach.firstName} ${coach.lastName}`}
//                       className="w-full h-full object-cover"
//                     />
//                   </div>
//                   <div className="flex-1">
//                     <p className="text-green-600 text-sm mb-2">{coach.specialization}</p>
//                     <h1 className="text-3xl font-bold text-gray-900 mb-2">
//                       {coach.firstName} {coach.lastName}
//                     </h1>
//                     <div className="flex items-center gap-4 mb-4">
//                       <span className="text-2xl font-bold text-green-600">${servicePrice}</span>
//                       <span className="text-gray-600">/ 60 minutes</span>
//                     </div>
//                     <div className="mb-4">
//                       <h3 className="font-semibold text-gray-900 mb-2">
//                         Specialized In: <span className="font-normal text-gray-600">{coach.specialization}</span>
//                       </h3>
//                     </div>
//                     <div className="mb-4">
//                       <h3 className="font-semibold text-gray-900 mb-2">Description:</h3>
//                       <p className="text-gray-600 text-sm leading-relaxed">{coach.description}</p>
//                     </div>
//                     <div>
//                       <h3 className="font-semibold text-gray-900 mb-2">Social Media:</h3>
//                       <div className="flex gap-3">
//                         <Facebook className="h-5 w-5 text-gray-400 hover:text-blue-600 cursor-pointer" />
//                         <Instagram className="h-5 w-5 text-gray-400 hover:text-pink-600 cursor-pointer" />
//                         <Twitter className="h-5 w-5 text-gray-400 hover:text-blue-400 cursor-pointer" />
//                         <Linkedin className="h-5 w-5 text-gray-400 hover:text-blue-700 cursor-pointer" />
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//             <Card>
//               <CardHeader>
//                 <CardTitle>Qualification:</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <p className="text-gray-600 text-sm leading-relaxed">{coach.qualification}</p>
//               </CardContent>
//             </Card>
//             <Card>
//               <CardHeader>
//                 <CardTitle>Field of Experiences:</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <p className="text-gray-600 text-sm leading-relaxed">{coach.fieldOfExperiences}</p>
//               </CardContent>
//             </Card>
//             <Card>
//               <CardHeader>
//                 <CardTitle>Skills:</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-4">
//                   {coach.skills.map((skill, index) => (
//                     <div key={index}>
//                       <div className="flex justify-between items-center mb-2">
//                         <span className="font-medium text-gray-900">{skill.skillName}</span>
//                         <span className="font-normal text-gray-600">{skill.description}</span>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//           {/* Right Column - Availability and Booking */}
//           <div className="space-y-6">
//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2">
//                   <Clock className="h-5 w-5" />
//                   Opening Hours
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-4 text-sm">
//                   {coach?.availability && Array.isArray(coach.availability) && coach.availability.length > 0 ? (
//                     coach.availability.map((avail, index) => (
//                       <div key={index} className="border rounded-xl p-4 bg-muted/50">
//                         <p className="font-medium text-base">{avail.day}</p>
//                         <div className="flex flex-wrap gap-2 mt-2">
//                           {avail.slots.map((slot, slotIndex) => (
//                             <span
//                               key={slotIndex}
//                               className="bg-primary/10 px-3 py-1 rounded-full text-xs font-medium"
//                             >
//                               {slot.startTime} - {slot.endTime}
//                             </span>
//                           ))}
//                         </div>
//                       </div>
//                     ))
//                   ) : (
//                     <p className="text-muted-foreground italic">No availability information available.</p>
//                   )}
//                 </div>
//               </CardContent>
//             </Card>
//             <Card>
//               <CardHeader>
//                 <CardTitle>Book Appointment</CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <div>
//                   <Label htmlFor="name">Name</Label>
//                   <Input
//                     id="name"
//                     placeholder="Enter your name..."
//                     value={formData.name}
//                     onChange={(e) => handleInputChange("name", e.target.value)}
//                   />
//                 </div>
//                 <div>
//                   <Label htmlFor="email">Email</Label>
//                   <Input
//                     id="email"
//                     type="email"
//                     placeholder="Enter your mail address..."
//                     value={formData.email}
//                     onChange={(e) => handleInputChange("email", e.target.value)}
//                   />
//                 </div>
//                 <div>
//                   <Label htmlFor="phone">Phone Number</Label>
//                   <Input
//                     id="phone"
//                     placeholder="Enter your Number..."
//                     value={formData.phone}
//                     onChange={(e) => handleInputChange("phone", e.target.value)}
//                   />
//                 </div>
//                 <div>
//                   <Label>Day</Label>
//                   <Select value={formData.day} onValueChange={(value) => {
//                     handleInputChange("day", value)
//                     handleInputChange("timeSlot", "") // Reset time slot when day changes
//                   }}>
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select a day" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       {availableDays.length > 0 ? (
//                         availableDays.map((day) => (
//                           <SelectItem key={day} value={day}>
//                             {day}
//                           </SelectItem>
//                         ))
//                       ) : (
//                         <div className="px-4 py-2 text-sm text-gray-500">No days available</div>
//                       )}
//                     </SelectContent>
//                   </Select>
//                 </div>
//                 <div>
//                   <Label>Time Slot</Label>
//                   <Select value={formData.timeSlot} onValueChange={(value) => handleInputChange("timeSlot", value)}>
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select a time slot" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       {formData.day && selectedDaySlots.length > 0 ? (
//                         selectedDaySlots.map((slot, index) => (
//                           <SelectItem key={index} value={`${slot.startTime} - ${slot.endTime}`}>
//                             {slot.startTime} - {slot.endTime}
//                           </SelectItem>
//                         ))
//                       ) : (
//                         <div className="px-4 py-2 text-sm text-gray-500">
//                           {formData.day ? "No time slots available for this day" : "Please select a day first"}
//                         </div>
//                       )}
//                     </SelectContent>
//                   </Select>
//                 </div>
//                 <Button
//                   className="w-full bg-green-600 hover:bg-green-700"
//                   onClick={handleBookAppointment}
//                   disabled={!formData.day || !formData.timeSlot || status !== "authenticated"}
//                 >
//                   Book Appointment
//                 </Button>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { Clock, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CoachDetailsSkeleton } from "@/components/CoachDetailsSkeleton";
import ProductReviews from "@/components/ProductReviews";
// import { CoachDetailsSkeleton } from "@/components/skeletons/CoachDetailsSkeleton";

interface Slot {
  startTime: string;
  endTime: string;
  isAvailable?: boolean;
}

interface Availability {
  day: string;
  slots: Slot[];
}

interface Skill {
  skillName: string;
  description: string;
}

interface Service {
  _id: string;
  icon: string;
  title: string;
  description: string;
  price: number;
  overview: string;
  overviewImage: string;
  receive: string;
  receiveImage: string;
  whom: string;
  whomImage: string;
  createdAt: string;
  updatedAt: string;
  coaches?: string[];
}

interface Coach {
  _id: string;
  firstName: string;
  lastName: string;
  specialization: string;
  sessionDuration: string;
  profileImage: string;
  description: string;
  qualification: string;
  fieldOfExperiences: string;
  skills: Skill[];
  availability: Availability[];
  servicesOffered: Service[] | Service;
}

interface CoachResponse {
  status: boolean;
  message: string;
  data: Coach;
}

interface PaymentResponse {
  status: boolean;
  message: string;
  data: {
    url: string;
  };
}

export default function CoachDetailsPage({ params }: { params: { id: string } }) {
  const { data: session, status } = useSession();
  const token = session?.user.accessToken;
  const coachId = params.id;

  const { data, isLoading, isError } = useQuery<CoachResponse>({
    queryKey: ["coach", coachId],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/coach/${coachId}`, {
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error("Failed to fetch coach details");
      return res.json();
    },
  });

  const coach = data?.data;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    day: "",
    timeSlot: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleBookAppointment = async () => {
    if (!coach || !formData.day || !formData.timeSlot || !token) return;
    const [startTime, endTime] = formData.timeSlot.split(" - ");
    const today = new Date();
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const selectedDayIndex = daysOfWeek.indexOf(formData.day);
    const currentDayIndex = today.getDay();
    const dayDifference = selectedDayIndex - currentDayIndex;
    const bookingDate = new Date(today);
    bookingDate.setDate(today.getDate() + dayDifference);
    const formattedBookingDate = bookingDate.toISOString().split("T")[0] + "T00:00:00.000Z";

    const service = Array.isArray(coach.servicesOffered) ? coach.servicesOffered[0] : coach.servicesOffered;
    const requestBody = {
      type: "booking",
      coachId: coach._id,
      serviceId: service?._id,
      totalAmount: service?.price || 0,
      bookingDate: formattedBookingDate,
      selectedSlots: [
        {
          day: formData.day,
          slots: [{ startTime, endTime }],
        },
      ],
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/payment/checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) throw new Error("Failed to initiate payment checkout");
      const responseData: PaymentResponse = await response.json();
      if (responseData.status && responseData.data.url) {
        window.location.href = responseData.data.url;
      } else {
        throw new Error("Invalid response from payment checkout API");
      }
    } catch (error) {
      console.error("Error during payment checkout:", error);
    }
  };

  if (isLoading || status === "loading") return <CoachDetailsSkeleton />;
  if (isError || !coach) return <div className="min-h-screen flex items-center justify-center">Error loading coach details</div>;

  const servicesOffered = Array.isArray(coach.servicesOffered)
    ? coach.servicesOffered
    : coach.servicesOffered
    ? [coach.servicesOffered]
    : [];
  const servicePrice = servicesOffered[0]?.price || 0;
  const availableDays = coach?.availability?.map((a) => a.day) || [];
  const selectedDaySlots = coach?.availability?.find((a) => a.day === formData.day)?.slots || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card><CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-48 h-48 rounded-lg overflow-hidden">
                  <Image height={300} width={300} src={coach.profileImage || "/placeholder.svg"} alt="Coach" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <p className="text-green-600 text-sm mb-2">{coach.specialization}</p>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{coach.firstName} {coach.lastName}</h1>
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-2xl font-bold text-green-600">${servicePrice}</span>
                    <span className="text-gray-600">/ 60 minutes</span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{coach.description}</p>
                  <h3 className="font-semibold text-gray-900 mb-2">Social Media:</h3>
                  <div className="flex gap-3">
                    <Facebook className="h-5 w-5 text-gray-400 hover:text-blue-600 cursor-pointer" />
                    <Instagram className="h-5 w-5 text-gray-400 hover:text-pink-600 cursor-pointer" />
                    <Twitter className="h-5 w-5 text-gray-400 hover:text-blue-400 cursor-pointer" />
                    <Linkedin className="h-5 w-5 text-gray-400 hover:text-blue-700 cursor-pointer" />
                  </div>
                </div>
              </div>
            </CardContent></Card>

            {["Qualification", "Field of Experiences", "Skills"].map((section, idx) => (
              <Card key={idx}>
                <CardHeader><CardTitle>{section}</CardTitle></CardHeader>
                <CardContent>
                  {section === "Skills" ? (
                    <div className="space-y-4">
                      {coach.skills.map((skill, i) => (
                        <div key={i} className="flex justify-between items-center">
                          <span className="font-medium text-gray-900">{skill.skillName}</span>
                          <span className="text-gray-600 text-sm">{skill.description}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {section === "Qualification" ? coach.qualification : coach.fieldOfExperiences}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><Clock className="h-5 w-5" /> Opening Hours</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-4 text-sm">
                  {coach.availability.map((avail, idx) => (
                    <div key={idx} className="border rounded-xl p-4 bg-muted/50">
                      <p className="font-medium text-base">{avail.day}</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {avail.slots.map((slot, i) => (
                          <span key={i} className="bg-primary/10 px-3 py-1 rounded-full text-xs font-medium">
                            {slot.startTime} - {slot.endTime}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Book Appointment</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                {["name", "email", "phone"].map((field) => (
                  <div key={field}>
                    <Label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</Label>
                    <Input id={field} placeholder={`Enter your ${field}...`} value={formData[field as keyof typeof formData]} onChange={(e) => handleInputChange(field, e.target.value)} />
                  </div>
                ))}

                <div>
                  <Label>Day</Label>
                  <Select value={formData.day} onValueChange={(val) => { handleInputChange("day", val); handleInputChange("timeSlot", ""); }}>
                    <SelectTrigger><SelectValue placeholder="Select a day" /></SelectTrigger>
                    <SelectContent>
                      {availableDays.map((day) => (
                        <SelectItem key={day} value={day}>{day}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Time Slot</Label>
                  <Select value={formData.timeSlot} onValueChange={(val) => handleInputChange("timeSlot", val)}>
                    <SelectTrigger><SelectValue placeholder="Select a time slot" /></SelectTrigger>
                    <SelectContent>
                      {formData.day && selectedDaySlots.length > 0 ? (
                        selectedDaySlots.map((slot, i) => (
                          <SelectItem key={i} value={`${slot.startTime} - ${slot.endTime}`}>{slot.startTime} - {slot.endTime}</SelectItem>
                        ))
                      ) : (
                        <div className="px-4 py-2 text-sm text-gray-500">
                          {formData.day ? "No time slots available for this day" : "Please select a day first"}
                        </div>
                      )}
                    </SelectContent>
                  </Select>
                </div>

                <Button className="w-full bg-green-600 hover:bg-green-700" onClick={handleBookAppointment} disabled={!formData.day || !formData.timeSlot || status !== "authenticated"}>
                  Book Appointment
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <div>
        <ProductReviews coachAndDcotorType="doctorId" productId={coachId} url="get-all-coach-reviews"/>
      </div>
    </div>
  );
}
