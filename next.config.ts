import type { NextConfig } from "next";


const nextConfig: NextConfig = {
  images: {
    domains: ["i.imgur.com"], 
  },
  outputFileTracingRoot: __dirname,
};

export default nextConfig;
