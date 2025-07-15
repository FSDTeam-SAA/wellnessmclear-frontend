"use client";

import ProductReviews from "@/components/ProductReviews";
import ProductDetails from "./_components/productDetails";
import RelatedProduct from "./_components/relatedProduct";
import { useQuery } from "@tanstack/react-query";
import { SingleProductResponse } from "@/types/singelProductDataType";
import MostPopular from "@/components/products/most-popular";

export default function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { data, isLoading, isError, error } = useQuery<SingleProductResponse>({
    queryKey: ["SingelProducts", params.id],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/product/${params.id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!res.ok) {
        throw new Error("Failed to fetch product");
      }
      return res.json();
    },
  });

  const relatedProducts = data?.data.relatedProducts || [];
  const product = data?.data.product;
  const reviews = data?.data.reviews || [];

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
      : 0;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white px-4 py-8 container mx-auto">
        {/* Skeleton Product Details */}
        <div className="animate-pulse space-y-4 max-w-4xl mx-auto">
          <div className="h-80 bg-gray-200 rounded-md"></div>
          <div className="h-6 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
        </div>

        {/* Skeleton Related Products */}
        <div className="mt-16">
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-6 animate-pulse"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-60 bg-gray-200 rounded-md animate-pulse"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (isError || !data || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-8 container mx-auto">
        <p className="text-red-600 text-lg font-semibold">
          {(error as Error)?.message || "Failed to load product data."}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className=" py-8">
        <div className="lg:container mx-auto">
          {/* Product Detail Section */}
          <ProductDetails
            product={product}
            rating={averageRating}
            totalReviews={reviews.length}
          />

          {/* Related Products */}
          <RelatedProduct relatedProducts={relatedProducts} />
        </div>

        {/* Product Reviews */}
        <div className="bg-[#E4ECE2] py-10">
          <ProductReviews  coachAndDcotorType="productId" url="get-all-reviews" productId={product._id?.toString()} />
        </div>

        {/* Most Popular Section */}
        <div className=" mx-auto mt-10">
          {/* <div className=" flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">
              Most Popular
            </h2>
            <Link
              href="/product"
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
          </div> */}
          {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div> */}
          <MostPopular />
        </div>
      </div>
    </div>
  );
}
