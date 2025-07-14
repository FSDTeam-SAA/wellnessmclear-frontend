// File: app/bookings/page.tsx
"use client";

import { X } from "lucide-react";
import Image from "next/image";


export interface Booking {
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
  date: string;
  availability: {
    day: string;
    slots: {
      startTime: string;
      endTime: string;
    }[];
  }[];
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const BookingModal = ({ booking, onClose }: { booking: Booking; onClose: () => void }) => {
  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

  const formatPrice = (amount: number, currency: string) => `$${amount} ${currency.toUpperCase()}`;

  const getStatusBadge = (status: string) => {
    const base = "px-3 py-1 rounded-full text-xs font-medium";
    if (status === "Scheduling") return `${base} bg-[#6A93B6] text-white`;
    if (status === "Completed") return `${base} bg-[#008000] text-white`;
    if (status === "Pending") return `${base} bg-[#FFA500] text-white`;
    return base;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-[#131313]">Booking Details</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="border-b border-gray-100 pb-4">
            <h3 className="text-lg font-semibold text-[#131313] mb-3">Service Information</h3>
            <div className="flex items-center space-x-4">
              <Image width={64} height={64} src={booking.service.icon} alt={booking.service.title} className="w-16 h-16 rounded-lg object-cover" />
              <div>
                <p className="font-medium text-[#131313]">{booking.service.title}</p>
                <p className="text-sm text-gray-600">Service ID: {booking.service._id}</p>
              </div>
            </div>
          </div>

          <div className="border-b border-gray-100 pb-4">
            <h3 className="text-lg font-semibold text-[#131313] mb-3">Booking Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><p className="text-sm text-gray-600 mb-1">Booking ID</p><p className="font-medium text-[#131313]">{booking._id}</p></div>
              <div><p className="text-sm text-gray-600 mb-1">Status</p><span className={getStatusBadge(booking.status)}>{booking.status}</span></div>
              <div><p className="text-sm text-gray-600 mb-1">Date</p><p className="font-medium text-[#131313]">{formatDate(booking.date)}</p></div>
              <div><p className="text-sm text-gray-600 mb-1">Coach ID</p><p className="font-medium text-[#131313]">{booking.coach._id}</p></div>
            </div>
          </div>

          <div className="border-b border-gray-100 pb-4">
            <h3 className="text-lg font-semibold text-[#131313] mb-3">Payment Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><p className="text-sm text-gray-600 mb-1">Amount</p><p className="font-medium text-[#131313]">{formatPrice(booking.payment.amount, booking.payment.currency)}</p></div>
              <div><p className="text-sm text-gray-600 mb-1">Payment Status</p><span className={`px-2 py-1 rounded text-xs font-medium ${booking.payment.status === "succeeded" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>{booking.payment.status}</span></div>
              <div><p className="text-sm text-gray-600 mb-1">Payment ID</p><p className="font-medium text-[#131313]">{booking.payment._id}</p></div>
            </div>
          </div>

          <div className="border-b border-gray-100 pb-4">
            <h3 className="text-lg font-semibold text-[#131313] mb-3">Availability</h3>
            <div className="space-y-2">
              {booking.availability.map((avail, i) => (
                <div key={i} className="bg-gray-50 rounded-lg p-3">
                  <p className="font-medium text-[#131313] mb-2">{avail.day}</p>
                  {avail.slots.map((slot, j) => (
                    <p key={j} className="text-sm text-gray-600">{slot.startTime} - {slot.endTime}</p>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-[#131313] mb-3">Timestamps</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><p className="text-sm text-gray-600 mb-1">Created At</p><p className="font-medium text-[#131313]">{formatDate(booking.createdAt)}</p></div>
              <div><p className="text-sm text-gray-600 mb-1">Updated At</p><p className="font-medium text-[#131313]">{formatDate(booking.updatedAt)}</p></div>
            </div>
          </div>
        </div>

        <div className="flex justify-end p-6 border-t border-gray-200">
          <button onClick={onClose} className="px-4 py-2 bg-[#23547B] text-white rounded-lg hover:bg-[#1a3f5f] transition-colors">Close</button>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;