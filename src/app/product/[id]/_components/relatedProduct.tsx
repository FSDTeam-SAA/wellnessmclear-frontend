import ProductCard from "@/components/products/product-card";
import Link from "next/link";
import React from "react";

const RelatedProduct = () => {
  const relatedProducts = [
    {
      id: 2,
      name: "Brightening Serum",
      category: "Serums",
      price: 65,
      rating: 4.9,
      reviews: 186,
      image: "/placeholder.svg?height=200&width=200",
      isFavorite: false,
    },
    {
      id: 3,
      name: "Brightening Serum",
      category: "Serums",
      price: 65,
      rating: 4.9,
      reviews: 186,
      image: "/placeholder.svg?height=200&width=200",
      isFavorite: false,
    },
    {
      id: 4,
      name: "Brightening Serum",
      category: "Serums",
      price: 65,
      rating: 4.9,
      reviews: 186,
      image: "/placeholder.svg?height=200&width=200",
      isFavorite: false,
    },
    {
      id: 5,
      name: "Brightening Serum",
      category: "Serums",
      price: 65,
      rating: 4.9,
      reviews: 186,
      image: "/placeholder.svg?height=200&width=200",
      isFavorite: false,
    },
  ];

  return (
    <div>
      <div className="mb-16 ">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">
            Related Products
          </h2>
          <Link
            href="/products"
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RelatedProduct;
