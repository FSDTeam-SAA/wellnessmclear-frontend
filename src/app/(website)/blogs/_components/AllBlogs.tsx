import React from "react";
import Link from "next/link";
import BlogCard from "../../../../components/cards/BlogCard";

const BlogSection = () => {
  const blogData = [
    {
      id: 1,
      image: "/images/blog1.jpg",
      date: "January 01, 2025",
      title: "The Power of Mindfulness in Daily Life",
    },
    {
      id: 2,
      image: "/images/blog2.jpg",
      date: "January 02, 2025",
      title: "Healthy Eating Habits for a Balanced Lifestyle",
    },
    {
      id: 3,
      image: "/images/blog3.jpg",
      date: "January 03, 2025",
      title: "Exercise Routines for Beginners",
    },
    {
      id: 4,
      image: "/images/blog4.jpg",
      date: "January 04, 2025",
      title: "Stress Management Techniques",
    },
    {
      id: 5,
      image: "/images/blog5.jpg",
      date: "January 05, 2025",
      title: "The Importance of Sleep for Health",
    },
    {
      id: 6,
      image: "/images/blog6.jpg",
      date: "January 06, 2025",
      title: "Hydration and Your Body: What You Need to Know",
    },
    {
      id: 7,
      image: "/images/blog7.jpg",
      date: "January 07, 2025",
      title: "Building Mental Resilience for Everyday Life",
    },
    {
      id: 8,
      image: "/images/blog8.jpg",
      date: "January 08, 2025",
      title: "Simple Yoga Poses for Relaxation",
    },
    {
      id: 9,
      image: "/images/blog9.jpg",
      date: "January 09, 2025",
      title: "How Journaling Can Improve Your Mental Health",
    },
    {
      id: 10,
      image: "/images/blog10.jpg",
      date: "January 10, 2025",
      title: "Meditation for Beginners: A Guide",
    },
    {
      id: 11,
      image: "/images/blog11.jpg",
      date: "January 11, 2025",
      title: "Balancing Work and Wellness",
    },
    {
      id: 12,
      image: "/images/blog12.jpg",
      date: "January 12, 2025",
      title: "Creating a Morning Routine That Works",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Section Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">The Wellness Vault</h1>
        <p className="text-gray-500 text-sm mt-2">
          Unlock Your Path to Clear, Sustainable Health
        </p>
      </div>

      {/* Blog Grid */}
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

      {/* Footer Links */}
      <div className="mt-8 text-center">
        <Link
          href="/view-all"
          className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition duration-300 inline-block"
        >
          View Details
        </Link>
        <div className="mt-4 text-gray-500 text-sm space-x-2">
          <Link href="/about" className="hover:underline">
            About
          </Link>
          <span>|</span>
          <Link href="/contact" className="hover:underline">
            Contact
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogSection;
