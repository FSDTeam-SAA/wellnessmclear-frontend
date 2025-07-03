import ProductCard from "@/components/cards/product-card";
import Link from "next/link";
import React from "react";

const RelatedProduct = () => {
  const relatedProducts = [
    {
      _id: "68650a2086c6de9f177b33c4",
      name: "Wireless Headphones",
      description: "High-quality wireless headphones with noise cancellation.",
      actualPrice: 150,
      discountedPrice: 120,
      savedPrice: 30,
      image:
        "https://images.unsplash.com/photo-1516707570264-019b25b2a68a?auto=format&fit=crop&w=400&q=60",
      category: "electronics",
      subCategory: "audio",
      brand: "Bose",
      countInStock: 25,
      createdAt: "2025-07-02T10:29:52.375Z",
      updatedAt: "2025-07-02T10:29:52.375Z",
      __v: 0,
      avgRating: 4.5,
      totalReviews: 120,
    },
    {
      _id: "68650a2086c6de9f177b33c5",
      name: "Smart Watch",
      description: "Latest model smart watch with health tracking features.",
      actualPrice: 200,
      discountedPrice: 180,
      savedPrice: 20,
      image:
        "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=400&q=60",
      category: "electronics",
      subCategory: "wearables",
      brand: "Apple",
      countInStock: 15,
      createdAt: "2025-07-02T11:00:00.000Z",
      updatedAt: "2025-07-02T11:00:00.000Z",
      __v: 0,
      avgRating: 4.7,
      totalReviews: 95,
    },
    {
      _id: "68650a2086c6de9f177b33c6",
      name: "Gaming Mouse",
      description: "Ergonomic wireless gaming mouse with customizable buttons.",
      actualPrice: 70,
      discountedPrice: 55,
      savedPrice: 15,
      image:
        "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=400&q=60",
      category: "electronics",
      subCategory: "computer-accessories",
      brand: "Logitech",
      countInStock: 30,
      createdAt: "2025-07-02T12:00:00.000Z",
      updatedAt: "2025-07-02T12:00:00.000Z",
      __v: 0,
      avgRating: 4.3,
      totalReviews: 75,
    },
    {
      _id: "68650a2086c6de9f177b33c7",
      name: "4K Monitor",
      description: "Ultra HD 4K monitor with vivid colors and sharp display.",
      actualPrice: 400,
      discountedPrice: 350,
      savedPrice: 50,
      image:
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=60",
      category: "electronics",
      subCategory: "monitors",
      brand: "Samsung",
      countInStock: 12,
      createdAt: "2025-07-02T13:00:00.000Z",
      updatedAt: "2025-07-02T13:00:00.000Z",
      __v: 0,
      avgRating: 4.6,
      totalReviews: 50,
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
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RelatedProduct;
