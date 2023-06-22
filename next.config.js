/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['files.stripe.com'],
    loader: 'custom',
    loaderFile: './imageLoader.js',
  },
}

module.exports = nextConfig
