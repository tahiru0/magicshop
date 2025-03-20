/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'images.unsplash.com',
      // Add any other external image domains you might use
      // For example: 'cdn.yourservice.com'
    ],
    // You can also set deviceSizes and imageSizes here if needed
  },
  // Explicitly set root layout segments
  experimental: {
    // Isolate the admin section with its own root layout
    appDir: true,
  },
};

export default nextConfig;
