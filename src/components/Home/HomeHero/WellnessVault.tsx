import React from "react";
import BlogCard from "@/components/cards/BlogCard";
import Link from "next/link";

// Dummy blog data
const blogData = [
  {
    id: 1,
    image: "/images/blog1.jpg", // Replace with actual image paths
    date: "January 05, 2025",
    title: "The Power of Mindfulness in Daily Life",
  },
  {
    id: 2,
    image: "/images/blog2.jpg",
    date: "January 06, 2025",
    title: "Healthy Eating Habits for a Balanced Lifestyle",
  },
  {
    id: 3,
    image: "/images/blog3.jpg",
    date: "January 07, 2025",
    title: "Exercise Routines for Beginners",
  },
  {
    id: 4,
    image: "/images/blog4.jpg",
    date: "January 08, 2025",
    title: "Stress Management Techniques",
  },
];

const WellnessVault = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-700">The Wellness Vault</h2>
        <Link href="/blogs" className="text-gray-600 hover:text-gray-800 text-sm">
          View all Blogs <span aria-hidden="true">→</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {blogData.map((blog) => (
          <BlogCard
            key={blog.id}
            id={blog.id}
            image={blog.image}
            date={blog.date}
            title={blog.title}
          />
        ))}
      </div>
    </div>
  );
};

export default WellnessVault;
