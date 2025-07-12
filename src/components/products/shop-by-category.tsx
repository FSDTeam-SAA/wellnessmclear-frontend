"use client"
import Image from "next/image"
import { useQuery } from "@tanstack/react-query";
import { CategoriesResponse } from "@/types/category";

export default function ShopByCategory() {
 
   const { data } = useQuery<CategoriesResponse>({
    queryKey: ["shop-by-category"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/category`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!res.ok) {
        throw new Error("Failed to fetch products");
      }
      return res.json();
    },
  });



  return (
    <section className="w-full py-8 px-4 bg-gray-50">
      <div className="lg:container mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">Shop by Category</h2>
          {/* <Link href="/categories" className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1">
            View all products
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link> */}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {data?.data.map((category) => (
            <div key={category._id}  className="group">
              <div className=" rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative aspect-square">
                  <Image
                    src={category.categoryImage || "/placeholder.svg"}
                    alt={category.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute bottom-4 left-4">
                    {/* <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center">
                      <Image
                        src={category.avatar || "/placeholder.svg"}
                        alt=""
                        width={24}
                        height={24}
                        className="rounded-full"
                      />
                    </div> */}
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                    {category.name}
                  </h3>
                  {/* <p className="text-sm text-gray-600 leading-relaxed">{category.description}</p> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
