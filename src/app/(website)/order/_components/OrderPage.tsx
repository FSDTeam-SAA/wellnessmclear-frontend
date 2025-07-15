"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { Order, OrderResponse } from "@/types/orderDataType";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";

export default function OrderPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const itemsPerPage = 10;
  const { data: session } = useSession();
  const token = session?.user.accessToken;

  const { data } = useQuery<OrderResponse>({
    queryKey: ["order"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/product/user/products`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!res.ok) throw new Error("Failed to fetch orders");
      return res.json();
    },
    enabled: !!token,
  });

  const orders = data?.data || [];
  const totalPages = Math.ceil(orders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = orders.slice(startIndex, startIndex + itemsPerPage);

  const getStatusBadge = (status: string) => {
    const base = "px-3 py-1 rounded-full text-xs font-medium";
    switch (status) {
      case "Processing":
        return `${base} bg-[#6A93B6] text-white`;
      case "Delivered":
        return `${base} bg-[#008000] text-white`;
      case "failed":
        return `${base} bg-red-500 text-white`;
      case "succeeded":
        return `${base} bg-green-500 text-white`;
      default:
        return base;
    }
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="bg-[#F8FAF9]">
      <div className="lg:container mx-auto py-12">
        <h1 className="text-center text-3xl md:text-4xl font-bold mb-10">Orders</h1>

        <div className="border border-[#23547B] rounded-[15px] p-4 md:p-6">
          <div className="bg-white rounded-lg border border-[#23547B] overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Products</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Amount</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((order) => (
                  <tr key={order._id} className="border-b">
                    <td className="px-6 py-4 text-sm">
                      {order.product.map((p, i) => (
                        <div key={i}>{p.product?.name ?? "Unknown Product"}</div>
                      ))}
                    </td>
                    <td className="px-6 py-4 text-sm">${order.amount}</td>
                    <td className="px-6 py-4 text-sm">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <span className={getStatusBadge(order.status)}>{order.status}</span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="text-blue-600 hover:underline text-sm"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="mt-6 flex items-center justify-between">
            <span className="text-sm text-gray-600">
              Showing {startIndex + 1} to {startIndex + currentItems.length} of {orders.length} results
            </span>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded border border-gray-300 disabled:opacity-50 hover:bg-gray-100"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-2 rounded border text-sm ${
                    currentPage === page ? "bg-green-500 text-white border-green-500" : "border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 rounded border border-gray-300 disabled:opacity-50 hover:bg-gray-100"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-center text-3xl ">Order Details</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-4">
              <p><strong>Order ID:</strong> {selectedOrder._id}</p>
              <p><strong>User ID:</strong> {selectedOrder.userId}</p>
              <p><strong>Amount:</strong> ${selectedOrder.amount}</p>
              <p><strong>Status:</strong> <span className={getStatusBadge(selectedOrder.status)}>{selectedOrder.status}</span></p>
              <p><strong>Date:</strong> {new Date(selectedOrder.createdAt).toLocaleString()}</p>
              <div>
                <strong>Products:</strong>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                  {selectedOrder.product.map((item, i) => (
                    <div key={i} className="flex items-start gap-4 border p-3 rounded-md">
                      <Image
                      width={100}
                      height={100}
                        src={item.product?.image || "/placeholder.png"}
                        alt={item.product?.name || "Product"}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="overflow-hidden w-auto">
                    <p className="font-semibold text-justify">
  {item.product?.name?.slice(0, 25)}{(item.product?.name?.length ?? 0) > 25 ? '...' : ''}
</p>
                        {/* <p className="text-sm text-gray-600">{item.product?.description}</p> */}
                        <p className="text-sm text-gray-500">Brand: {item.product?.brand}</p>
                        <p className="text-sm text-gray-500">Category: {item.product?.category?.name}</p>
                        <p className="text-sm mt-1">Qty: {item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}