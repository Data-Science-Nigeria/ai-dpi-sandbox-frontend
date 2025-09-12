/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/v1/:path*",
        destination: "http://dsnsandbox.com:8080/api/v1/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
