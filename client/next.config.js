/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true, 
  images: {
    domains: ['res.cloudinary.com'],
  },
  target: 'serverless',
}

module.exports = nextConfig
