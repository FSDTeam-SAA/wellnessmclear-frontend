import { Button } from "@/components/ui/button";
import { Heart, Share2, Star } from "lucide-react";
import Image from "next/image";
import React from "react";

interface Product {
  image?: string;
  name: string;
  category: string;
  price: number;
  rating: number;
  reviews: number;
  description: string;
  details: string[];
}

interface ProductDetailsProps {
  product: Product;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
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
            <p className="text-3xl font-bold text-gray-900">${product.price}</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Key Benefits</h3>
            <ul className="space-y-1">
              {product.details.map((detail, index) => (
                <li key={index} className="text-gray-600 flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  {detail}
                </li>
              ))}
            </ul>
          </div>

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
