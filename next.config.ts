import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    browserDebugInfoInTerminal: true,
  },
  images: {
    remotePatterns: [
      {
        //change in production
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
