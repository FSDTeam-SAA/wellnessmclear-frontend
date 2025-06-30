"use client";

import { useState } from "react";
// import ProductCard from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import ProductCard from "@/components/products/product-card";

export default function AllProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  // const [sortBy, setSortBy] = useState("best-sellers");
  const categories = [
    { id: "all", name: "All Products" },
    { id: "daily-essentials", name: "Daily Essentials" },
    { id: "gut-detox", name: "Gut & Detox Support" },
    { id: "energy-focus", name: "Energy & Focus" },
    { id: "self-care", name: "Self-Care Rituals" },
  ];

  const products = [
    {
      id: 1,
      name: "Brightening Serum",
      category: "Serums",
      price: 65,
      rating: 4.8,
      reviews: 161,
      image: "https://plus.unsplash.com/premium_photo-1679913792906-13ccc5c84d44?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D",
      isFavorite: false,
    },
    {
      id: 2,
      name: "Brightening Serum",
      category: "Serums",
      price: 65,
      rating: 4.9,
      reviews: 186,
     image:"https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D",
      isFavorite: false,
    },
    {
      id: 3,
      name: "Brightening Serum",
      category: "Serums",
      price: 65,
      rating: 4.9,
      reviews: 186,
      image: "https://plus.unsplash.com/premium_photo-1679913792906-13ccc5c84d44?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D",
      isFavorite: true,
    },
    {
      id: 4,
      name: "Brightening Serum",
      category: "Serums",
      price: 65,
      rating: 4.9,
      reviews: 186,
      image: "https://plus.unsplash.com/premium_photo-1679913792906-13ccc5c84d44?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D",
      isFavorite: false,
    },
    {
      id: 5,
      name: "Brightening Serum",
      category: "Serums",
      price: 65,
      rating: 4.8,
      reviews: 161,
      image: "https://plus.unsplash.com/premium_photo-1679913792906-13ccc5c84d44?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D",
      isFavorite: false,
    },
    {
      id: 6,
      name: "Brightening Serum",
      category: "Serums",
      price: 65,
      rating: 4.9,
      reviews: 186,
      image: "https://plus.unsplash.com/premium_photo-1679913792906-13ccc5c84d44?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D",
      isFavorite: false,
    },
    {
      id: 7,
      name: "Brightening Serum",
      category: "Serums",
      price: 65,
      rating: 4.9,
      reviews: 186,
      image: "https://plus.unsplash.com/premium_photo-1679913792906-13ccc5c84d44?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D",
      isFavorite: false,
    },
    {
      id: 8,
      name: "Brightening Serum",
      category: "Serums",
      price: 65,
      rating: 4.9,
      reviews: 186,
      image: "https://plus.unsplash.com/premium_photo-1679913792906-13ccc5c84d44?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D",
      isFavorite: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            All Products
          </h1>
          <p className="text-gray-600">{products.length} Results</p>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="default" size="sm" className="bg-black text-white">
            1
          </Button>
          <Button variant="outline" size="sm">
            2
          </Button>
          <Button variant="outline" size="sm">
            3
          </Button>
          <span className="text-gray-500">...</span>
          <Button variant="outline" size="sm">
            10
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
