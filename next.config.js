/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['files.stripe.com'],
    loader: 'custom',
    loaderFile: './my/image/loader.js',
  },
}

module.exports = nextConfig
