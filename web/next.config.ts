import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export for Amplify deployment
  output: 'export',

  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },

  // Enable compression
  compress: true,

  // Note: rewrites and headers don't work with static export
  // If you need API calls, use absolute URLs or configure CORS on your API server
};

export default nextConfig;
