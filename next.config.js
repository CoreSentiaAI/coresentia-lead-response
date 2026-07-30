/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // Retired product page — send indexed links to the portfolio
      {
        source: '/projects/ai-receptionist',
        destination: '/projects',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
