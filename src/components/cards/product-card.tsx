"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { addToCart } from "@/lib/cart-utils";
import { toggleWishlist, getWishlistItems } from "@/lib/wishlist-utils";

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
  const [isAdding, setIsAdding] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {

    const wishlist = getWishlistItems();
    const found = wishlist.some(
      (item) => String(item.id) === String(product.id)
    );
    setIsInWishlist(found);
  }, [product.id]);

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart({ ...product, id: String(product.id) });
    window.dispatchEvent(new Event("cartUpdated"));

    setTimeout(() => {
      setIsAdding(false);
    }, 500);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    const newWishlistStatus = toggleWishlist({
      ...product,
      id: String(product.id),
    });
    setIsInWishlist(newWishlistStatus);
    window.dispatchEvent(new Event("wishlistUpdated"));
  };

  return (
    <div className=" rounded-lg overflow-hidden  hover:shadow-md transition-shadow">
      <Link href={`/product/${product.id}`}>
        <div className="relative aspect-square p-4 group">
          <button
            className="absolute top-2 right-2 z-10 p-2"
            onClick={handleToggleWishlist}
          >
            <Heart
              className={`w-5 h-5 transition-all ${
                isInWishlist ? "fill-red-500 text-red-500" : "text-gray-400"
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
                className="opacity-0 bg-[#A8C2A3] text-white text-[18px] group-hover:opacity-100 transition-opacity duration-300"
                size="sm"
                disabled={isAdding}
                onClick={(e) => {
                  e.preventDefault();
                  handleAddToCart();
                }}
              >
                {isAdding ? "Adding..." : "Add to Cart"}
              </Button>
            </div>
          )}
        </div>
      </Link>

      <div className="p-2 pt-2 mt-[20px]">
        <p className="text-xs text-[#000000] text-[16px] uppercase tracking-wide mb-1">
          {product.category}
        </p>
        <Link href={`/product/${product.id}`}>
          <h3 className="font-medium text-[#000000]  text-[20px] mb-2 hover:text-gray-700">
            {product.name}
          </h3>
        </Link>

        <p className="text-lg text-[#131313] mt-[32px] text-[40px] font-semibold text-gray-900">
          ${product.price}
        </p>
        <div className="flex items-center gap-2 mb-2 mt-[8px]">
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
      </div>
    </div>
  );
}
