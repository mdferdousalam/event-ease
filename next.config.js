/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // webpack5: true,
  images: {
    unoptimized: true,
    domains: [
      "images.unsplash.com",
      "marthalasolutions.s3.ap-south-1.amazonaws.com",
      "dummyimage.com",
      "ausbuildung.s3.ap-south-1.amazonaws.com",
      "ausbuildung.s3.ap-northeast-1.amazonaws.com",
    ],
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
