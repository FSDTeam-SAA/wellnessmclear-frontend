import Link from "next/link";
import ProductCard from "../cards/product-card";

export default function MostPopular() {
  const products = [
    {
      _id: "1",
      name: "Wireless Headphones",
      description: "Experience high-quality sound with long battery life.",
      actualPrice: 120,
      discountedPrice: 99,
      savedPrice: 21,
      image:
        "https://images.unsplash.com/photo-1580894908360-95d00fdfd7ec?w=500&auto=format&fit=crop&q=80",
      category: "electronics",
      subCategory: "Audio",
      brand: "SoundPro",
      countInStock: 25,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      __v: 0,
      avgRating: 4.8,
      totalReviews: 154,
    },
    {
      _id: "2",
      name: "Gaming Controller",
      description: "Precision controls with ergonomic design for pro gamers.",
      actualPrice: 80,
      discountedPrice: 60,
      savedPrice: 20,
      image:
        "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?w=500&auto=format&fit=crop&q=80",
      category: "electronics",
      subCategory: "Gaming",
      brand: "GameX",
      countInStock: 15,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      __v: 0,
      avgRating: 2.9,
      totalReviews: 212,
    },
    {
      _id: "3",
      name: "Smartwatch",
      description: "Track health, receive notifications, and stay connected.",
      actualPrice: 220,
      discountedPrice: 199,
      savedPrice: 21,
      image:
        "https://images.unsplash.com/photo-1611516439736-75b5f1a38f72?w=500&auto=format&fit=crop&q=80",
      category: "electronics",
      subCategory: "Wearables",
      brand: "WristTech",
      countInStock: 30,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      __v: 0,
      avgRating: 4.7,
      totalReviews: 98,
    },
    {
      _id: "4",
      name: "Mechanical Keyboard",
      description: "Tactile feedback with RGB lighting for gamers & coders.",
      actualPrice: 120,
      discountedPrice: 99,
      savedPrice: 21,
      image:
        "https://images.unsplash.com/photo-1555617117-08fda9f2994a?w=500&auto=format&fit=crop&q=80",
      category: "electronics",
      subCategory: "Accessories",
      brand: "KeyGlow",
      countInStock: 20,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      __v: 0,
      avgRating: 5.0,
      totalReviews: 134,
    },
  ];

  return (
    <section className="w-full py-8 px-4 bg-[#F8FAF9]">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">Most Popular</h2>
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
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              showAddToCart={true}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
