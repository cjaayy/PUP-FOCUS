import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { dev }) => {
    if (dev) {
      // Disable webpack filesystem cache to avoid noisy serialization warnings.
      config.cache = false;
    }

    return config;
  },
};

export default nextConfig;
