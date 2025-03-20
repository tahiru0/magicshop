/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'images.unsplash.com',
      // Add any other external image domains you might use
      // For example: 'cdn.yourservice.com'
    ],
  },
  // Disable ESLint during build process
  eslint: {
    // Only run ESLint during development, not during builds
    ignoreDuringBuilds: true,
  },
  // Experimental features
  experimental: {
    // Isolate the admin section with its own root layout
    appDir: true,
  },
};

export default nextConfig;
