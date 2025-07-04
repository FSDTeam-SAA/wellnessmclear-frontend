"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

const BlogDetails = () => {
  const params = useParams();
  const blogSlug = params.slug as string;

  const {
    data: blogData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["blog", blogSlug],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/blog/${blogSlug}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch blog");
      }
      return response.json();
    },
    enabled: !!blogSlug,
  });

  const blog = blogData?.data?.[0];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-pulse">
            <div className="h-96 bg-gray-200 rounded-lg mb-6"></div>
            <div className="h-8 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 bg-gray-200 rounded mb-6"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-red-600 text-lg mb-4">
            {error?.message || "Blog not found"}
          </p>
          <Link
            href="/blogs"
            className="text-gray-600 hover:text-gray-800 text-sm"
          >
            ← Back to Blogs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F8FAF9]">
      <div className="container mx-auto px-4 py-8 ">
        {/* Header Image */}
        <div className="relative w-full h-[529px] mb-6 border">
          <Image
            src={blog.image}
            alt={blog.title}
            fill
            style={{ objectFit: "cover" }}
            className="rounded-[8px]"
          />
        </div>

        {/* Title and Date */}
        <div className="mb-6">
          <div className="flex gap-10">
            <div className="flex items-center">
              <div className="w-[50px] h-[1.5px] bg-green-500"></div>
              <p className="text-[#8A8AC5] text-base">
                {formatDate(blog.createdAt)}
              </p>
            </div>

            <div className="flex items-center">
              <div className="w-[50px] h-[1.5px] bg-green-500"></div>
              <p className="text-[#8A8AC5] text-base">Posted by</p>
              <div className="w-[24px] h-[24px] rounded-full bg-red-600"></div>
              <p className="text-[#8A8AC5] text-base">jemmi</p>
            </div>
          </div>

          <h1 className="text-2xl font-semibold text-gray-800 mb-2 mt-[18px]">
            {blog.title}
          </h1>
        </div>

        <div>
          <p>{blog?.description}</p>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
