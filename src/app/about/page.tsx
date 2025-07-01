import Image from "next/image";
import aboutImage from "../../public/images/about.jpg";
import aboutImage1 from "../../public/images/about1.jpg";
import ShopByCategory from "@/components/products/shop-by-category";

export default function AboutUs() {
  return (
    <section className="w-full">
      {/* Top Section */}
      <div className="bg-[#f1d6f4]">
        <div className="flex flex-col lg:flex-row w-full container mx-auto">
          <div className="w-full lg:w-1/2 p-8 md:pr-20 flex items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-gray-900">About Us</h2>
              <p className="mb-4 text-gray-800">
                <strong>Wellness Made Clear</strong> is your all-in-one wellness hub—designed to help you take control of your health with clarity and confidence.
              </p>
              <p className="text-gray-800">
                We provide a supportive <strong>community space</strong> where you can grow, learn, and connect with others on a similar journey. Whether you’re just getting started or ready to level up, we’re here to guide you every step of the way.
              </p>
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <Image
              src={aboutImage}
              alt="Wellness Woman Sitting"
              width={800}
              height={800}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bg-white">
        <div className="flex flex-col-reverse lg:flex-row w-full max-w-7xl mx-auto">
          <div className="w-full lg:w-1/2">
            <Image
              src={aboutImage1}
              alt="Woman Skincare"
              width={800}
              height={800}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-full lg:w-1/2 p-8 md:p-16 flex items-center bg-white">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">What You’ll Find Here:</h3>
              <ul className="space-y-6 text-gray-800">
                <li>
                  <strong>Find Your Coach</strong><br />
                  <span className="text-sm">
                    Discover a personalized wellness coach who creates clear, customized plans tailored to your goals and lifestyle.
                  </span>
                </li>
                <li>
                  <strong>Clean Nutrition & Fitness Guides</strong><br />
                  <span className="text-sm">
                    Access science-backed, practical resources that make healthy living simple and sustainable.
                  </span>
                </li>
                <li>
                  <strong>Curated Marketplace</strong><br />
                  <span className="text-sm">
                    Explore trusted wellness products—from nutrient-rich superfoods to self-care essentials—handpicked to support your transformation.
                  </span>
                </li>
              </ul>
              <p className="mt-6 text-gray-800">
                Join us and experience wellness—made clear, made for you.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* shop by category */}
      <ShopByCategory />
    </section>
  );
}
