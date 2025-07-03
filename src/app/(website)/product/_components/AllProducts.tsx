"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import ProductCard from "@/components/cards/product-card";
import { ProductResponse } from "@/types/productDataType";
import { Skeleton } from "@/components/ui/skeleton";

export default function AllProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [page, setPage] = useState(1);

  const categories = [
    { id: "all", name: "All Products" },
    { id: "daily-essentials", name: "Daily Essentials" },
    { id: "gut-detox", name: "Gut & Detox Support" },
    { id: "energy-focus", name: "Energy & Focus" },
    { id: "self-care", name: "Self-Care Rituals" },
  ];

  const { data, isLoading, isError, refetch } = useQuery<ProductResponse>({
    queryKey: ["products", page],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/product?page=${page}`,
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

  const products = data?.data.products || [];
  const pagination = data?.data.pagination || {
    page: 1,
    totalPages: 1,
    total: 0,
    limit: 10,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            All Products
          </h1>
          <p className="text-gray-600">{pagination.total} Results</p>
        </div>

        {/* Filters and Sort */}
        <div className="flex flex-wrap items-center gap-4 mb-8">
          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={
                  selectedCategory === category.id ? "default" : "outline"
                }
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className={
                  selectedCategory === category.id ? "bg-black text-white" : ""
                }
              >
                {category.name}
              </Button>
            ))}
          </div>

          {/* Price Filter */}
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2 bg-transparent"
          >
            Price
            <ChevronDown className="w-4 h-4" />
          </Button>

          {/* Sort By */}
          <div className="ml-auto flex items-center gap-2">
            <span className="text-sm text-gray-600">Sort by:</span>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2 bg-transparent"
            >
              Best Sellers
              <ChevronDown className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Products Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="h-52 w-full rounded-lg" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        ) : isError ? (
          <div className="flex flex-col items-center justify-center py-12 gap-4 text-center text-red-500">
            <p>Something went wrong while fetching products.</p>
            <Button onClick={() => refetch()} variant="outline">
              Retry
            </Button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {products.map((product) => (
                <ProductCard
                  key={product._id}
                  showAddToCart={true}
                  product={product}
                />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={pagination.page === 1}
              >
                Previous
              </Button>

              {Array.from({ length: pagination.totalPages }, (_, i) => (
                <Button
                  key={i + 1}
                  variant={pagination.page === i + 1 ? "default" : "outline"}
                  size="sm"
                  onClick={() => setPage(i + 1)}
                  className={
                    pagination.page === i + 1 ? "bg-black text-white" : ""
                  }
                >
                  {i + 1}
                </Button>
              ))}

              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setPage((prev) => Math.min(prev + 1, pagination.totalPages))
                }
                disabled={pagination.page === pagination.totalPages}
              >
                Next
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
