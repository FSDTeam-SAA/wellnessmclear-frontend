"use client";

import { useEffect, useState } from "react";
import Pagination from "@/components/pagination";
// import WishlistProductCard from "@/components/wishlist-product-card";
// import type { Product } from "@/lib/types";
import { getWishlistItems } from "@/lib/wishlist-utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import WishlistProductCard from "./wishlist-product-card";
import { Product } from "@/types/productDataType";

const ITEMS_PER_PAGE = 8;

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const items = getWishlistItems();
    setWishlistItems(items);
  }, []);

  const handleRemoveItem = () => {
    const updatedItems = getWishlistItems();
    setWishlistItems(updatedItems);
  };

  const totalPages = Math.ceil(wishlistItems.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentItems = wishlistItems.slice(startIndex, endIndex);

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <main className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Your Wishlist is Empty</h1>
            <p className="text-gray-600 mb-8">
              Save your favorite products to your wishlist!
            </p>
            <Link href="/">
              <Button className="bg-[#A8C2A3] text-white"> 
                Continue Shopping
              </Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Wish List</h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {currentItems.map((product) => (
            <WishlistProductCard
              key={product._id}
              product={product}
              onRemove={handleRemoveItem}
            />
          ))}
        </div>

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </main>
    </div>
  );
}
