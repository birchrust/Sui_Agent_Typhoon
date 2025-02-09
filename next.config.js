/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "res.cloudinary.com" },
      { hostname: "www.lummi.ai" },
    ],
  },
}

module.exports = nextConfig
