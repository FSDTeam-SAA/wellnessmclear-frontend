import Link from "next/link";
import ProductCard from "./product-card";

export default function NewArrivals() {
  const products = [
    {
      id: 1,
      name: "Brightening Serum",
      category: "Serums",
      price: 65,
      rating: 4.8,
      reviews: 161,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D",
      isFavorite: false,
    },
    {
      id: 2,
      name: "Brightening Serum",
      category: "Serums",
      price: 65,
      rating: 4.9,
      reviews: 186,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D",
      isFavorite: false,
    },
    {
      id: 3,
      name: "Brightening Serum",
      category: "Serums",
      price: 65,
      rating: 4.9,
      reviews: 186,
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D",
      isFavorite: true,
    },
    {
      id: 4,
      name: "Brightening Serum",
      category: "Serums",
      price: 65,
      rating: 4.9,
      reviews: 186,
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D",
      isFavorite: false,
    },
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
              key={product.id}
              product={product}
              showAddToCart={true}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
