/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
        ],
      },
    ];
  },
  images: {
    minimumCacheTTL: 60,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.com",
      },
      {
        protocol: "https",
        hostname: "**.org",
      },
      {
        protocol: "https",
        hostname: "**.me",
      },
    ],
  },
};

export default nextConfig;
