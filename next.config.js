/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable server routes (API) by not using static export
  // trailingSlash is fine to keep, but exporting static would break API routes
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  experimental: {
    optimizePackageImports: ['three', '@react-three/fiber', '@react-three/drei'],
  },
}

module.exports = nextConfig
