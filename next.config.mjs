/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/gestao',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
