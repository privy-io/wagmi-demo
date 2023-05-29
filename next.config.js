/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.snapshot = {
      ...(config.snapshot ?? {}),
      // Add all node_modules to managedPaths, EXCEPT wagmi-connector, next/swc (which show
      // warnings if added). Allows for hot refresh of changes
      managedPaths: [
        /^(.+?[\\/]node_modules[\\/](?!(@privy-io[\\/]wagmi-connector|@next|@swc))(@.+?[\\/])?.+?)[\\/]/,
      ],
    };
    return config;
  },
};

module.exports = nextConfig;
