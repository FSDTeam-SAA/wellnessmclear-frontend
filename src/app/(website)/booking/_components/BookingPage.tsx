"use client";
import React, { useState } from "react";
import { ChevronLeft, ChevronRight,} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { Skeleton } from "@/components/ui/skeleton";
import BookingModal from "./BookingModal";


interface Booking {
  _id: string;
  user: string;
  coach: {
    _id: string;
  };
  service: {
    _id: string;
    icon: string;
    title: string;
  };
  payment: {
    _id: string;
    amount: number;
    currency: string;
    status: string;
  };
  date: string; // ISO date string
  availability: {
    day: string;
    slots: {
      startTime: string;
      endTime: string;
    }[];
  }[];
  status: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
}

const BookingTableSkeleton = () => {
  return (
    <div className="bg-white rounded-lg border border-[#23547B] lg:overflow-hidden overflow-scroll">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-6 py-4 text-left text-[18px] font-medium text-[#131313] leading-[120%]">
                Service Name
              </th>
              <th className="px-6 py-4 text-left text-[18px] font-medium text-[#131313] leading-[120%]">
                Price
              </th>
              <th className="px-6 py-4 text-left text-[18px] font-medium text-[#131313] leading-[120%]">
                Date
              </th>
              <th className="px-6 py-4 text-left text-[18px] font-medium text-[#131313] leading-[120%]">
                Status
              </th>
              <th className="px-6 py-4 text-left text-[18px] font-medium text-[#131313] leading-[120%]">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {[...Array(10)].map((_, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="px-6 py-4">
                  <Skeleton className="h-4 w-32" />
                </td>
                <td className="px-6 py-4">
                  <Skeleton className="h-4 w-16" />
                </td>
                <td className="px-6 py-4">
                  <Skeleton className="h-4 w-24" />
                </td>
                <td className="px-6 py-4">
                  <Skeleton className="h-6 w-20 rounded-full" />
                </td>
                <td className="px-6 py-4">
                  <Skeleton className="h-4 w-20" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// const BookingModal = ({
//   booking,
//   onClose,
// }: {
//   booking: Booking;
//   onClose: () => void;
// }) => {
//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     });
//   };

//   const formatPrice = (amount: number, currency: string) => {
//     return `$${amount} ${currency.toUpperCase()}`;
//   };

//   const getStatusBadge = (status: string) => {
//     const baseClasses = "px-3 py-1 rounded-full text-xs font-medium";
//     if (status === "Scheduling") {
//       return `${baseClasses} bg-[#6A93B6] text-white`;
//     } else if (status === "Completed") {
//       return `${baseClasses} bg-[#008000] text-white`;
//     } else if (status === "Pending") {
//       return `${baseClasses} bg-[#FFA500] text-white`;
//     }
//     return baseClasses;
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//         {/* Header */}
//         <div className="flex justify-between items-center p-6 border-b border-gray-200">
//           <h2 className="text-xl font-bold text-[#131313]">Booking Details</h2>
//           <button
//             onClick={onClose}
//             className="text-gray-400 hover:text-gray-600 transition-colors"
//           >
//             <X className="w-6 h-6" />
//           </button>
//         </div>

//         {/* Content */}
//         <div className="p-6 space-y-6">
//           {/* Service Information */}
//           <div className="border-b border-gray-100 pb-4">
//             <h3 className="text-lg font-semibold text-[#131313] mb-3">
//               Service Information
//             </h3>
//             <div className="flex items-center space-x-4">
//               <Image
//                 width={500}
//                 height={400}
//                 src={booking.service.icon}
//                 alt={booking.service.title}
//                 className="w-16 h-16 rounded-lg object-cover"
//               />
//               <div>
//                 <p className="font-medium text-[#131313]">
//                   {booking.service.title}
//                 </p>
//                 <p className="text-sm text-gray-600">
//                   Service ID: {booking.service._id}
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Booking Details */}
//           <div className="border-b border-gray-100 pb-4">
//             <h3 className="text-lg font-semibold text-[#131313] mb-3">
//               Booking Details
//             </h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <p className="text-sm text-gray-600 mb-1">Booking ID</p>
//                 <p className="font-medium text-[#131313]">{booking._id}</p>
//               </div>
//               <div>
//                 <p className="text-sm text-gray-600 mb-1">Status</p>
//                 <span className={getStatusBadge(booking.status)}>
//                   {booking.status}
//                 </span>
//               </div>
//               <div>
//                 <p className="text-sm text-gray-600 mb-1">Date</p>
//                 <p className="font-medium text-[#131313]">
//                   {formatDate(booking.date)}
//                 </p>
//               </div>
//               <div>
//                 <p className="text-sm text-gray-600 mb-1">Coach ID</p>
//                 <p className="font-medium text-[#131313]">
//                   {booking.coach._id}
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Payment Information */}
//           <div className="border-b border-gray-100 pb-4">
//             <h3 className="text-lg font-semibold text-[#131313] mb-3">
//               Payment Information
//             </h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <p className="text-sm text-gray-600 mb-1">Amount</p>
//                 <p className="font-medium text-[#131313]">
//                   {formatPrice(
//                     booking.payment.amount,
//                     booking.payment.currency
//                   )}
//                 </p>
//               </div>
//               <div>
//                 <p className="text-sm text-gray-600 mb-1">Payment Status</p>
//                 <span
//                   className={`px-2 py-1 rounded text-xs font-medium ${
//                     booking.payment.status === "succeeded"
//                       ? "bg-green-100 text-green-800"
//                       : "bg-red-100 text-red-800"
//                   }`}
//                 >
//                   {booking.payment.status}
//                 </span>
//               </div>
//               <div>
//                 <p className="text-sm text-gray-600 mb-1">Payment ID</p>
//                 <p className="font-medium text-[#131313]">
//                   {booking.payment._id}
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Availability */}
//           <div className="border-b border-gray-100 pb-4">
//             <h3 className="text-lg font-semibold text-[#131313] mb-3">
//               Availability
//             </h3>
//             <div className="space-y-2">
//               {booking.availability.map((avail, index) => (
//                 <div key={index} className="bg-gray-50 rounded-lg p-3">
//                   <p className="font-medium text-[#131313] mb-2">{avail.day}</p>
//                   <div className="space-y-1">
//                     {avail.slots.map((slot, slotIndex) => (
//                       <p key={slotIndex} className="text-sm text-gray-600">
//                         {slot.startTime} - {slot.endTime}
//                       </p>
//                     ))}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Timestamps */}
//           <div>
//             <h3 className="text-lg font-semibold text-[#131313] mb-3">
//               Timestamps
//             </h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <p className="text-sm text-gray-600 mb-1">Created At</p>
//                 <p className="font-medium text-[#131313]">
//                   {formatDate(booking.createdAt)}
//                 </p>
//               </div>
//               <div>
//                 <p className="text-sm text-gray-600 mb-1">Updated At</p>
//                 <p className="font-medium text-[#131313]">
//                   {formatDate(booking.updatedAt)}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Footer */}
//         <div className="flex justify-end p-6 border-t border-gray-200">
//           <button
//             onClick={onClose}
//             className="px-4 py-2 bg-[#23547B] text-white rounded-lg hover:bg-[#1a3f5f] transition-colors"
//           >
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

export default function BookingPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const itemsPerPage = 10;

  const session = useSession();
  const TOKEN = session?.data?.user?.accessToken;

  const { data, isLoading, error } = useQuery({
    queryKey: ["booking"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/booking/user/bookings`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch booking data");
      }

      const data = await res.json();
      return data;
    },
  });

  console.log("data", data);

  // Handle loading and error states
  if (isLoading) {
    return (
      <div className="bg-[#F8FAF9]">
        <div className="lg:container mx-auto lg:py-[88px] md:py-[50px] py-[30px]">
          <h1 className="lg:text-[40px] md:text-[30px] text-[24xp] font-bold text-center mb-10">
            Bookings
          </h1>
          <div className="lg:border-2 border-[#23547B] rounded-[15px] lg:p-6 p-3">
            <BookingTableSkeleton />
            <div className="lg:px-6 mt-6 flex items-center justify-between">
              <div className="hidden lg:block">
                <Skeleton className="h-4 w-32" />
              </div>
              <div className="flex items-center space-x-2">
                <Skeleton className="h-8 w-8" />
                <Skeleton className="h-8 w-8" />
                <Skeleton className="h-8 w-8" />
                <Skeleton className="h-8 w-8" />
                <Skeleton className="h-8 w-8" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#F8FAF9]">
        <div className="lg:container mx-auto lg:py-[88px] md:py-[50px] py-[30px]">
          <h1 className="lg:text-[40px] md:text-[30px] text-[24xp] font-bold text-center mb-10">
            Bookings
          </h1>
          <div className="text-center text-red-500">Error loading bookings</div>
        </div>
      </div>
    );
  }

  // Use the actual data from API response
  const bookingsData = data?.data || [];
  const totalPages = Math.ceil(bookingsData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = bookingsData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  console.log("current", currentItems);

  const getStatusBadge = (status: string) => {
    const baseClasses = "px-3 py-1 rounded-full text-xs font-medium";
    if (status === "Scheduling") {
      return `${baseClasses} bg-[#6A93B6] text-white`;
    } else if (status === "Completed") {
      return `${baseClasses} bg-[#008000] text-white`;
    } else if (status === "Pending") {
    } else if (status === "Approved") {
      return `${baseClasses} bg-[#008000] text-white`;
    } else if (status === "Pending") {
      return `${baseClasses} bg-[#FFA500] text-white`;
    }
    return baseClasses;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatPrice = (amount: number, currency: string) => {
    return `$${amount} ${currency.toUpperCase()}`;
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleViewDetails = (booking: Booking) => {
    setSelectedBooking(booking);
  };

  const handleCloseModal = () => {
    setSelectedBooking(null);
  };

  const generatePageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3);
      } else if (currentPage >= totalPages - 2) {
        pages.push(totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(currentPage - 1, currentPage, currentPage + 1);
      }
    }

    return pages;
  };

  return (
    <div className="bg-[#F8FAF9]">
      <div className="lg:container mx-auto lg:py-[88px] md:py-[50px] py-[30px]">
        <h1 className="lg:text-[40px] md:text-[30px] text-[24xp] font-bold text-center mb-10">
          Bookings
        </h1>

        <div className="lg:border-2 border-[#23547B] rounded-[15px] lg:p-6 p-3">
          <div className="bg-white rounded-lg border border-[#23547B] lg:overflow-hidden overflow-scroll">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-6 py-4 text-left text-[18px] font-medium text-[#131313] leading-[120%]">
                      Service Name
                    </th>
                    <th className="px-6 py-4 text-left text-[18px] font-medium text-[#131313] leading-[120%]">
                      Price
                    </th>
                    <th className="px-6 py-4 text-left text-[18px] font-medium text-[#131313] leading-[120%]">
                      Date
                    </th>
                    <th className="px-6 py-4 text-left text-[18px] font-medium text-[#131313] leading-[120%]">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-[18px] font-medium text-[#131313] leading-[120%]">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.length > 0 ? (
                    currentItems.map((booking: Booking, index: number) => (
                      <tr
                        key={booking._id}
                        className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                      >
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {booking.service.title}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {formatPrice(
                            booking.payment.amount,
                            booking.payment.currency
                          )}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {formatDate(booking.date)}
                        </td>
                        <td className="px-6 py-4">
                          <span className={getStatusBadge(booking.status)}>
                            {booking.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => handleViewDetails(booking)}
                            className="text-[#424242] hover:text-blue-800 text-sm underline font-medium"
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-6 py-4 text-center text-gray-500"
                      >
                        <p className="text-center">No bookings found</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div className="lg:px-6 mt-6 flex items-center justify-between">
            <span className="text-sm text-gray-700 hidden lg:block">
              Showing {startIndex + 1} to{" "}
              {Math.min(startIndex + itemsPerPage, bookingsData.length)} of{" "}
              {bookingsData.length} results
            </span>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {generatePageNumbers().map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-2 rounded border text-sm ${
                    currentPage === page
                      ? "bg-[#A8C2A3] text-white border-green-500"
                      : "border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {page}
                </button>
              ))}

              {totalPages > 5 && currentPage < totalPages - 2 && (
                <>
                  <span className="px-2 text-gray-500">...</span>
                  <button
                    onClick={() => handlePageChange(totalPages)}
                    className="px-3 py-2 rounded border border-gray-300 hover:bg-gray-50 text-sm"
                  >
                    {totalPages}
                  </button>
                </>
              )}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 rounded border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedBooking && (
        <BookingModal booking={selectedBooking} onClose={handleCloseModal} />
      )}
    </div>
  );
}
