/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  ) => {
    config.snapshot = {
      ...(config.snapshot ?? {}),
      // Add all node_modules but @next module to managedPaths
      // Allows for hot refresh of changes to @next module
      //
      managedPaths: [
        /^(.+?[\\/]node_modules[\\/](?!(@privy-io[\\/]wagmi-connector))(@.+?[\\/])?.+?)[\\/]/,
      ],
    };
    return config;
  },
};

module.exports = nextConfig;
