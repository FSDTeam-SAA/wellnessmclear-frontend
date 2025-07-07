import { Button } from "@/components/ui/button";
import { SingleProductResponse } from "@/types/singelProductDataType";
import { Heart, Share2, Star } from "lucide-react";
import Image from "next/image";
import React from "react";

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
            <p className="text-sm text-gray-500 uppercase tracking-wide mb-2">
              {product.category}
            </p>
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
                    className={`w-4 h-4 ${
                      i < Math.floor(rating)
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
            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>
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
            <Button className="flex-1 bg-black text-white hover:bg-gray-800">
              Add to Cart
            </Button>
            <Button variant="outline" size="icon">
              <Heart className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
