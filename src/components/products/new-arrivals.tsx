import Link from "next/link";
import ProductCard from "../cards/product-card";

export default function NewArrivals() {
  const products = [
    // {
    //   _id: "1",
    //   name: "Wireless Headphones",
    //   description: "High-quality wireless headphones with noise cancellation.",
    //   actualPrice: 120,
    //   discountedPrice: 99,
    //   savedPrice: 21,
    //   image:
    //     "https://images.unsplash.com/photo-1611186871348-b1ce696e52a6?w=800&auto=format&fit=crop&q=80",
    //   category: "electronics",
    //   subCategory: "Headphones",
    //   brand: "Sony",
    //   countInStock: 15,
    //   createdAt: new Date().toISOString(),
    //   updatedAt: new Date().toISOString(),
    //   __v: 0,
    //   avgRating: 4.5,
    //   totalReviews: 87,
    // },
    {
      _id: "2",
      name: "Smartphone",
      description: "Latest-gen smartphone with cutting-edge features.",
      actualPrice: 899,
      discountedPrice: 799,
      savedPrice: 100,
      image:
        "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800&auto=format&fit=crop&q=80",
      category: "electronics",
      subCategory: "Mobile",
      brand: "Samsung",
      countInStock: 20,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      __v: 0,
      avgRating: 4.7,
      totalReviews: 142,
    },
    // {
    //   _id: "3",
    //   name: "Gaming Controller",
    //   description: "Ergonomic controller for smooth gaming experience.",
    //   actualPrice: 80,
    //   discountedPrice: 59,
    //   savedPrice: 21,
    //   image:
    //     "https://images.unsplash.com/photo-1555617117-08fda9f2994a?w=800&auto=format&fit=crop&q=80",

    //   category: "electronics",
    //   subCategory: "Gaming",
    //   brand: "Xbox",
    //   countInStock: 10,
    //   createdAt: new Date().toISOString(),
    //   updatedAt: new Date().toISOString(),
    //   __v: 0,
    //   avgRating: 4.6,
    //   totalReviews: 98,
    // },
    {
      _id: "4",
      name: "Smartwatch",
      description: "Track your fitness and stay connected on the go.",
      actualPrice: 250,
      discountedPrice: 219,
      savedPrice: 31,
      image:
        "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?w=800&auto=format&fit=crop&q=80",
      category: "electronics",
      subCategory: "Wearables",
      brand: "Apple",
      countInStock: 8,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      __v: 0,
      avgRating: 4.8,
      totalReviews: 120,
    },
    // {
    //   _id: "5",
    //   name: "Laptop",
    //   description: "Powerful laptop with sleek design for professionals.",
    //   actualPrice: 1300,
    //   discountedPrice: 1199,
    //   savedPrice: 101,
    //   image:
    //     "https://images.unsplash.com/photo-1587202372775-98973d86e2ba?w=800&auto=format&fit=crop&q=80",

    //   category: "electronics",
    //   subCategory: "Computers",
    //   brand: "Dell",
    //   countInStock: 12,
    //   createdAt: new Date().toISOString(),
    //   updatedAt: new Date().toISOString(),
    //   __v: 0,
    //   avgRating: 4.3,
    //   totalReviews: 76,
    // },
    // {
    //   _id: "6",
    //   name: "Digital Camera",
    //   description: "Capture life's best moments in ultra-high resolution.",
    //   actualPrice: 950,
    //   discountedPrice: 799,
    //   savedPrice: 151,
    //   image:
    //     "https://images.unsplash.com/photo-1580894908360-95d00fdfd7ec?w=800&auto=format&fit=crop&q=80",
    //   category: "electronics",
    //   subCategory: "Cameras",
    //   brand: "Canon",
    //   countInStock: 5,
    //   createdAt: new Date().toISOString(),
    //   updatedAt: new Date().toISOString(),
    //   __v: 0,
    //   avgRating: 4.2,
    //   totalReviews: 55,
    // },
    {
      _id: "7",
      name: "Wireless Earbuds",
      description: "Crystal-clear sound and long battery life.",
      actualPrice: 150,
      discountedPrice: 129,
      savedPrice: 21,
      image:
        "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&auto=format&fit=crop&q=80",
      category: "electronics",
      subCategory: "Audio",
      brand: "Bose",
      countInStock: 18,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      __v: 0,
      avgRating: 4.6,
      totalReviews: 105,
    },
    {
      _id: "8",
      name: "Mechanical Keyboard",
      description: "Responsive keys and RGB lighting for gamers.",
      actualPrice: 120,
      discountedPrice: 99,
      savedPrice: 21,
      image:
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80",
      category: "electronics",
      subCategory: "Accessories",
      brand: "Logitech",
      countInStock: 22,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      __v: 0,
      avgRating: 4.4,
      totalReviews: 62,
    },
    // {
    //   _id: "9",
    //   name: "Tablet",
    //   description: "Lightweight tablet with high-resolution display.",
    //   actualPrice: 600,
    //   discountedPrice: 549,
    //   savedPrice: 51,
    //   image:
    //     "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?w=800&auto=format&fit=crop&q=80",
    //   category: "electronics",
    //   subCategory: "Tablets",
    //   brand: "Samsung",
    //   countInStock: 9,
    //   createdAt: new Date().toISOString(),
    //   updatedAt: new Date().toISOString(),
    //   __v: 0,
    //   avgRating: 4.1,
    //   totalReviews: 38,
    // },
    // {
    //   _id: "10",
    //   name: "Portable Speaker",
    //   description: "Compact speaker with powerful bass and Bluetooth.",
    //   actualPrice: 95,
    //   discountedPrice: 79,
    //   savedPrice: 16,
    //   image:
    //     "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=80",
    //   category: "electronics",
    //   subCategory: "Audio",
    //   brand: "JBL",
    //   countInStock: 30,
    //   createdAt: new Date().toISOString(),
    //   updatedAt: new Date().toISOString(),
    //   __v: 0,
    //   avgRating: 4.7,
    //   totalReviews: 112,
    // },
  ];

  return (
    <section
      className="w-full py-8 px-4"
      style={{ backgroundColor: "#f3e8ff" }}
    >
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">New Arrivals</h2>
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
