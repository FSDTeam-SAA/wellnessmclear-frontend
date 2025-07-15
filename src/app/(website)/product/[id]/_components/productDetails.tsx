"use client"
import { Button } from "@/components/ui/button";
import { addToCart } from "@/lib/cart-utils";
import { getWishlistItems, toggleWishlist } from "@/lib/wishlist-utils";
import { SingleProductResponse } from "@/types/singelProductDataType";
import { Heart, Star } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface ProductDetailsProps {
  product: SingleProductResponse["data"]["product"];
  rating?: number;
  totalReviews?: number;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({
  product,
  rating = 0,
  totalReviews = 0,
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);


  useEffect(() => {
    const wishlist = getWishlistItems();
    const found = wishlist.some((item) => String(item._id) === product._id);
    console.log(found)
    setIsInWishlist(found);
  }, [product._id]);


  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart({ ...product, _id: product._id });
    window.dispatchEvent(new Event("cartUpdated"));

    setTimeout(() => {
      setIsAdding(false);
    }, 500);
  };

  const handleToggleWishlist = () => {
    // e.preventDefault();
    const newWishlistStatus = toggleWishlist({ ...product, _id: product._id });
    setIsInWishlist(newWishlistStatus);
    window.dispatchEvent(new Event("wishlistUpdated"));
  };



  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Product Image */}
        <div className="relative aspect-square">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover rounded-lg"
          />
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            {/* <p className="text-sm text-gray-500 uppercase tracking-wide mb-2">
              {product.category}
            </p> */}
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {product.name}
            </h1>
            <p className="text-3xl font-bold text-gray-900">
              ${product.discountedPrice}
            </p>
          </div>

          {/* Ratings */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < Math.floor(rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                      }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                {rating.toFixed(1)} ({totalReviews} reviews)
              </span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
            <div
              className="text-gray-600 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
          </div>

          {/* Extra Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
            <div>
              <strong>Actual Price:</strong> ${product.actualPrice}
            </div>
            <div>
              <strong>Saved:</strong> ${product.savedPrice}
            </div>
            <div>
              <strong>Brand:</strong> {product.brand || "N/A"}
            </div>
            <div>
              <strong>Subcategory:</strong> {product.subCategory || "N/A"}
            </div>
            <div>
              <strong>Stock:</strong>{" "}
              {product.countInStock > 0
                ? `${product.countInStock} available`
                : "Out of stock"}
            </div>
            <div>
              <strong>Created:</strong>{" "}
              {new Date(product.createdAt).toLocaleDateString()}
            </div>
            <div>
              <strong>Updated:</strong>{" "}
              {new Date(product.updatedAt).toLocaleDateString()}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <Button
              className="bg-[#A8C2A3] text-[#F8FAF9]"
              size="lg"
              disabled={isAdding}
              onClick={(e) => {
                e.preventDefault();
                handleAddToCart();
              }}
            >
              {isAdding ? "Adding..." : "Add to Cart"}
            </Button>
            <button
              className=""
              onClick={(e) => {
                e.preventDefault()
                handleToggleWishlist()
              }}
            >
              <Heart
                className={`${isInWishlist ? "fill-red-500 text-red-500" : "text-gray-400"
                  }`}
              />
            </button>
            {/* <Button variant="outline" size="icon">
              <Share2 className="w-4 h-4" />
            </Button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
