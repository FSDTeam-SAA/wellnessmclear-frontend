"use client";
import React from "react";
import BlogCard from "@/components/cards/BlogCard";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

// Define TypeScript interfaces for API response
interface Blog {
  _id: string;
  title: string;
  slug: string;
  description: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

interface BlogData {
  blogs: Blog[];
  pagination: Pagination;
}

interface ApiResponse {
  status: boolean;
  message: string;
  data: BlogData;
}

const WellnessVault = () => {
  const { data, isLoading, error } = useQuery<ApiResponse>({
    queryKey: ["blogs"],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/blog/`, {
        method: "GET",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch blogs");
      }

      return res.json();
    },
  });

  // Loading state
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0 mb-5 lg:mb-[56px] lg:mt-[49px]">
          <h2 className="text-[#2F3E34] hover:text-[#3b5243] text-lg sm:text-xl md:text-2xl font-medium">
            The Wellness Vault
          </h2>
          <Link
            href="/blogs"
            className="text-[#2F3E34] hover:text-[#3b5243] text-sm sm:text-base md:text-lg lg:text-2xl font-medium"
          >
            View all Blogs <span aria-hidden="true">→</span>
          </Link>
        </div>

        {/* Loading skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="max-w-sm w-full bg-white rounded overflow-hidden flex flex-col animate-pulse"
            >
              <div className="w-full h-[275px] bg-gray-300"></div>
              <div className="flex flex-col flex-1 justify-between mt-6 p-4">
                <div>
                  <div className="h-4 bg-gray-300 rounded w-1/3 mb-2"></div>
                  <div className="h-6 bg-gray-300 rounded w-full mb-4"></div>
                </div>
                <div className="h-10 bg-gray-300 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center lg:mb-[56px] lg:mt-[49px] mb-5">
          <h2 className="text-[#2F3E34] hover:text-[#3b5243] text-2xl font-medium">
            The Wellness Vault
          </h2>
          <Link
            href="/blogs"
            className="text-[#2F3E34] hover:text-[#3b5243] lg:text-2xl font-medium"
          >
            View all Blogs <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="text-center py-8">
          <p className="text-red-500 text-lg">Error loading blogs</p>
          <p className="text-gray-600 mt-2">{error.message}</p>
        </div>
      </div>
    );
  }

  // No data state
  if (!data || !data.data || !data.data.blogs || data.data.blogs.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center lg:mb-[56px] lg:mt-[49px] mb-5">
          <h2 className="text-[#2F3E34] hover:text-[#3b5243] text-2xl font-medium">
            The Wellness Vault
          </h2>
          <Link
            href="/blogs"
            className="text-[#2F3E34] hover:text-[#3b5243] lg:text-2xl font-medium"
          >
            View all Blogs <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="text-center py-8">
          <p className="text-gray-500 text-lg">No blogs found</p>
        </div>
      </div>
    );
  }

  const blogs = data.data.blogs;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center lg:mb-[56px] lg:mt-[49px] mb-5">
        <h2 className="text-[#2F3E34] hover:text-[#3b5243] text-2xl font-medium">
          The Wellness Vault
        </h2>
        <Link
          href="/blogs"
          className="text-[#2F3E34] hover:text-[#3b5243] lg:text-2xl font-medium"
        >
          View all Blogs <span aria-hidden="true">→</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {blogs.slice(0, 4).map((blog) => (
          <BlogCard
            key={blog._id}
            slug={blog.slug}
            image={blog.image}
            date={blog.createdAt}
            title={blog?.title?.length > 30 ? blog.title.slice(0, 30) + "..." : blog.title}
          />
        ))}
      </div>
    </div>
  );
};

export default WellnessVault;
