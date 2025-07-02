"use client";
import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function OrderPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const ordersData = [
    {
      id: 1,
      productName: "Brightening Serum",
      price: "$130.00",
      date: "Feb 10, 2025",
      status: "Processing",
    },
    {
      id: 2,
      productName: "Brightening Serum",
      price: "$130.00",
      date: "Feb 10, 2025",
      status: "Delivered",
    },
    {
      id: 3,
      productName: "Brightening Serum",
      price: "$130.00",
      date: "Feb 10, 2025",
      status: "Delivered",
    },
    {
      id: 4,
      productName: "Brightening Serum",
      price: "$130.00",
      date: "Feb 10, 2025",
      status: "Delivered",
    },
    {
      id: 5,
      productName: "Brightening Serum",
      price: "$130.00",
      date: "Feb 10, 2025",
      status: "Delivered",
    },
    {
      id: 6,
      productName: "Brightening Serum",
      price: "$130.00",
      date: "Feb 10, 2025",
      status: "Delivered",
    },
    {
      id: 7,
      productName: "Brightening Serum",
      price: "$130.00",
      date: "Feb 10, 2025",
      status: "Delivered",
    },
    {
      id: 8,
      productName: "Brightening Serum",
      price: "$124.00",
      date: "Feb 10, 2025",
      status: "Delivered",
    },
    {
      id: 9,
      productName: "Brightening Serum",
      price: "$10.00",
      date: "Feb 10, 2025",
      status: "Delivered",
    },
    {
      id: 10,
      productName: "Brightening Serum",
      price: "$10.00",
      date: "Feb 10, 2025",
      status: "Delivered",
    },
  ];

  const totalPages = Math.ceil(ordersData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = ordersData.slice(startIndex, startIndex + itemsPerPage);

  const getStatusBadge = (status: string) => {
    const baseClasses = "px-3 py-1 rounded-full text-xs font-medium";
    if (status === "Processing") {
      return `${baseClasses} bg-[#6A93B6] text-white`;
    } else if (status === "Delivered") {
      return `${baseClasses} bg-[#008000] text-white`;
    }
    return baseClasses;
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="bg-[#F8FAF9] ">
      <div className="lg:container mx-auto lg:py-[88px] md:py-[50px] py-[30px]">
        <h1 className="lg:text-[40px] md:text-[35px] text-[30px] font-bold text-center mb-10">
          Orders
        </h1>

        <div className="lg:border-2 border-[#23547B] rounded-[15px] lg:p-6 p-3 ">
          <div className="bg-white rounded-lg border border-[#23547B] overflow-x-scroll lg:overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-6 py-4 text-left text-[18px] font-medium text-[#131313] leading-[120%]">
                      Product Name
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
                  {currentItems.map((order, index) => (
                    <tr
                      key={order.id}
                      className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    >
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {order.productName}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {order.price}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {order.date}
                      </td>
                      <td className="px-6 py-4">
                        <span className={getStatusBadge(order.status)}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button className="text-[#424242] hover:text-blue-800 text-sm underline font-medium">
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="lg:px-6 mt-6 flex items-center justify-between">
            <span className="text-sm text-gray-700 hidden lg:block">
              Showing 1 of 10 results
            </span>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {[1, 2, 3].map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-2 rounded border text-sm ${
                    currentPage === page
                      ? "bg-green-500 text-white border-green-500"
                      : "border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {page}
                </button>
              ))}

              <span className="px-2 text-gray-500">...</span>

              <button
                onClick={() => handlePageChange(10)}
                className="px-3 py-2 rounded border border-gray-300 hover:bg-gray-50 text-sm"
              >
                10
              </button>

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
    </div>
  );
}
