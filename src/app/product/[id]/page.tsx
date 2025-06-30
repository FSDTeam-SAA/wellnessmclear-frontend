import Link from "next/link";
import ProductCard from "@/components/products/product-card";
import ProductReviews from "@/components/ProductReviews";
import ProductDetails from "./_components/productDetails";
import RelatedProduct from "./_components/relatedProduct";
// import ProductCard from "@/components/product-card"

export default function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  console.log(params);
  const product = {
    id: 1,
    name: "Brightening Serum",
    category: "Serums",
    price: 65,
    rating: 4.8,
    reviews: 161,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D",
    isFavorite: false,
    description:
      "Our best-selling brightening serum helps even skin tone and reduce dark spots with powerful vitamin C and niacinamide.",
    details: [
      "Vitamin C brightens and evens skin tone",
      "Niacinamide reduces pore appearance",
      "Hyaluronic acid provides deep hydration",
      "Suitable for all skin types",
    ],
    ingredients: "Water, Vitamin C, Niacinamide, Hyaluronic Acid, Glycerin",
  };

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

  // const reviews = [
  //   {
  //     id: 1,
  //     rating: 5,
  //     author: "Sarah M.",
  //     date: "2 weeks ago",
  //     comment:
  //       "Amazing product! My skin looks brighter and more even after just 2 weeks of use.",
  //   },
  //   {
  //     id: 2,
  //     rating: 5,
  //     author: "Jessica L.",
  //     date: "1 month ago",
  //     comment:
  //       "Love this serum! It's gentle yet effective. No irritation and great results.",
  //   },
  //   {
  //     id: 3,
  //     rating: 4,
  //     author: "Maria K.",
  //     date: "3 weeks ago",
  //     comment: "Good product, seeing gradual improvement in my dark spots.",
  //   },
  // ];

  return (
    <div className="min-h-screen bg-white">
      <div className="px-4 py-8">
        <div className="container mx-auto">
          {/* Product Detail Section */}
          <ProductDetails product={product} />

          {/* Related Products */}
          <RelatedProduct />
        </div>

        {/* Reviews Section */}
        {/* <div className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Ratings and Reviews
          </h2>
          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="border-b border-gray-200 pb-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-gray-600">
                      {review.author.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        {review.author}
                      </span>
                      <span className="text-sm text-gray-500">
                        {review.date}
                      </span>
                    </div>
                    <p className="text-gray-600">{review.comment}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div> */}

        {/* ProductReviews */}
        <div className="bg-[#E4ECE2] py-10">
          <ProductReviews productId={product.id.toString()} />
        </div>

        {/* Most Popular Section */}
        <div className="container mx-auto mt-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">
              Most Popular
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
    </div>
  );
}
