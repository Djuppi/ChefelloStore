/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dummyimage.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cheffelo.com',
        port: '',
        pathname: '/**',
      },
    ],
    domains: ['dummyimage.com', "cheffelo.com"],
  },
}

module.exports = nextConfig
