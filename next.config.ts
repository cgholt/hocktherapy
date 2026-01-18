import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  // Add image domains here if using external images
  // images: {
  //   remotePatterns: [
  //     {
  //       protocol: "https",
  //       hostname: "example.com",
  //     },
  //   ],
  // },
};

export default nextConfig;
