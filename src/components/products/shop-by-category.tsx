import Image from "next/image"
import Link from "next/link"
import shopbycategory1 from '../../public/images/shopbycategory1.jpg';
import shopbycategory2 from '../../public/images/shopbycategory2.jpg';
import shopbycategory3 from '../../public/images/shopbycategory3.jpg';
import shopbycategory4 from '../../public/images/shopbycategory4.jpg';

export default function ShopByCategory() {
  const categories = [
    {
      id: 1,
      title: "Daily Essentials",
      description: "Curated for foundational wellness and everyday vitality",
      image: shopbycategory1,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      title: "Gut & Detox Support",
      description: "Balance your microbiome and cleanse your system naturally",
      image: shopbycategory2,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      title: "Energy & Focus",
      description: "Boost vitality, stamina, and mental clarity",
      image: shopbycategory3,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 4,
      title: "Self-Care Rituals",
      description: "Restore your body, soul, and mind with intentional practices",
      image: shopbycategory4,
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  return (
    <section className="w-full py-8 px-4 bg-gray-50">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">Shop by Category</h2>
          <Link href="/categories" className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1">
            View all products
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link key={category.id} href={`/category/${category.id}`} className="group">
              <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="relative aspect-square">
                  <Image
                    src={category.image || "/placeholder.svg"}
                    alt={category.title}
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
                    {category.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{category.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
