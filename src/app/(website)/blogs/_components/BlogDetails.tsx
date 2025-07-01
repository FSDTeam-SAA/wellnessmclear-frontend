// components/BlogDetails.js
import Image from 'next/image';
import Link from 'next/link';

const BlogDetails = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Image */}
      <div className="relative w-full h-96 mb-6">
        <Image
          src="/path/to/header-image.jpg" // Replace with actual image path
          alt="Blog Header"
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>

      {/* Title and Date */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit
        </h1>
        <p className="text-gray-500 text-sm">June 30, 2025, 05:10 PM +06</p>
      </div>

      {/* Table of Contents */}
      <div className="mb-6 bg-white shadow-md rounded-lg p-4">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Table of Contents</h2>
        <ul className="list-disc list-inside text-gray-600 space-y-2">
          <li><a href="#section1" className="hover:text-gray-800">Wellness is a holistic approach to health that enhances the mind</a></li>
          <li><a href="#section2" className="hover:text-gray-800">Wellness is a holistic approach to health that enhances the body</a></li>
        </ul>
      </div>

      {/* Content Sections */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <section id="section1" className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Wellness is a holistic approach to health that enhances the mind</h2>
          <p className="text-gray-600 text-base mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          </p>
          <p className="text-gray-600 text-base mb-4">
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis.
          </p>
        </section>

        <section id="section2" className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Wellness is a holistic approach to health that enhances the body</h2>
          <p className="text-gray-600 text-base mb-4">
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.
          </p>
          <p className="text-gray-600 text-base mb-4">
            Sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?
          </p>
        </section>
      </div>

      {/* Back Link */}
      <div className="mt-6">
        <Link href="/blogs" className="text-gray-600 hover:text-gray-800 text-sm">
          ← Back to Blogs
        </Link>
      </div>
    </div>
  );
};

export default BlogDetails;