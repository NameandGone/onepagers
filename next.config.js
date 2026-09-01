/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  outputFileTracingRoot: __dirname,
  turbopack: {
    root: __dirname,
  },
};

module.exports = nextConfig;
