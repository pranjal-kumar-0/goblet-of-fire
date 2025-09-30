import type { NextConfig } from "next";


const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ["i.imgur.com"], 
  },

};

export default nextConfig;
