import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Pin the tracing root to this project — a stray package-lock.json in the
  // home dir otherwise makes Next infer C:\Users\bryon as the workspace root
  // and trace the entire home directory.
  outputFileTracingRoot: __dirname,
  // Product/spec imagery is large-format architectural photography; allow remote
  // manufacturer/CDN hosts here as they are introduced. Kept empty for the scaffold.
  images: {
    remotePatterns: [],
  },
};

export default nextConfig;
