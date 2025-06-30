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

function BlogCard({ id,  date, title }: BlogCardProps) {
  return (
    <div className="overflow-hidden max-w-sm w-full">
      <Image
        src={cardImage}
        width={400}
        height={300}
        alt={title}
        className="w-full h-[275px] object-cover"
      />
      <div className="">
        <p className="text-gray-500 text-sm mt-[24px]">{date}</p>
        <p className="text-[#000000] text-[20px] font-semibold mb-4 mt-2">{title}</p>
        <Link href={`/blog/${id}`}>
          <button className="bg-transparent border border-green-500 text-green-500 text-sm px-4 py-2 rounded hover:bg-green-500 hover:text-white transition duration-300">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
}

export default BlogCard;
