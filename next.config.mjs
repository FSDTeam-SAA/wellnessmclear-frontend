/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
<<<<<<< HEAD
    domains: [
      'images.unsplash.com',
      'plus.unsplash.com',
      'res.cloudinary.com', // ✅ Added Cloudinary
    ],
=======
    domains:['images.unsplash.com','plus.unsplash.com',"www.shutterstock.com","res.cloudinary.com'"],
>>>>>>> 7d581d6dd00cb9f2c8e09fccadc0ed3473e1a4b4
    remotePatterns: [
      {
        protocol: "https",
        hostname: "files.edgestore.dev",
      },
    ],
  },
};

export default nextConfig;
