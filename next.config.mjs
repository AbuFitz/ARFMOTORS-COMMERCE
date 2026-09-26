/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  async redirects() {
    return [
      { source: '/faq', destination: '/support', permanent: true },
      {
        source: '/shop',
        has: [{ type: 'query', key: 'category', value: '(?<cat>in-car-tech|accessories|roadside|tools)' }],
        destination: '/shop/:cat',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
