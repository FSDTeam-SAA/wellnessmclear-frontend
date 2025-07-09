"use client";

import Link from "next/link";
import ProductCard from "../cards/product-card";
import { useQuery } from "@tanstack/react-query";
import { ProductResponse } from "@/types/productDataType";

export default function NewArrivals() {
  const { data, isLoading, isError } = useQuery<ProductResponse>({
    queryKey: ["new-arrivals"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/product/new-arrivals`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!res.ok) {
        throw new Error("Failed to fetch products");
      }
      return res.json();
    },
  });

  const products = Array.isArray(data?.data)
    ? data?.data
    : data?.data?.products || [];

  return (
    <section
      className="w-full py-8 px-4"
      style={{ backgroundColor: "#f3e8ff" }}
    >
      <div className="lg:container mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">New Arrivals</h2>
          <Link
            href="/product"
            className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1"
          >
            View all products
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="animate-pulse bg-white p-4 rounded-lg shadow"
              >
                <div className="h-48 bg-gray-300 rounded mb-4"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-6 bg-gray-300 rounded w-1/3"></div>
              </div>
            ))}
          </div>
        ) : isError ? (
          <div className="text-center py-10 text-red-500">
            Failed to load new arrivals. Please try again later.
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-10 text-gray-600">
            No new arrivals found.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                showAddToCart={true}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
