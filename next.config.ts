import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Product/spec imagery is large-format architectural photography; allow remote
  // manufacturer/CDN hosts here as they are introduced. Kept empty for the scaffold.
  images: {
    remotePatterns: [],
  },
};

export default nextConfig;
