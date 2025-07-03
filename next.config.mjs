/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains:['images.unsplash.com','plus.unsplash.com','res.cloudinary.com'],
    remotePatterns: [
      {
        hostname: "files.edgestore.dev",
        protocol: "https",
      },
    ],
  },
};

export default nextConfig;
