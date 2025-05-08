import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "i.pravatar.cc",
      "randomuser.me", // add any other domains you use
    ],
  },
};

export default nextConfig;
