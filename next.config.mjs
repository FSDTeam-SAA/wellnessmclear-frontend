/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains:['images.unsplash.com','plus.unsplash.com',"www.shutterstock.com","res.cloudinary.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "files.edgestore.dev",
      },
    ],
  },
};

export default nextConfig;
