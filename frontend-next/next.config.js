/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  poweredByHeader: false,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:5007/api/:path*',
      },
    ];
  },
};
module.exports = nextConfig;
