/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { dev }) => {
    if (dev) {
      // Avoid filesystem-based webpack persistent caching on Windows,
      // which can fail with ENOENT/rename errors under heavy file locking.
      config.cache = false;
    }

    return config;
  },
};

export default nextConfig;