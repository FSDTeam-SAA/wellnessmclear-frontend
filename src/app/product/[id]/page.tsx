import Image from "next/image"
import Link from "next/link"
import { Star, Heart, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import ProductCard from "@/components/products/product-card"
// import ProductCard from "@/components/product-card"

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  console.log(params)
  // Mock product data - in real app, fetch based on params.id
  const product = {
    id: 1,
    name: "Brightening Serum",
    category: "Serums",
    price: 65,
    rating: 4.8,
    reviews: 161,
    image: "/placeholder.svg?height=400&width=400",
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
  }

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
  ]

  const reviews = [
    {
      id: 1,
      rating: 5,
      author: "Sarah M.",
      date: "2 weeks ago",
      comment: "Amazing product! My skin looks brighter and more even after just 2 weeks of use.",
    },
    {
      id: 2,
      rating: 5,
      author: "Jessica L.",
      date: "1 month ago",
      comment: "Love this serum! It's gentle yet effective. No irritation and great results.",
    },
    {
      id: 3,
      rating: 4,
      author: "Maria K.",
      date: "3 weeks ago",
      comment: "Good product, seeing gradual improvement in my dark spots.",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Product Detail Section */}
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
              <p className="text-sm text-gray-500 uppercase tracking-wide mb-2">{product.category}</p>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
              <p className="text-3xl font-bold text-gray-900">${product.price}</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
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
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
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
              <Button className="flex-1 bg-black text-white hover:bg-gray-800">Add to Cart</Button>
              <Button variant="outline" size="icon">
                <Heart className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">Related Products</h2>
            <Link href="/products" className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1">
              View all products
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Ratings and Reviews</h2>
          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="border-b border-gray-200 pb-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-gray-600">{review.author.charAt(0)}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm font-medium text-gray-900">{review.author}</span>
                      <span className="text-sm text-gray-500">{review.date}</span>
                    </div>
                    <p className="text-gray-600">{review.comment}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Most Popular Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">Most Popular</h2>
            <Link href="/products" className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1">
              View all products
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
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
  )
}
