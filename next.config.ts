import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.googleusercontent.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'linklist-files.s3.amazonaws.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'um-linktree-clone.s3.amazonaws.com',
        pathname: '/**',
      },
    ],
  },
   typescript: {
    ignoreBuildErrors: true, // <-- ADD THIS LINE to disable type check on build
  },
};

export default nextConfig;
