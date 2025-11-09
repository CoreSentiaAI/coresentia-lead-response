/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    // Exclude cheerio and undici from client-side bundle
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        'cheerio': false,
        'undici': false,
      }
    }

    // Mark cheerio as external for server-side to avoid webpack parsing
    if (isServer) {
      config.externals = [...(config.externals || []), 'cheerio']
    }

    return config
  },
}

module.exports = nextConfig
