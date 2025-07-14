import React from "react";
import Image from "next/image";
import Link from "next/link";
import cardImage from "@/public/images/blog-image.jpg";

type BlogCardProps = {
  slug: string;
  image: string;
  date: string;
  title: string;
};

function BlogCard({ slug, image, date, title }: BlogCardProps) {
  // Format date to be more readable
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="max-w-sm w-full rounded overflow-hidden flex flex-col duration-300">
      <div className="relative w-full h-[275px]">
        <Image
          src={image || cardImage} // Use API image or fallback
          fill
          alt={title}
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
      </div>
      <div className="flex flex-col flex-1 justify-between mt-6 p-4">
        <div>
          <p className="text-[#BACDDD] text-base font-medium">
            {formatDate(date)}
          </p>
          <p className="text-[#000000] text-[20px] font-semibold mt-2 mb-4 line-clamp-2">
            {title}
          </p>
        </div>
        <Link href={`/blogs/${slug}`}>
          <button className="bg-transparent border border-[#A8C2A3] text-[#A8C2A3] text-sm px-4 py-2 rounded hover:bg-[#A8C2A3] hover:text-white transition duration-300 w-full">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
}

export default BlogCard;
