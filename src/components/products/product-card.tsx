"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Star } from "lucide-react";
import { Button } from "../ui/button";
// import { Button } from "@/components/ui/button";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  isFavorite: boolean;
}

interface ProductCardProps {
  product: Product;
  showAddToCart?: boolean;
}

export default function ProductCard({
  product,
  showAddToCart = false,
}: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100">
      <Link href={`/product/${product.id}`}>
        <div className="relative aspect-square p-4 group">
          <button
            className="absolute top-2 right-2 z-10 p-2"
            onClick={(e) => {
              e.preventDefault();
              // Handle favorite toggle
            }}
          >
            <Heart
              className={`w-5 h-5 ${
                product.isFavorite
                  ? "fill-red-500 text-red-500"
                  : "text-gray-400"
              }`}
            />
          </button>
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover rounded-md"
          />
          {showAddToCart && (
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 rounded-md flex items-center justify-center">
              <Button
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white text-gray-900 hover:bg-gray-100"
                size="sm"
                onClick={(e) => {
                  e.preventDefault();
                  // Handle add to cart
                }}
              >
                Add to Cart
              </Button>
            </div>
          )}
        </div>
      </Link>

      <div className="p-4 pt-2">
        <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
          {product.category}
        </p>
        <Link href={`/product/${product.id}`}>
          <h3 className="font-medium text-gray-900 mb-2 hover:text-gray-700">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${
                  i < Math.floor(product.rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-600">
            {product.rating} ({product.reviews})
          </span>
        </div>
        <p className="text-lg font-semibold text-gray-900">${product.price}</p>
      </div>
    </div>
  );
}
