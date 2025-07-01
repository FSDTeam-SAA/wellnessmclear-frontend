import React from "react";
import Image from "next/image";
import Link from "next/link";
import cardImage from "@/public/images/blog-image.jpg";

type BlogCardProps = {
  id: string | number;
  image: string;
  date: string;
  title: string;
};

function BlogCard({ id, date, title }: BlogCardProps) {
  return (
    <div className="max-w-sm w-full bg-white rounded overflow-hidden flex flex-col">
      <Image
        src={cardImage}
        width={400}
        height={275}
        alt={title}
        className="w-full h-[275px] object-cover"
      />
      <div className="flex flex-col flex-1 justify-between mt-6">
        <div>
          <p className="text-[#BACDDD] text-base font-medium">{date}</p>
          <p className="text-[#000000] text-[20px] font-semibold mt-2 mb-4 line-clamp-2">
            {title}
          </p>
        </div>
        <Link href={`/blog/${id}`}>
          <button className="bg-transparent border border-[#A8C2A3] text-[#A8C2A3] text-sm px-4 py-2 rounded hover:bg-green-500 hover:text-white transition duration-300">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
}

export default BlogCard;
