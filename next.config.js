/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // webpack5: true,
  images: {
    unoptimized: true,
    domains: ["images.unsplash.com", "dummyimage.com", "img.freepik.com"],
  },
  webpack(config) {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false, // the solution
    };

    return config;
  },
};

module.exports = nextConfig;
